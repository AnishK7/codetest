import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import type { AnchorProvider, Program, Idl } from '@coral-xyz/anchor';
import fs from 'fs';
import path from 'path';
import { getConfig, type AppConfig } from '../config/env';
import {
  SolanaError,
  TransactionError,
  AccountNotFoundError,
} from '../errors/SolanaError';

interface CounterAccount {
  authority: PublicKey;
  count: anchor.BN;
}

export class SolanaService {
  private readonly connection: Connection;
  private readonly wallet: Keypair;
  private readonly provider: AnchorProvider;
  private readonly program: Program;
  private readonly programId: PublicKey;
  private readonly config: AppConfig;

  constructor(config: AppConfig = getConfig()) {
    this.config = config;
    this.connection = new Connection(
      config.solanaClusterUrl,
      config.commitment,
    );
    this.wallet = Keypair.fromSecretKey(config.walletSecretKey);
    this.programId = new PublicKey(config.programId);

    const wallet = new anchor.Wallet(this.wallet);
    this.provider = new anchor.AnchorProvider(this.connection, wallet, {
      commitment: config.commitment,
    });

    const idlPath = config.counterIdlPath
      ? path.resolve(config.counterIdlPath)
      : path.resolve(__dirname, '../idl/counter.json');

    const rawIdl = fs.readFileSync(idlPath, 'utf-8');
    const idl = JSON.parse(rawIdl) as Idl;

    this.program = new anchor.Program(idl, this.programId, this.provider);
  }

  async initializeCounter(
    seed = 'counter',
  ): Promise<{ counterAddress: string; signature: string; seed: string }> {
    try {
      const [counterPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from(seed), this.wallet.publicKey.toBuffer()],
        this.programId,
      );

      const signature = await this.program.methods
        .initialize()
        .accounts({
          counter: counterPDA,
          user: this.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        } as any)
        .rpc();

      await this.confirmTransaction(signature);

      return {
        counterAddress: counterPDA.toBase58(),
        signature,
        seed,
      };
    } catch (error) {
      throw new SolanaError(
        'Failed to initialize counter',
        error instanceof Error ? error : undefined,
      );
    }
  }

  async incrementCounter(
    counterAddress: string,
  ): Promise<{ signature: string; newCount: string }> {
    try {
      const counterPublicKey = new PublicKey(counterAddress);

      const signature = await this.program.methods
        .increment()
        .accounts({
          counter: counterPublicKey,
          user: this.wallet.publicKey,
        } as any)
        .rpc();

      await this.confirmTransaction(signature);

      const accountData = await this.getCounterData(counterAddress);

      return {
        signature,
        newCount: accountData.count.toString(),
      };
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        throw error;
      }
      throw new SolanaError(
        'Failed to increment counter',
        error instanceof Error ? error : undefined,
      );
    }
  }

  async getCounterData(
    counterAddress: string,
  ): Promise<{ authority: string; count: string }> {
    try {
      const counterPublicKey = new PublicKey(counterAddress);
      const accountData = (await this.program.account.counter.fetch(
        counterPublicKey,
      )) as CounterAccount;

      if (!accountData) {
        throw new AccountNotFoundError(counterAddress);
      }

      return {
        authority: accountData.authority.toBase58(),
        count: accountData.count.toString(),
      };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Account does not exist')
      ) {
        throw new AccountNotFoundError(counterAddress);
      }
      throw new SolanaError(
        'Failed to fetch counter data',
        error instanceof Error ? error : undefined,
      );
    }
  }

  async getClusterInfo(): Promise<{ cluster: string; programId: string }> {
    try {
      return {
        cluster: this.config.solanaClusterUrl,
        programId: this.config.programId,
      };
    } catch (error) {
      throw new SolanaError(
        'Failed to get cluster info',
        error instanceof Error ? error : undefined,
      );
    }
  }

  getWalletPublicKey(): PublicKey {
    return this.wallet.publicKey;
  }

  private async confirmTransaction(signature: string): Promise<void> {
    try {
      const latestBlockhash = await this.connection.getLatestBlockhash();
      const confirmation = await this.connection.confirmTransaction({
        signature,
        ...latestBlockhash,
      });

      if (confirmation.value.err) {
        throw new TransactionError(
          `Transaction failed: ${JSON.stringify(confirmation.value.err)}`,
          signature,
        );
      }
    } catch (error) {
      if (error instanceof TransactionError) {
        throw error;
      }
      throw new TransactionError(
        'Failed to confirm transaction',
        signature,
      );
    }
  }
}
