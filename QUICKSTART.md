# Quick Start Guide

Get up and running with the Solana dApp in under 10 minutes.

## Prerequisites Check

Before starting, verify you have the required tools installed:

```bash
# Check Node.js (v18+)
node --version

# Check npm
npm --version

# Check Rust
rustc --version

# Check Solana CLI
solana --version

# Check Anchor (if using Anchor framework)
anchor --version
```

If any are missing, see the [Prerequisites](README.md#prerequisites) section in the main README.

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd <project-name>

# Run automated setup
make setup
```

This will:
- Create environment files from templates
- Install all dependencies
- Verify your development environment

## Step 2: Configure Environment

### Backend Configuration

Edit `backend/.env`:
```bash
cd backend
cp .env.example .env
nano .env  # or use your preferred editor
```

Update these values:
```env
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=<will-be-set-after-deployment>
```

### Frontend Configuration

Edit `frontend/.env`:
```bash
cd ../frontend
cp .env.example .env
nano .env
```

Update these values:
```env
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_SOLANA_RPC_URL=https://api.devnet.solana.com
REACT_APP_PROGRAM_ID=<will-be-set-after-deployment>
```

## Step 3: Get Devnet SOL

Configure Solana CLI and get some devnet SOL:

```bash
# Configure for devnet
solana config set --url devnet

# Check your address
solana address

# Request airdrop (2 SOL)
solana airdrop 2

# Verify balance
solana balance
```

If airdrop fails, try requesting manually at [Solana Faucet](https://faucet.solana.com/).

## Step 4: Deploy Program

Deploy the Solana program to devnet:

```bash
# From project root
make deploy-devnet
```

Or manually:
```bash
cd program
anchor build
anchor deploy --provider.cluster devnet
```

**Important**: Copy the deployed program ID from the output!

## Step 5: Update Program ID

Update the program ID in both environment files:

**Backend** (`backend/.env`):
```env
PROGRAM_ID=<your-deployed-program-id>
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_PROGRAM_ID=<your-deployed-program-id>
```

## Step 6: Start Development Servers

### Option A: Start All Services (Recommended)

```bash
# From project root
make dev
```

This starts:
- Local Solana validator (if using localnet)
- Backend development server (port 3001)
- Frontend development server (port 3000)

### Option B: Start Services Individually

In separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Step 7: Access the Application

1. Open your browser to `http://localhost:3000`
2. Install a Solana wallet extension (Phantom or Solflare)
3. Configure wallet for devnet
4. Connect your wallet to the app
5. Start interacting with the dApp!

## Verification Checklist

- [ ] All prerequisites installed
- [ ] Environment files configured
- [ ] Devnet SOL in wallet
- [ ] Program deployed to devnet
- [ ] Program ID updated in .env files
- [ ] Backend running on port 3001
- [ ] Frontend running on port 3000
- [ ] Wallet connected to devnet
- [ ] Can interact with the dApp

## Common Issues

### "Insufficient funds" Error

**Solution**: Request more devnet SOL
```bash
solana airdrop 2
```

### "Program not found" Error

**Solution**: Verify program ID in .env files matches deployed program
```bash
# Check deployed program
solana program show <PROGRAM_ID>
```

### Port Already in Use

**Solution**: Stop conflicting processes or change ports
```bash
# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Wallet Not Connecting

**Solution**: 
1. Ensure wallet is on devnet network
2. Refresh the page
3. Try disconnecting and reconnecting
4. Clear browser cache

## Next Steps

Now that you're up and running:

1. **Explore the Code**: Check out [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
2. **Read Development Guide**: See [DEVELOPMENT.md](DEVELOPMENT.md)
3. **Run Tests**: Execute `make test`
4. **Make Changes**: Follow [CONTRIBUTING.md](CONTRIBUTING.md)

## Development Workflow

Daily development routine:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
make install

# 3. Start dev environment
make dev

# 4. Make your changes

# 5. Run tests
make test

# 6. Commit changes
git add .
git commit -m "feat: your change description"
git push
```

## Useful Commands

```bash
# Build all components
make build

# Run tests
make test

# Lint code
make lint

# Format code
make format

# Clean build artifacts
make clean

# Deploy to devnet
make deploy-devnet
```

## Getting Help

- Check the [main README](README.md)
- Review [troubleshooting section](README.md#troubleshooting)
- Open an issue on GitHub
- Join the project Discord/Slack

---

Happy building! 🚀
