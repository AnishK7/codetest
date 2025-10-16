#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

info() {
  printf "\033[1;32m[info]\033[0m %s\n" "$1"
}

warn() {
  printf "\033[1;33m[warn]\033[0m %s\n" "$1" >&2
}

copy_env_file() {
  local component_dir="$1"
  local env_file="$ROOT_DIR/$component_dir/.env"
  local example_file="$ROOT_DIR/$component_dir/.env.example"

  if [[ ! -d "$ROOT_DIR/$component_dir" ]]; then
    warn "Component directory '$component_dir' not found; skipping env setup."
    return
  fi

  if [[ -f "$env_file" ]]; then
    info "Existing $component_dir/.env detected; skipping copy."
    return
  fi

  if [[ -f "$example_file" ]]; then
    info "Creating $component_dir/.env from template."
    cp "$example_file" "$env_file"
  else
    warn "No $component_dir/.env.example template found; creating empty .env."
    touch "$env_file"
  fi
}

install_backend_deps() {
  local component_dir="backend"
  local package_json="$ROOT_DIR/$component_dir/package.json"

  if [[ ! -f "$package_json" ]]; then
    warn "No backend/package.json found. Initialize the backend before installing dependencies."
    return
  fi

  if ! command -v npm >/dev/null 2>&1; then
    warn "npm is not installed. Skipping backend dependency installation."
    return
  fi

  info "Installing backend dependencies."
  (cd "$ROOT_DIR/$component_dir" && npm install)
}

install_frontend_deps() {
  local component_dir="frontend"
  local package_json="$ROOT_DIR/$component_dir/package.json"

  if [[ ! -f "$package_json" ]]; then
    warn "No frontend/package.json found. Initialize the frontend before installing dependencies."
    return
  fi

  if ! command -v npm >/dev/null 2>&1; then
    warn "npm is not installed. Skipping frontend dependency installation."
    return
  fi

  info "Installing frontend dependencies."
  (cd "$ROOT_DIR/$component_dir" && npm install)
}

ensure_anchor_version() {
  if command -v avm >/dev/null 2>&1; then
    info "Ensuring Anchor CLI is available."
    if ! command -v anchor >/dev/null 2>&1; then
      info "Anchor CLI not active. Attempting to enable via avm."
      avm use latest || warn "Failed to set Anchor CLI via avm."
    fi
  else
    warn "Anchor Version Manager (avm) not found. Install Anchor manually if required."
  fi
}

info "Bootstrapping project configuration."

# Ensure environment files exist
copy_env_file "backend"
copy_env_file "frontend"

# Optionally install dependencies
install_backend_deps || warn "Backend dependency installation encountered an issue."
install_frontend_deps || warn "Frontend dependency installation encountered an issue."

# Prepare program tooling
ensure_anchor_version

info "Setup complete. Review warnings above (if any) and continue with development."
