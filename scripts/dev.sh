#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PIDS=()

info() {
  printf "\033[1;32m[info]\033[0m %s\n" "$1"
}

warn() {
  printf "\033[1;33m[warn]\033[0m %s\n" "$1" >&2
}

has_npm_script() {
  local project_dir="$1"
  local script_name="$2"

  if [[ ! -f "$project_dir/package.json" ]]; then
    return 1
  fi

  if ! command -v node >/dev/null 2>&1; then
    return 1
  fi

  (cd "$project_dir" && node -e "const pkg = require('./package.json'); process.exit(pkg.scripts && pkg.scripts['$script_name'] ? 0 : 1);") >/dev/null 2>&1
}

start_validator() {
  if ! command -v solana-test-validator >/dev/null 2>&1; then
    warn "solana-test-validator not found; skipping local validator."
    return
  fi

  if pgrep -f "solana-test-validator" >/dev/null 2>&1; then
    info "solana-test-validator already running; skipping new instance."
    return
  fi

  info "Starting local solana-test-validator."
  solana-test-validator --reset --limit-ledger-size 500 &
  PIDS+=("$!")
  sleep 5
}

start_program() {
  local program_dir="$ROOT_DIR/program"

  if [[ ! -f "$program_dir/Cargo.toml" ]]; then
    warn "Program workspace not initialised; skipping program deployment."
    return
  fi

  local anchor_manifest=""
  if [[ -f "$ROOT_DIR/Anchor.toml" ]]; then
    anchor_manifest="$ROOT_DIR/Anchor.toml"
  elif [[ -f "$program_dir/Anchor.toml" ]]; then
    anchor_manifest="$program_dir/Anchor.toml"
  fi

  if [[ -n "$anchor_manifest" && command -v anchor >/dev/null 2>&1 ]]; then
    local anchor_dir="$(dirname "$anchor_manifest")"
    info "Deploying program locally with Anchor (manifest: $anchor_manifest)."
    (cd "$anchor_dir" && anchor deploy --provider.cluster localnet) &
    PIDS+=("$!")
  elif command -v cargo >/dev/null 2>&1; then
    info "Building program locally with cargo (no deployment)."
    (cd "$program_dir" && (cargo build-sbf || cargo build-bpf || cargo build)) &
    PIDS+=("$!")
  else
    warn "Neither anchor nor cargo available; cannot run program tasks."
  fi
}

start_backend() {
  local backend_dir="$ROOT_DIR/backend"

  if [[ ! -f "$backend_dir/package.json" ]]; then
    warn "Backend project not initialised; skipping backend start."
    return
  fi

  if ! command -v npm >/dev/null 2>&1; then
    warn "npm not found; cannot start backend."
    return
  fi

  if has_npm_script "$backend_dir" "dev"; then
    info "Starting backend development server."
    (cd "$backend_dir" && npm run dev) &
    PIDS+=("$!")
  elif has_npm_script "$backend_dir" "start"; then
    info "Starting backend server (using start script)."
    (cd "$backend_dir" && npm start) &
    PIDS+=("$!")
  else
    warn "No dev or start script found in backend/package.json; skipping backend."
  fi
}

start_frontend() {
  local frontend_dir="$ROOT_DIR/frontend"

  if [[ ! -f "$frontend_dir/package.json" ]]; then
    warn "Frontend project not initialised; skipping frontend start."
    return
  fi

  if ! command -v npm >/dev/null 2>&1; then
    warn "npm not found; cannot start frontend."
    return
  fi

  if has_npm_script "$frontend_dir" "dev"; then
    info "Starting frontend development server."
    (cd "$frontend_dir" && npm run dev) &
    PIDS+=("$!")
  elif has_npm_script "$frontend_dir" "start"; then
    info "Starting frontend server (using start script)."
    (cd "$frontend_dir" && npm start) &
    PIDS+=("$!")
  else
    warn "No dev or start script found in frontend/package.json; skipping frontend."
  fi
}

cleanup() {
  info "Shutting down development environment."
  for pid in "${PIDS[@]}"; do
    if kill -0 "$pid" >/dev/null 2>&1; then
      kill "$pid" >/dev/null 2>&1 || true
    fi
  done
}

trap cleanup EXIT INT TERM

info "Bootstrapping full-stack development environment."

start_validator
start_program
start_backend
start_frontend

if [[ ${#PIDS[@]} -eq 0 ]]; then
  warn "No services were started. Ensure components are initialised."
  exit 0
fi

info "Services running. Press Ctrl+C to stop."
wait -n || true
