#!/bin/bash

set -e

echo "======================================"
echo "Setting up Local Development"
echo "======================================"

echo ""
echo "Configuring Solana for localnet..."
solana config set --url localhost

echo ""
echo "Checking if local validator is running..."
if ! solana cluster-version &> /dev/null; then
    echo "Local validator is not running."
    echo "Starting local validator in the background..."
    solana-test-validator > /dev/null 2>&1 &
    VALIDATOR_PID=$!
    echo "Validator started with PID: $VALIDATOR_PID"
    
    echo "Waiting for validator to be ready..."
    sleep 5
    
    echo "Checking validator status..."
    if solana cluster-version &> /dev/null; then
        echo "✓ Validator is running"
    else
        echo "✗ Failed to start validator"
        exit 1
    fi
else
    echo "✓ Local validator is already running"
fi

echo ""
echo "Checking wallet configuration..."
if [ ! -f ~/.config/solana/id.json ]; then
    echo "No wallet found. Creating new keypair..."
    solana-keygen new --no-bip39-passphrase --silent --outfile ~/.config/solana/id.json
    echo "✓ Wallet created"
else
    echo "✓ Wallet exists"
fi

echo ""
echo "Wallet address: $(solana address)"

echo ""
echo "Requesting airdrop..."
solana airdrop 10 || echo "Airdrop may have failed or limit reached"

echo ""
echo "Current balance: $(solana balance)"

echo ""
echo "======================================"
echo "Local development setup complete!"
echo "======================================"

echo ""
echo "Next steps:"
echo "1. Run 'anchor build' to build the program"
echo "2. Run 'anchor test' to run tests"
echo "3. Run 'anchor deploy' to deploy locally"
