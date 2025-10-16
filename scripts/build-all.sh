#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

info() {
  printf "\033[1;32m[info]\033[0m %s\n" "$1"
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

build_program() {
  local program_dir="$ROOT_DIR/program"

  if [[ ! -d "$program_dir" ]]; then
    info "No program directory found; skipping program build."
    return 0
  fi

  if [[ ! -f "$program_dir/Cargo.toml" ]]; then
    info "No Cargo.toml in program directory; skipping program build."
    return 0
  fi

  info "Building Solana program."
  if command -v anchor >/dev/null 2>&1; then
    (cd "$program_dir" && anchor build)
  elif command -v cargo >/dev/null 2>&1; then
    (cd "$program_dir" && (cargo build-sbf || cargo build-bpf || cargo build))
  else
    error "Neither 'anchor' nor 'cargo' found. Cannot build program."
    return 1
  fi
}

build_backend() {
  local backend_dir="$ROOT_DIR/backend"

  if [[ ! -d "$backend_dir" ]]; then
    info "No backend directory found; skipping backend build."
    return 0
  fi

  if [[ ! -f "$backend_dir/package.json" ]]; then
    info "No package.json in backend directory; skipping backend build."
    return 0
  fi

  if ! command -v npm >/dev/null 2>&1; then
    info "npm is not installed. Skipping backend build."
    return 0
  fi

  if has_npm_script "$backend_dir" "build"; then
    info "Building backend."
    (cd "$backend_dir" && npm run build)
  else
    info "No build script defined in backend/package.json; skipping backend build."
  fi
}

build_frontend() {
  local frontend_dir="$ROOT_DIR/frontend"

  if [[ ! -d "$frontend_dir" ]]; then
    info "No frontend directory found; skipping frontend build."
    return 0
  fi

  if [[ ! -f "$frontend_dir/package.json" ]]; then
    info "No package.json in frontend directory; skipping frontend build."
    return 0
  fi

  if ! command -v npm >/dev/null 2>&1; then
    info "npm is not installed. Skipping frontend build."
    return 0
  fi

  if has_npm_script "$frontend_dir" "build"; then
    info "Building frontend."
    (cd "$frontend_dir" && npm run build)
  else
    info "No build script defined in frontend/package.json; skipping frontend build."
  fi
}

info "Building all components."

build_program || { error "Program build failed."; exit 1; }
build_backend || { error "Backend build failed."; exit 1; }
build_frontend || { error "Frontend build failed."; exit 1; }

info "All components built successfully."
