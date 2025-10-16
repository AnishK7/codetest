# Scripts

This directory contains utility scripts for deploying and managing the Solana counter program.

## Available Scripts

### deploy.sh

Deploys the counter program to the configured Solana cluster.

**Usage:**
```bash
./scripts/deploy.sh
```

**What it does:**
1. Checks for required tools (Solana CLI, Anchor)
2. Displays current configuration (cluster, wallet)
3. Verifies wallet balance
4. Builds the program
5. Deploys to the configured cluster
6. Displays the deployed program ID

**Before running:**
- Ensure you have sufficient SOL in your wallet
- Configure the target cluster: `solana config set --url <cluster-url>`
- For devnet: `solana config set --url devnet`

## Creating New Scripts

When adding new scripts to this directory:

1. Make them executable: `chmod +x scripts/your-script.sh`
2. Add proper error handling with `set -e`
3. Include usage instructions as comments
4. Update this README with documentation

## Common Tasks

### Airdrop SOL (Devnet)
```bash
solana airdrop 2
```

### Check Balance
```bash
solana balance
```

### View Current Config
```bash
solana config get
```

### Generate New Keypair
```bash
solana-keygen new --outfile ~/.config/solana/id.json
```

### View Program Logs
```bash
solana logs <PROGRAM_ID>
```
