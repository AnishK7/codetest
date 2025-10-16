# Quick Start Guide

Get the Solana Counter dApp running in under 10 minutes.

## Prerequisites Check

Before starting, verify you have the required tools:

```bash
# Check Node.js (v18+)
node --version

# Check npm
npm --version
```

**Optional** (only if deploying your own Solana program):
```bash
# Check Rust
rustc --version

# Check Solana CLI
solana --version

# Check Anchor
anchor --version
```

If Node.js is missing, install it from [nodejs.org](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm).

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd solana-counter-dapp

# Setup frontend (automated)
cd frontend
npm install
cp .env.example .env.local
```

## Step 2: Configure Environment

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

> **Note**: The default configuration connects to a deployed counter program on devnet. You don't need to deploy your own program to get started!

## Step 3: Install Solana Wallet

Install a Solana wallet browser extension:

- **Phantom**: [phantom.app](https://phantom.app/)
- **Solflare**: [solflare.com](https://solflare.com/)

After installation:
1. Create or import a wallet
2. Switch the network to **Devnet** in wallet settings
3. Get some devnet SOL from the wallet's built-in faucet

## Step 4: Start the Application

```bash
# From the frontend directory
npm run dev
```

The application will be available at `http://localhost:3000`.

## Step 5: Connect and Interact

1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Connect Wallet**: Click "Connect Wallet" button in the header
3. **Select Wallet**: Choose Phantom or Solflare from the modal
4. **Approve Connection**: Authorize the connection in your wallet
5. **Use the Counter**: Click increment/decrement buttons
6. **Approve Transactions**: Confirm each transaction in your wallet

## Verification Checklist

- [ ] Node.js 18+ installed
- [ ] Wallet extension installed (Phantom/Solflare)
- [ ] Wallet switched to devnet
- [ ] Frontend dependencies installed
- [ ] `.env.local` file configured
- [ ] Dev server running at localhost:3000
- [ ] Wallet connected successfully
- [ ] Can interact with the counter

## Common Issues

### Wallet Won't Connect

**Solution**: 
- Ensure wallet extension is installed and unlocked
- Check that wallet is on devnet network
- Try refreshing the page
- Clear browser cache and try again

### "Insufficient SOL" Error

**Solution**: 
```bash
# Get devnet SOL from your wallet's built-in faucet
# Or use the Solana CLI
solana airdrop 2 --url devnet <YOUR_WALLET_ADDRESS>

# Or visit https://faucet.solana.com/
```

### Port 3000 Already in Use

**Solution**:
```bash
# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
```

### RPC Errors / "Failed to fetch" Messages

**Solution**:
- Check your internet connection
- Try a different RPC endpoint in `.env.local`:
  ```env
  NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
  # Or try
  NEXT_PUBLIC_SOLANA_RPC_URL=https://rpc.ankr.com/solana_devnet
  ```

### Build Errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

## Next Steps

Now that you're running:

### 1. Explore the Code

Check out the project structure:
```
frontend/src/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── counter-dashboard.tsx  # Main counter UI
│   ├── wallet/            # Wallet components
│   └── ui/                # Reusable UI
├── hooks/                 # Custom hooks
│   └── use-counter.ts     # Counter logic
└── lib/                   # Utilities
```

### 2. Read the Documentation

- **[Frontend README](frontend/README.md)**: Detailed frontend guide
- **[DEVELOPMENT.md](DEVELOPMENT.md)**: Development best practices
- **[CONTRIBUTING.md](CONTRIBUTING.md)**: How to contribute

### 3. Make Changes

Try modifying the UI:
```tsx
// frontend/src/app/page.tsx
// Change the heading text, colors, or layout
```

The page will automatically reload with your changes!

### 4. Run Tests

```bash
cd frontend
npm test
```

## Development Workflow

Daily development routine:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
cd frontend && npm install

# 3. Start dev server
npm run dev

# 4. Make your changes
# Edit files in frontend/src/

# 5. Build for production
npm run build

# 6. Commit changes
git add .
git commit -m "feat: your change description"
git push
```

## Useful Commands

```bash
# Frontend development
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linting

# From project root (if you have the full stack)
make build       # Build all components
make test        # Run all tests
make setup       # Setup all components
```

## (Optional) Deploy Your Own Program

If you want to deploy your own Solana counter program:

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

### Deploy

```bash
# Configure for devnet
solana config set --url devnet

# Get SOL for deployment
solana airdrop 2

# Deploy program (from project root)
make deploy-devnet

# Or manually
cd program
anchor build
anchor deploy --provider.cluster devnet
```

Then update `frontend/.env.local` with your new program ID.

## Production Deployment

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Other Options

- **Netlify**: Connect your git repo for auto-deploys
- **Docker**: Build and deploy container
- **Static Export**: `npm run build` and host anywhere

See [frontend/README.md](frontend/README.md) for detailed deployment instructions.

## Getting Help

- **Documentation**: Check [README.md](README.md) and [frontend/README.md](frontend/README.md)
- **Troubleshooting**: See [README.md#troubleshooting](README.md#troubleshooting)
- **Issues**: Open a GitHub issue with details
- **Community**: Join Solana Discord at [discord.gg/solana](https://discord.gg/solana)

## What's Next?

- 🎨 **Customize the UI**: Change colors, layouts, and styling
- 🔧 **Add features**: Implement new counter operations
- 🧪 **Write tests**: Add unit and integration tests
- 📱 **Make it PWA**: Add offline capabilities
- 🚀 **Deploy**: Share your dApp with the world

---

Happy building! 🚀

**Need help?** Open an issue or reach out to the community.
