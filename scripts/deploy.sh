#!/bin/bash

set -e

echo "======================================"
echo "Deploying Solana Counter Program"
echo "======================================"

echo ""
echo "Checking Solana CLI installation..."
if ! command -v solana &> /dev/null; then
    echo "Error: Solana CLI is not installed."
    echo "Please install it from: https://docs.solana.com/cli/install-solana-cli-tools"
    exit 1
fi

echo ""
echo "Checking Anchor CLI installation..."
if ! command -v anchor &> /dev/null; then
    echo "Error: Anchor CLI is not installed."
    echo "Please install it from: https://www.anchor-lang.com/docs/installation"
    exit 1
fi

echo ""
echo "Current Solana configuration:"
solana config get

echo ""
echo "Current cluster: $(solana config get | grep 'RPC URL' | awk '{print $3}')"
echo "Current wallet: $(solana config get | grep 'Keypair Path' | awk '{print $3}')"

echo ""
read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo "Checking wallet balance..."
BALANCE=$(solana balance | awk '{print $1}')
echo "Current balance: $BALANCE SOL"

if (( $(echo "$BALANCE < 0.1" | bc -l) )); then
    echo "Warning: Low balance. You may need more SOL for deployment."
    echo "For devnet, request an airdrop with: solana airdrop 2"
fi

echo ""
echo "Building the program..."
anchor build

echo ""
echo "Deploying the program..."
anchor deploy

echo ""
echo "======================================"
echo "Deployment completed successfully!"
echo "======================================"

echo ""
echo "Program ID:"
solana address -k target/deploy/counter_program-keypair.json

echo ""
echo "Next steps:"
echo "1. Update the program ID in Anchor.toml if it changed"
echo "2. Update the program ID in programs/counter-program/src/lib.rs (declare_id!)"
echo "3. Run 'anchor build' again if you updated the program ID"
echo "4. Run tests with: anchor test --skip-local-validator"
