#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NETWORK="${1:-devnet}"

info() {
  printf "\033[1;32m[info]\033[0m %s\n" "$1"
}

warn() {
  printf "\033[1;33m[warn]\033[0m %s\n" "$1" >&2
}

error() {
  printf "\033[1;31m[error]\033[0m %s\n" "$1" >&2
  exit 1
}

if ! command -v solana >/dev/null 2>&1; then
  error "Solana CLI not found. Install from https://docs.solana.com/cli/install-solana-cli-tools"
fi

case "$NETWORK" in
  devnet|mainnet-beta|testnet|localnet) ;;
  *) error "Invalid network: $NETWORK. Use one of: localnet, devnet, testnet, mainnet-beta" ;;
esac

info "Configuring Solana CLI for $NETWORK."
solana config set --url "$NETWORK" >/dev/null

current_balance="$(solana balance 2>/dev/null | awk '{print $1}')"
if [[ -n "$current_balance" ]]; then
  info "Current balance: ${current_balance} SOL"
  if awk -v bal="$current_balance" 'BEGIN { exit !(bal + 0 < 1) }'; then
    warn "Balance appears low (< 1 SOL). Ensure you have sufficient funds before deploying."
    if [[ "$NETWORK" == "devnet" ]]; then
      info "Requesting 2 SOL airdrop on devnet..."
      solana airdrop 2 || warn "Automatic airdrop failed. You may need to request one manually."
    fi
  fi
else
  warn "Unable to determine wallet balance. Verify your Solana CLI configuration."
fi

program_dir="$ROOT_DIR/program"
if [[ ! -d "$program_dir" ]]; then
  warn "Program directory not found at $program_dir. Nothing to deploy."
  exit 0
fi

anchor_manifest=""
if [[ -f "$ROOT_DIR/Anchor.toml" ]]; then
  anchor_manifest="$ROOT_DIR/Anchor.toml"
elif [[ -f "$program_dir/Anchor.toml" ]]; then
  anchor_manifest="$program_dir/Anchor.toml"
fi

if [[ -n "$anchor_manifest" ]]; then
  if ! command -v anchor >/dev/null 2>&1; then
    error "Anchor CLI not found. Install via 'cargo install --git https://github.com/coral-xyz/anchor avm --locked --force'"
  fi

  anchor_dir="$(dirname "$anchor_manifest")"
  info "Building program with Anchor (manifest: $anchor_manifest)."
  (cd "$anchor_dir" && anchor build)

  info "Deploying program with Anchor."
  (cd "$anchor_dir" && anchor deploy --provider.cluster "$NETWORK")

  info "Program deployed successfully."
  info "Remember to update PROGRAM_ID in backend/.env and frontend/.env"
  exit 0
fi

if [[ ! -f "$program_dir/Cargo.toml" ]]; then
  warn "No program Cargo.toml found. Skipping deployment."
  exit 0
fi

if ! command -v cargo >/dev/null 2>&1; then
  error "Cargo not found. Install Rust toolchain before deploying."
fi

info "Building program with cargo."
(cd "$program_dir" && (cargo build-sbf || cargo build-bpf || cargo build))

program_so="$(find "$program_dir/target/deploy" -maxdepth 1 -name "*.so" | head -n 1 || true)"
if [[ -z "$program_so" ]]; then
  warn "No deployable .so artifact found under $program_dir/target/deploy. Build may not have produced a binary yet."
  exit 0
fi

info "Deploying program binary: $program_so"
solana program deploy "$program_so"

info "Program deployed successfully."
info "Remember to update PROGRAM_ID in backend/.env and frontend/.env"
