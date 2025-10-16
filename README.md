# Solana Counter dApp

A full-stack Solana decentralized application demonstrating wallet integration and on-chain program interaction. Features a Next.js frontend with TypeScript and Tailwind CSS, connecting to a Solana counter program.

> 📘 **New here?** Check out the [Quick Start Guide](QUICKSTART.md) to get up and running in under 10 minutes!

## Project Overview

This project demonstrates a complete Solana dApp with:
- **Frontend UI**: Next.js application with Solana wallet integration (Phantom/Solflare)
- **Counter Dashboard**: Interactive interface to view and modify an on-chain counter
- **Modern Stack**: TypeScript, Tailwind CSS, and responsive design
- **On-chain Program**: (Optional) Rust-based Solana program for counter logic
- **Backend API**: (Optional) Node.js server for additional functionality

## Features

- 🔐 **Wallet Integration**: Connect with Phantom or Solflare wallets
- 📊 **Counter Dashboard**: View and interact with the on-chain counter
- ⚡ **Real-time Updates**: Live counter value and wallet status
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Fully responsive across all devices
- 🌙 **Dark Mode**: Beautiful dark-themed interface

## Project Structure

```
.
├── frontend/            # Next.js frontend application
│   ├── src/
│   │   ├── app/        # Next.js app directory
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom React hooks
│   │   └── lib/        # Utility functions
│   ├── package.json
│   ├── .env.example
│   └── README.md       # Frontend-specific docs
│
├── program/             # (Optional) Solana program (Rust)
│   ├── src/            # Program source code
│   ├── tests/          # Program tests
│   └── Cargo.toml
│
├── backend/             # (Optional) Backend API server
│   ├── src/            # Backend source code
│   └── package.json
│
├── scripts/             # Orchestration and deployment scripts
│   ├── setup.sh        # Complete setup automation
│   ├── build-all.sh    # Build all components
│   ├── test-all.sh     # Run all tests
│   └── deploy.sh       # Deployment script
│
├── Makefile            # Build automation targets
└── README.md           # This file
```

## Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Solana wallet extension** (Phantom or Solflare)
- (Optional) **Rust & Cargo** if building the on-chain program
- (Optional) **Solana CLI** for program deployment

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd solana-counter-dapp

# Run automated setup
make setup

# Or manually setup frontend
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

The application will be available at `http://localhost:3000`.

## Environment Configuration

### Frontend (.env.local)

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Backend (.env) - Optional

```env
PORT=3001
NODE_ENV=development
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=YourProgramIdHere
```

## Development

### Frontend Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

Visit `http://localhost:3000` to see the application.

### Building All Components

```bash
# From project root
make build
```

### Running Tests

```bash
# Test all components
make test

# Or test frontend only
cd frontend && npm test
```

## Usage

1. **Connect Wallet**: Click "Connect Wallet" in the header
2. **Select Wallet**: Choose Phantom or Solflare from the modal
3. **Approve Connection**: Authorize the connection in your wallet
4. **Interact with Counter**: Use the increment/decrement buttons
5. **Approve Transactions**: Confirm each transaction in your wallet

## Deployment

### Frontend Deployment (Vercel)

The easiest way to deploy the Next.js frontend is using Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Other Deployment Options

- **Netlify**: Connect your git repository for automatic deployments
- **AWS/Azure/GCP**: Use container services or static hosting
- **Self-hosted**: Build and deploy using Docker

See [frontend/README.md](frontend/README.md) for detailed deployment instructions.

### Program Deployment (Optional)

If you're deploying your own Solana program:

```bash
# Configure Solana CLI for devnet
solana config set --url devnet

# Get devnet SOL
solana airdrop 2

# Deploy the program
make deploy-devnet
```

## Project Components

### Frontend

A Next.js application with:
- Wallet adapter integration
- Counter dashboard interface
- Reusable UI components
- TypeScript for type safety
- Tailwind CSS for styling

**[Frontend Documentation →](frontend/README.md)**

### On-Chain Program (Optional)

Rust-based Solana program handling counter logic. Can be customized for your specific use case.

**[Program Documentation →](program/README.md)**

### Backend API (Optional)

Node.js/Express server for additional off-chain functionality like data indexing, caching, or complex business logic.

**[Backend Documentation →](backend/README.md)**

## Development Workflow

### Adding New Features

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement changes in the appropriate component

3. Write tests for your changes

4. Run tests and linting:
   ```bash
   make test
   make lint
   ```

5. Commit and push:
   ```bash
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

6. Create a pull request

### Code Style

- **TypeScript**: Strict mode enabled, all code must be properly typed
- **React**: Functional components with hooks
- **Tailwind CSS**: Utility-first styling approach
- **Commits**: Follow conventional commits format (feat:, fix:, docs:, etc.)

## Troubleshooting

### Wallet Won't Connect

- Ensure wallet extension is installed and unlocked
- Check that you're on the correct network (devnet/mainnet)
- Clear browser cache and try again
- Check browser console for errors

### RPC Errors

- Verify `NEXT_PUBLIC_SOLANA_RPC_URL` is correct
- Try switching to a different RPC endpoint
- Check network status and rate limits

### Transaction Fails

- Ensure wallet has sufficient SOL for transaction fees
- Check that the program is deployed and accessible
- Verify the program ID is correct
- Check browser console for detailed error messages

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf frontend/.next`
- Check Node.js version: `node --version` (should be 18+)

## Documentation

### Main Documentation

- **[README.md](README.md)**: This file - project overview
- **[QUICKSTART.md](QUICKSTART.md)**: Fast-track setup guide
- **[DEVELOPMENT.md](DEVELOPMENT.md)**: Detailed technical documentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: Contribution guidelines
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**: Codebase organization

### Component Documentation

- **[Frontend README](frontend/README.md)**: Next.js application guide
- **[Program README](program/README.md)**: Solana program documentation
- **[Backend README](backend/README.md)**: Backend API documentation

## Tech Stack

- **[Next.js](https://nextjs.org/)** - React framework with SSR
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter)** - Wallet integration
- **[@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)** - Solana JavaScript SDK
- **[Rust](https://www.rust-lang.org/)** (Optional) - For on-chain programs
- **[Anchor](https://book.anchor-lang.com/)** (Optional) - Solana development framework

## Resources

### Documentation

- [Solana Documentation](https://docs.solana.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Anchor Book](https://book.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)

### Community

- [Solana Discord](https://discord.gg/solana)
- [Solana Stack Exchange](https://solana.stackexchange.com/)
- [Anchor Discord](https://discord.gg/anchor)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Pull Request Process

1. Fork the repository
2. Create your feature branch
3. Commit your changes with clear messages
4. Push to your branch
5. Open a Pull Request with a detailed description

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Solana Foundation for the blockchain platform
- Anchor framework for Solana program development
- Next.js and Vercel teams for the amazing framework
- The Solana developer community

---

**Need help?** Open an issue or reach out to the maintainers.
