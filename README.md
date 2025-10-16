# Full Stack Solana dApp

A complete full-stack Solana decentralized application with a Rust-based on-chain program, Node.js backend API, and React frontend.

> 📘 **New here?** Check out the [Quick Start Guide](QUICKSTART.md) to get up and running in under 10 minutes!

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Program Setup](#1-program-setup)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Building and Testing](#building-and-testing)
- [Deployment](#deployment)
  - [Deploy to Devnet](#deploy-to-devnet)
  - [Deploy to Mainnet](#deploy-to-mainnet)
- [Usage Walkthrough](#usage-walkthrough)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Additional Resources](#additional-resources)

## Project Overview

This project demonstrates a production-ready Solana dApp architecture with:
- **On-chain Program**: Rust-based Solana program for smart contract logic
- **Backend API**: Node.js/Express server for off-chain data processing and indexing
- **Frontend UI**: React-based web interface for user interaction

## Project Structure

```
.
├── program/              # Solana program (Rust)
│   ├── src/             # Program source code
│   ├── tests/           # Program tests
│   └── Cargo.toml       # Rust dependencies
│
├── backend/             # Backend API server (Node.js)
│   ├── src/            # Backend source code
│   ├── tests/          # Backend tests
│   ├── package.json    # Node dependencies
│   └── .env.example    # Environment template
│
├── frontend/            # Frontend UI (React)
│   ├── src/            # Frontend source code
│   ├── public/         # Static assets
│   ├── package.json    # Node dependencies
│   └── .env.example    # Environment template
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

## Prerequisites

Before setting up this project, ensure you have the following installed:

### Required Tools

1. **Rust & Cargo** (v1.70+)
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Solana CLI** (v1.17+)
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
   ```

3. **Anchor Framework** (v0.29+)
   ```bash
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   avm install latest
   avm use latest
   ```

4. **Node.js & npm** (v18+)
   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

5. **Git**
   ```bash
   # Most systems have this pre-installed
   git --version
   ```

### Optional Tools

- **Docker & Docker Compose**: For containerized development
- **Solana Test Validator**: Included with Solana CLI for local testing
- **Phantom/Solflare Wallet**: Browser extension for testing frontend

## Setup Instructions

### Quick Start

For automated setup of all components:

```bash
make setup
```

Or manually run the setup script:

```bash
./scripts/setup.sh
```

### Manual Setup

#### 1. Program Setup

Navigate to the program directory and build the Solana program:

```bash
cd program

# Build the program (choose the toolchain that matches your workflow)
anchor build               # Anchor-based projects
# or
cargo build-sbf            # Solana CLI (new toolchain)
# or
cargo build-bpf            # Solana CLI (legacy, pre-1.17)
# or
cargo build                # Native Rust build for logic/unit tests

# Run tests
anchor test                # Anchor tests
# or
cargo test                 # Native Rust tests

# Return to root
cd ..
```

**Configuration:**
- Update `Anchor.toml` with your program ID if needed
- Ensure your keypair is configured in `~/.config/solana/id.json`

#### 2. Backend Setup

Set up the backend API server:

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Return to root
cd ..
```

**Environment Variables:**

The backend requires the following environment variables (see `backend/.env.example`):

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `SOLANA_RPC_URL`: Solana RPC endpoint
- `SOLANA_NETWORK`: Network (devnet/mainnet-beta)
- `PROGRAM_ID`: Deployed program ID
- `DATABASE_URL`: Database connection string (optional)
- `REDIS_URL`: Redis connection string (optional)

#### 3. Frontend Setup

Set up the React frontend:

```bash
cd frontend

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm start

# Return to root
cd ..
```

**Environment Variables:**

The frontend requires the following environment variables (see `frontend/.env.example`):

- `REACT_APP_BACKEND_URL`: Backend API URL (default: http://localhost:3001)
- `REACT_APP_SOLANA_NETWORK`: Solana network (devnet/mainnet-beta)
- `REACT_APP_SOLANA_RPC_URL`: Solana RPC endpoint
- `REACT_APP_PROGRAM_ID`: Deployed program ID

## Building and Testing

### Build All Components

```bash
make build
```

Or individually:

```bash
# Build program
make build-program

# Build backend
make build-backend

# Build frontend
make build-frontend
```

### Run Tests

```bash
make test
```

Or individually:

```bash
# Test program
make test-program

# Test backend
make test-backend

# Test frontend
make test-frontend
```

### Run Locally

Start all services in development mode:

```bash
make dev
```

This will:
1. Start a local Solana test validator
2. Deploy the program locally
3. Start the backend server
4. Start the frontend dev server

Access the application at `http://localhost:3000`

## Deployment

### Deploy to Devnet

1. **Configure Solana CLI for devnet:**

```bash
solana config set --url devnet
```

2. **Airdrop SOL for deployment (if needed):**

```bash
solana airdrop 2
```

3. **Deploy the program:**

```bash
make deploy-devnet
```

Or use the deployment script:

```bash
./scripts/deploy.sh devnet
```

4. **Update environment files:**

After deployment, update `backend/.env` and `frontend/.env` with:
- The new `PROGRAM_ID` (printed after deployment)
- Devnet RPC URL: `https://api.devnet.solana.com`

5. **Deploy backend and frontend:**

```bash
# Backend (example using a service like Railway, Heroku, etc.)
cd backend
# Follow your hosting provider's deployment instructions

# Frontend (example using Vercel, Netlify, etc.)
cd frontend
npm run build
# Follow your hosting provider's deployment instructions
```

### Deploy to Mainnet

⚠️ **Warning**: Deploying to mainnet requires real SOL and should only be done after thorough testing.

1. **Configure Solana CLI for mainnet:**

```bash
solana config set --url mainnet-beta
```

2. **Ensure you have sufficient SOL:**

```bash
solana balance
```

3. **Deploy the program:**

```bash
make deploy-mainnet
```

Or:

```bash
./scripts/deploy.sh mainnet-beta
```

4. **Update environment files** with mainnet configuration

5. **Deploy backend and frontend** to production hosting

## Usage Walkthrough

### For End Users

1. **Connect Wallet**
   - Visit the application URL
   - Click "Connect Wallet"
   - Approve the connection in your Solana wallet (Phantom/Solflare)

2. **Interact with the dApp**
   - The UI will guide you through available actions
   - Each transaction will prompt for wallet approval
   - Monitor transaction status in the UI

### For Developers

1. **Local Development Setup**
   ```bash
   # Start local validator
   solana-test-validator
   
   # In a new terminal, deploy program
   cd program
   anchor deploy
   
   # In a new terminal, start backend
   cd backend
   npm run dev
   
   # In a new terminal, start frontend
   cd frontend
   npm start
   ```

2. **Making Changes**
   - Edit program code in `program/src/`
   - Rebuild and redeploy: `anchor build && anchor deploy`
   - Edit backend code in `backend/src/`
   - Backend auto-reloads in dev mode
   - Edit frontend code in `frontend/src/`
   - Frontend auto-reloads in dev mode

3. **Testing Changes**
   ```bash
   # Test program
   anchor test
   
   # Test backend
   cd backend && npm test
   
   # Test frontend
   cd frontend && npm test
   ```

## Development Workflow

### Adding New Features

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Implement changes** in the appropriate component(s)

3. **Write tests** for your changes

4. **Run all tests:**
   ```bash
   make test
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

6. **Create a pull request** for review

### Code Style Guidelines

- **Rust**: Follow standard Rust conventions and use `cargo fmt`
- **JavaScript/TypeScript**: Use ESLint and Prettier configurations
- **Commits**: Follow conventional commits format (feat:, fix:, docs:, etc.)

### Testing Strategy

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Program Tests**: Use Anchor's testing framework

## Troubleshooting

### Common Issues

1. **Program deployment fails**
   - Ensure you have sufficient SOL: `solana balance`
   - Check network configuration: `solana config get`
   - Verify keypair: `solana address`

2. **Backend won't start**
   - Check `.env` file exists and is configured
   - Verify Node.js version: `node --version`
   - Check port availability: `lsof -i :3001`

3. **Frontend can't connect to backend**
   - Verify `REACT_APP_BACKEND_URL` in `frontend/.env`
   - Check backend is running: `curl http://localhost:3001/health`
   - Check for CORS issues in browser console

4. **Wallet connection issues**
   - Ensure wallet extension is installed and unlocked
   - Switch wallet to correct network (devnet/mainnet)
   - Clear browser cache and reload

### Getting Help

- Check existing issues on the repository
- Review Solana documentation: https://docs.solana.com
- Join Solana Discord: https://discord.gg/solana
- Create a new issue with detailed error logs

## Future Enhancements

### Planned Features

- [ ] **Enhanced Program Features**
  - Additional instruction handlers
  - Advanced account validation
  - Program upgradability patterns

- [ ] **Backend Improvements**
  - WebSocket support for real-time updates
  - Advanced caching with Redis
  - Transaction indexing and history
  - Rate limiting and API authentication

- [ ] **Frontend Enhancements**
  - Mobile responsive design
  - Dark/light theme toggle
  - Transaction history viewer
  - Multi-wallet support
  - PWA capabilities

- [ ] **DevOps & Tooling**
  - CI/CD pipeline automation
  - Docker compose for full stack
  - Monitoring and logging setup
  - Performance benchmarking

- [ ] **Testing & Quality**
  - Increased test coverage (target: >80%)
  - Load testing scripts
  - Security audit checklist
  - Automated dependency updates

### Contributing Ideas

We welcome contributions! Areas where help is particularly appreciated:

- UI/UX improvements
- Performance optimizations
- Documentation enhancements
- Test coverage expansion
- Security reviews
- Accessibility improvements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines

- Provide a clear description of the changes
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow the code style guidelines
- Reference any related issues

## Additional Resources

### Documentation

- **[Quick Start Guide](QUICKSTART.md)**: Get up and running quickly
- **[Development Guide](DEVELOPMENT.md)**: Detailed technical documentation
- **[Contributing Guide](CONTRIBUTING.md)**: How to contribute to the project
- **[Project Structure](PROJECT_STRUCTURE.md)**: Understanding the codebase organization

### Component-Specific Docs

- **[Program README](program/README.md)**: Solana program development
- **[Backend README](backend/README.md)**: Backend API documentation
- **[Frontend README](frontend/README.md)**: Frontend application guide

### External Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Book](https://book.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Program Library](https://spl.solana.com/)
- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Solana Foundation for the blockchain platform
- Anchor framework for Solana program development
- React and Node.js communities
- All contributors and maintainers

---

**Need help?** Open an issue or reach out to the maintainers.
