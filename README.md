# Solana Counter Program

A full-stack Solana application featuring an Anchor-based counter smart contract with a modern Next.js frontend. This project demonstrates on-chain program development, testing, and deployment on Solana devnet.

## 🏗️ Project Structure

```
.
├── programs/              # Anchor smart contracts
│   └── counter-program/   # Counter program source code
├── tests/                 # Anchor test suite
├── frontend/              # Next.js frontend application
├── backend/               # Backend API (future)
├── scripts/               # Deployment and utility scripts
├── migrations/            # Anchor deployment migrations
├── Anchor.toml           # Anchor configuration
├── Cargo.toml            # Rust workspace configuration
└── README.md             # This file
```

## ✨ Features

### Smart Contract (Anchor Program)
- **Initialize**: Create a new counter account with initial value of 0
- **Increment**: Increment the counter value by 1
- **Authority Validation**: Only the counter's authority can increment it
- **Overflow Protection**: Safe arithmetic operations prevent overflow errors

### Frontend
- 🔐 **Wallet Integration**: Connect with Phantom or Solflare wallets
- 📊 **Counter Dashboard**: View and interact with the on-chain counter
- ⚡ **Real-time Updates**: Live counter value and wallet status
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn
- **Rust** 1.75+ and Cargo
- **Solana CLI** 1.18+
- **Anchor CLI** 0.32+
- **Solana Wallet** (Phantom or Solflare browser extension)

### Installing Prerequisites

#### Install Rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

#### Install Solana CLI
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

#### Install Anchor
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   # Install Anchor dependencies
   yarn install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Configure Solana CLI**
   ```bash
   # Set cluster to devnet
   solana config set --url devnet
   
   # Create a new wallet (if needed)
   solana-keygen new --outfile ~/.config/solana/id.json
   
   # Request airdrop for devnet
   solana airdrop 2
   ```

## 🔨 Building the Program

Build the Anchor program:

```bash
anchor build
```

This will:
- Compile the Rust smart contract
- Generate TypeScript types in `target/types/`
- Create the program binary in `target/deploy/`

## 🧪 Testing

Run the test suite using Anchor's local validator:

```bash
anchor test
```

This will:
1. Start a local Solana validator
2. Deploy the program
3. Run all tests in `tests/counter-program.ts`
4. Clean up and shut down the validator

### Test Coverage

The test suite includes:
- ✅ Counter initialization
- ✅ Single increment operation
- ✅ Multiple increment operations
- ✅ Authority validation (unauthorized access rejection)

## 🚢 Deployment

### Deploy to Devnet

1. **Ensure you're on devnet**
   ```bash
   solana config set --url devnet
   ```

2. **Check your balance**
   ```bash
   solana balance
   ```
   If needed, request an airdrop:
   ```bash
   solana airdrop 2
   ```

3. **Run the deployment script**
   ```bash
   ./scripts/deploy.sh
   ```

   Or manually deploy:
   ```bash
   anchor build
   anchor deploy
   ```

4. **Update Program ID (if needed)**
   
   After deployment, if the program ID changed:
   
   a. Copy the program ID from the deployment output
   
   b. Update `Anchor.toml`:
   ```toml
   [programs.devnet]
   counter_program = "YourNewProgramID"
   ```
   
   c. Update `programs/counter-program/src/lib.rs`:
   ```rust
   declare_id!("YourNewProgramID");
   ```
   
   d. Rebuild:
   ```bash
   anchor build
   anchor deploy
   ```

### Deploy to Mainnet

⚠️ **Warning**: Deploying to mainnet requires real SOL and should be done with caution.

1. Set cluster to mainnet:
   ```bash
   solana config set --url mainnet-beta
   ```

2. Update `Anchor.toml`:
   ```toml
   [programs.mainnet]
   counter_program = "YourProgramID"
   
   [provider]
   cluster = "mainnet-beta"
   ```

3. Deploy:
   ```bash
   anchor build
   anchor deploy
   ```

## 🖥️ Running the Frontend

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local`:
   ```
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📚 Program API Reference

### Instructions

#### `initialize`
Creates a new counter account.

**Accounts:**
- `counter`: The counter account to create (PDA or Keypair)
- `authority`: The signer who will own the counter
- `system_program`: Solana system program

**Example:**
```typescript
await program.methods
  .initialize()
  .accounts({
    counter: counterKeypair.publicKey,
    authority: wallet.publicKey,
    systemProgram: SystemProgram.programId,
  })
  .signers([counterKeypair])
  .rpc();
```

#### `increment`
Increments the counter value by 1.

**Accounts:**
- `counter`: The counter account to increment
- `authority`: The counter's authority (must match)

**Example:**
```typescript
await program.methods
  .increment()
  .accounts({
    counter: counterPublicKey,
    authority: wallet.publicKey,
  })
  .rpc();
```

### Account Structure

#### `Counter`
```rust
pub struct Counter {
    pub count: u64,        // Current counter value
    pub authority: Pubkey, // Owner's public key
}
```

### Error Codes

- `Overflow`: Arithmetic overflow occurred during increment
- `Unauthorized`: Caller is not the counter's authority

## 🛠️ Development Workflow

1. **Make changes** to `programs/counter-program/src/lib.rs`
2. **Build** the program: `anchor build`
3. **Test** locally: `anchor test`
4. **Deploy** to devnet: `./scripts/deploy.sh`
5. **Update** frontend with new program ID if needed

## 📁 Additional Resources

### Anchor Documentation
- [Anchor Book](https://book.anchor-lang.com/)
- [Anchor Examples](https://github.com/coral-xyz/anchor/tree/master/examples)

### Solana Documentation
- [Solana Docs](https://docs.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/)

### Tools
- [Solana Explorer](https://explorer.solana.com/)
- [Solscan](https://solscan.io/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License

## 🐛 Troubleshooting

### Common Issues

**"Program error: Unauthorized"**
- Ensure you're using the same wallet that initialized the counter

**"Insufficient funds"**
- Request devnet airdrop: `solana airdrop 2`

**"Program not deployed"**
- Run `anchor deploy` to deploy the program

**"Transaction simulation failed"**
- Check your Solana CLI configuration: `solana config get`
- Ensure you're connected to the correct cluster

**Build errors**
- Make sure Rust and Anchor are up to date
- Clear the target directory: `rm -rf target && anchor build`

## 📧 Support

For issues and questions:
- Open an issue in this repository
- Check existing issues for solutions
- Review Anchor Discord community

---

Built with ❤️ using [Anchor](https://www.anchor-lang.com/) and [Solana](https://solana.com/)
