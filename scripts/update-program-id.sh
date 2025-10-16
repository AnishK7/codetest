#!/bin/bash

set -e

echo "======================================"
echo "Update Program ID"
echo "======================================"

if [ $# -ne 1 ]; then
    echo "Usage: $0 <NEW_PROGRAM_ID>"
    echo ""
    echo "Example:"
    echo "  $0 8ZF3Yq4VJZ9mX2KpN7W1Lr4H5cG6DkT3Bj2aR9vQ4eS1"
    echo ""
    echo "To get the current program ID:"
    echo "  solana address -k target/deploy/counter_program-keypair.json"
    exit 1
fi

NEW_PROGRAM_ID=$1

echo ""
echo "New Program ID: $NEW_PROGRAM_ID"
echo ""
read -p "Update program ID in all files? (y/n) " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Update cancelled."
    exit 0
fi

echo ""
echo "Updating Anchor.toml..."
sed -i.bak "s/counter_program = \".*\"/counter_program = \"$NEW_PROGRAM_ID\"/" Anchor.toml

echo "Updating programs/counter-program/src/lib.rs..."
sed -i.bak "s/declare_id!(\".*\")/declare_id!(\"$NEW_PROGRAM_ID\")/" programs/counter-program/src/lib.rs

echo ""
echo "✓ Program ID updated in:"
echo "  - Anchor.toml"
echo "  - programs/counter-program/src/lib.rs"

echo ""
echo "Backup files created with .bak extension"

echo ""
echo "Next steps:"
echo "1. Review the changes"
echo "2. Run: anchor build"
echo "3. Run: anchor deploy"

echo ""
echo "To verify:"
echo "  grep -r \"$NEW_PROGRAM_ID\" Anchor.toml programs/counter-program/src/lib.rs"
