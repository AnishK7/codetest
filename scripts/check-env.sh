#!/bin/bash

echo "======================================"
echo "Environment Check"
echo "======================================"
echo ""

check_command() {
    local cmd=$1
    local name=$2
    local install_msg=$3
    
    if command -v "$cmd" &> /dev/null; then
        local version=$($cmd --version 2>&1 | head -n1)
        echo "✓ $name: $version"
        return 0
    else
        echo "✗ $name: Not installed"
        if [ -n "$install_msg" ]; then
            echo "  Install: $install_msg"
        fi
        return 1
    fi
}

echo "Required Tools:"
echo "---------------"
check_command "node" "Node.js" "https://nodejs.org/"
check_command "cargo" "Rust/Cargo" "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
check_command "solana" "Solana CLI" "sh -c \"\$(curl -sSfL https://release.solana.com/stable/install)\""
check_command "anchor" "Anchor CLI" "cargo install --git https://github.com/coral-xyz/anchor avm --locked --force && avm install latest"

echo ""
echo "Optional Tools:"
echo "---------------"
check_command "yarn" "Yarn" "npm install -g yarn"
check_command "git" "Git" "apt-get install git"

echo ""
if command -v solana &> /dev/null; then
    echo "Solana Configuration:"
    echo "--------------------"
    echo "Cluster: $(solana config get | grep 'RPC URL' | awk '{print $3}')"
    echo "Wallet: $(solana config get | grep 'Keypair Path' | awk '{print $3}')"
    
    if [ -f ~/.config/solana/id.json ]; then
        echo "Wallet Address: $(solana address)"
        echo "Balance: $(solana balance 2>/dev/null || echo 'Unable to fetch')"
    else
        echo "⚠️  No wallet keypair found at ~/.config/solana/id.json"
        echo "   Create one with: solana-keygen new"
    fi
fi

echo ""
echo "======================================"
echo "Environment check complete!"
echo "======================================"
