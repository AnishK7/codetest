#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

info() {
  printf "\033[1;32m[info]\033[0m %s\n" "$1"
}

warn() {
  printf "\033[1;33m[warn]\033[0m %s\n" "$1" >&2
}

error() {
  printf "\033[1;31m[error]\033[0m %s\n" "$1" >&2
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

test_program() {
  local program_dir="$ROOT_DIR/program"

  if [[ ! -d "$program_dir" || ! -f "$program_dir/Cargo.toml" ]]; then
    info "Program workspace not initialized; skipping program tests."
    return 0
  fi

  if command -v anchor >/dev/null 2>&1; then
    info "Running Anchor tests."
    (cd "$program_dir" && anchor test)
  elif command -v cargo >/dev/null 2>&1; then
    info "Running cargo tests."
    (cd "$program_dir" && cargo test)
  else
    warn "Neither 'anchor' nor 'cargo' found. Skipping program tests."
  fi
}

test_backend() {
  local backend_dir="$ROOT_DIR/backend"

  if [[ ! -d "$backend_dir" || ! -f "$backend_dir/package.json" ]]; then
    info "Backend project not initialized; skipping backend tests."
    return 0
  fi

  if ! command -v npm >/dev/null 2>&1; then
    info "npm not found. Skipping backend tests."
    return 0
  fi

  if has_npm_script "$backend_dir" "test"; then
    info "Running backend tests."
    (cd "$backend_dir" && npm test)
  else
    info "No test script defined in backend/package.json; skipping backend tests."
  fi
}

test_frontend() {
  local frontend_dir="$ROOT_DIR/frontend"

  if [[ ! -d "$frontend_dir" || ! -f "$frontend_dir/package.json" ]]; then
    info "Frontend project not initialized; skipping frontend tests."
    return 0
  fi

  if ! command -v npm >/dev/null 2>&1; then
    info "npm not found. Skipping frontend tests."
    return 0
  fi

  if has_npm_script "$frontend_dir" "test"; then
    info "Running frontend tests."
    (cd "$frontend_dir" && npm test)
  else
    info "No test script defined in frontend/package.json; skipping frontend tests."
  fi
}

info "Running full test suite."

test_program || { error "Program tests failed."; exit 1; }
test_backend || { error "Backend tests failed."; exit 1; }
test_frontend || { error "Frontend tests failed."; exit 1; }

info "All requested tests completed."
