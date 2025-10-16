import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterProgram } from "../target/types/counter_program";
import { Keypair, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";

describe("counter-program", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CounterProgram as Program<CounterProgram>;
  const provider = anchor.AnchorProvider.env();
  const counterKeypair = Keypair.generate();

  it("Initializes the counter", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counterKeypair])
      .rpc();

    console.log("Initialize transaction signature:", tx);

    const counterAccount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    assert.equal(counterAccount.count.toNumber(), 0);
    assert.equal(
      counterAccount.authority.toString(),
      provider.wallet.publicKey.toString()
    );
    console.log("Counter initialized with count:", counterAccount.count.toNumber());
  });

  it("Increments the counter", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Increment transaction signature:", tx);

    const counterAccount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    assert.equal(counterAccount.count.toNumber(), 1);
    console.log("Counter incremented to:", counterAccount.count.toNumber());
  });

  it("Increments the counter multiple times", async () => {
    for (let i = 0; i < 5; i++) {
      await program.methods
        .increment()
        .accounts({
          counter: counterKeypair.publicKey,
          authority: provider.wallet.publicKey,
        })
        .rpc();
    }

    const counterAccount = await program.account.counter.fetch(
      counterKeypair.publicKey
    );

    assert.equal(counterAccount.count.toNumber(), 6);
    console.log("Counter after multiple increments:", counterAccount.count.toNumber());
  });

  it("Fails to increment with wrong authority", async () => {
    const wrongAuthority = Keypair.generate();

    await provider.connection.requestAirdrop(
      wrongAuthority.publicKey,
      1000000000
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await program.methods
        .increment()
        .accounts({
          counter: counterKeypair.publicKey,
          authority: wrongAuthority.publicKey,
        })
        .signers([wrongAuthority])
        .rpc();

      assert.fail("Expected transaction to fail with unauthorized error");
    } catch (error) {
      assert.include(error.toString(), "Error Code: Unauthorized");
      console.log("Correctly rejected unauthorized increment");
    }
  });
});
