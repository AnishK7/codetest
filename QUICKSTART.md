# Quick Start Guide

Get up and running with the Solana Counter Program in minutes!

## Prerequisites

Ensure you have installed:
- Node.js 18+ 
- Rust 1.75+
- Solana CLI 1.18+
- Anchor CLI 0.32+

See [README.md](README.md#-prerequisites) for installation instructions.

## 5-Minute Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
make install
# or
yarn install && cd frontend && npm install && cd ..
```

### 2. Build the Program

```bash
anchor build
```

### 3. Run Tests

```bash
anchor test
```

This will:
- ✅ Start a local validator
- ✅ Deploy the program
- ✅ Run all test cases
- ✅ Clean up automatically

### 4. Deploy to Devnet

```bash
# Configure for devnet
solana config set --url devnet

# Get some SOL
solana airdrop 2

# Deploy
./scripts/deploy.sh
```

### 5. Start the Frontend

```bash
cd frontend
cp .env.example .env.local
npm run dev
```

Visit http://localhost:3000 and connect your wallet!

## Common Commands

```bash
# Build program
make build

# Run tests
make test

# Deploy to current cluster
make deploy

# Clean build artifacts
make clean

# Format code
make format

# See all commands
make help
```

## Project Structure

```
.
├── programs/counter-program/    # Anchor smart contract
│   └── src/lib.rs              # Main program logic
├── tests/counter-program.ts     # Test suite
├── frontend/                    # Next.js frontend
├── scripts/                     # Deployment scripts
└── Anchor.toml                 # Anchor configuration
```

## Testing the Counter

### Via Tests
```bash
anchor test
```

### Via Anchor CLI
```bash
# Build and deploy locally
anchor build
anchor deploy

# Initialize a counter
anchor run initialize

# Increment the counter
anchor run increment
```

### Via Frontend
1. Start the frontend: `cd frontend && npm run dev`
2. Connect your wallet (Phantom/Solflare)
3. Click "Initialize Counter"
4. Click "Increment" to increase the value

## Troubleshooting

### "command not found: anchor"
```bash
# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

### "Program not deployed"
```bash
# Build and deploy
anchor build
anchor deploy
```

### "Insufficient funds"
```bash
# For devnet
solana airdrop 2

# Check balance
solana balance
```

### Test failures
```bash
# Clean and rebuild
make clean
anchor build
anchor test
```

## Next Steps

1. **Customize the Program**: Edit `programs/counter-program/src/lib.rs`
2. **Add Features**: Implement decrement, reset, or multiple counters
3. **Enhance Frontend**: Customize the UI in `frontend/`
4. **Deploy to Mainnet**: See [README.md](README.md#deploy-to-mainnet)

## Resources

- [Full Documentation](README.md)
- [Anchor Documentation](https://book.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Docs](https://docs.solana.com/)

## Need Help?

- Check the [Troubleshooting](README.md#-troubleshooting) section
- Open an issue on GitHub
- Join the Anchor Discord community

Happy coding! 🚀
