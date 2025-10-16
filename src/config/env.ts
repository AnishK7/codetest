import { config as loadEnv } from 'dotenv';
import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';
import { z } from 'zod';

loadEnv();

const commitmentValues = ['processed', 'confirmed', 'finalized'] as const;

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z
    .string()
    .default('3000')
    .transform(val => {
      const parsed = Number(val);
      if (!Number.isInteger(parsed) || parsed <= 0) {
        throw new Error('PORT must be a positive integer');
      }
      return parsed;
    }),
  SOLANA_CLUSTER_URL: z
    .string()
    .default('https://api.devnet.solana.com'),
  COUNTER_PROGRAM_ID: z.string().optional(),
  WALLET_KEYPAIR_PATH: z.string().optional(),
  WALLET_KEYPAIR: z.string().optional(),
  COMMITMENT: z.enum(commitmentValues).default('confirmed'),
  COUNTER_IDL_PATH: z.string().optional(),
});

export type Environment = z.infer<typeof envSchema> & { PORT: number };

let cachedEnv: (Environment & { programId: string; wallet: Uint8Array }) | null =
  null;

const parseSecretKey = (value: string): Uint8Array => {
  const trimmed = value.trim();
  if (trimmed.startsWith('[')) {
    try {
      const arr = JSON.parse(trimmed) as number[];
      return Uint8Array.from(arr);
    } catch (error) {
      throw new Error('Failed to parse WALLET_KEYPAIR JSON array');
    }
  }

  try {
    const decoded = Buffer.from(trimmed, 'base64');
    if (decoded.length > 0) {
      return new Uint8Array(decoded);
    }
  } catch (error) {
    // continue to next strategy
  }

  try {
    return new Uint8Array(bs58.decode(trimmed));
  } catch (error) {
    throw new Error(
      'Failed to parse WALLET_KEYPAIR: supported formats are JSON array, base64, or base58',
    );
  }
};

const loadWallet = (env: Environment): Uint8Array => {
  if (env.WALLET_KEYPAIR) {
    return parseSecretKey(env.WALLET_KEYPAIR);
  }

  if (env.WALLET_KEYPAIR_PATH) {
    const resolvedPath = path.resolve(env.WALLET_KEYPAIR_PATH);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Wallet keypair file does not exist: ${resolvedPath}`);
    }

    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    try {
      const parsed = JSON.parse(fileContent) as number[];
      return Uint8Array.from(parsed);
    } catch (error) {
      return parseSecretKey(fileContent);
    }
  }

  throw new Error(
    'Wallet configuration missing: set WALLET_KEYPAIR_PATH or WALLET_KEYPAIR',
  );
};

const loadProgramId = (env: Environment): string => {
  if (env.COUNTER_PROGRAM_ID) {
    return env.COUNTER_PROGRAM_ID;
  }

  try {
    const idlPath = env.COUNTER_IDL_PATH
      ? path.resolve(env.COUNTER_IDL_PATH)
      : path.resolve(__dirname, '../idl/counter.json');
    const content = fs.readFileSync(idlPath, 'utf-8');
    const parsed = JSON.parse(content) as { metadata?: { address?: string } };
    if (parsed.metadata?.address) {
      return parsed.metadata.address;
    }
  } catch (error) {
    // fall-through to throw below
  }

  throw new Error(
    'COUNTER_PROGRAM_ID is not set and could not be inferred from the IDL metadata',
  );
};

export interface AppConfig {
  nodeEnv: Environment['NODE_ENV'];
  port: number;
  solanaClusterUrl: string;
  commitment: Environment['COMMITMENT'];
  programId: string;
  walletSecretKey: Uint8Array;
  counterIdlPath?: string;
}

export const getConfig = (): AppConfig => {
  if (cachedEnv) {
    const { programId, wallet, ...environment } = cachedEnv;
    return {
      nodeEnv: environment.NODE_ENV,
      port: environment.PORT,
      solanaClusterUrl: environment.SOLANA_CLUSTER_URL,
      commitment: environment.COMMITMENT,
      programId,
      walletSecretKey: wallet,
      counterIdlPath: environment.COUNTER_IDL_PATH,
    };
  }

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
  }

  const environment = parsed.data;
  const wallet = loadWallet(environment);
  const programId = loadProgramId(environment);

  cachedEnv = { ...environment, programId, wallet };

  return {
    nodeEnv: environment.NODE_ENV,
    port: environment.PORT,
    solanaClusterUrl: environment.SOLANA_CLUSTER_URL,
    commitment: environment.COMMITMENT,
    programId,
    walletSecretKey: wallet,
    counterIdlPath: environment.COUNTER_IDL_PATH,
  };
};
