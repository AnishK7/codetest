# Solana Program

This directory contains the on-chain Solana program written in Rust.

## Structure

```
program/
├── src/
│   ├── lib.rs              # Program entry point
│   ├── instructions/       # Instruction handlers
│   ├── state/              # Account state definitions
│   └── errors.rs           # Custom error codes
├── tests/                  # Integration tests
├── Cargo.toml              # Rust dependencies
└── Anchor.toml             # Anchor configuration (if using Anchor)
```

## Prerequisites

- Rust 1.70+
- Solana CLI 1.17+
- Anchor Framework 0.29+ (if using Anchor)

## Building

### Using Anchor

```bash
anchor build
```

### Using Cargo (native)

```bash
cargo build-sbf
```

## Testing

### Run all tests

```bash
anchor test
```

### Run specific test

```bash
anchor test -- test_name
```

### Run with logs

```bash
anchor test -- --show-logs
```

## Deployment

### Deploy to devnet

```bash
anchor deploy --provider.cluster devnet
```

### Deploy to mainnet

```bash
anchor deploy --provider.cluster mainnet-beta
```

## Program Development

### Adding a New Instruction

1. Define the instruction context in `src/instructions/`
2. Implement the handler logic
3. Register the instruction in `lib.rs`
4. Add tests in `tests/`

Example:
```rust
// src/instructions/my_instruction.rs
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct MyInstruction<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<MyInstruction>, param: u64) -> Result<()> {
    // Implementation
    Ok(())
}
```

### Account State

Define account structures in `src/state/`:

```rust
use anchor_lang::prelude::*;

#[account]
pub struct UserAccount {
    pub owner: Pubkey,
    pub data: u64,
    pub created_at: i64,
}
```

### Error Handling

Define custom errors in `src/errors.rs`:

```rust
use anchor_lang::prelude::*;

#[error_code]
pub enum MyError {
    #[msg("Invalid input parameter")]
    InvalidInput,
    #[msg("Unauthorized access")]
    Unauthorized,
}
```

## Useful Commands

```bash
# Get program ID
anchor keys list

# View program logs
solana logs <PROGRAM_ID>

# Check program balance
solana balance <PROGRAM_ID>

# Close program and reclaim rent
solana program close <PROGRAM_ID>
```

## Resources

- [Anchor Documentation](https://book.anchor-lang.com/)
- [Solana Program Library](https://spl.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/)
