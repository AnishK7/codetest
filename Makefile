SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: help setup install build build-program build-backend build-frontend \
	 test test-program test-backend test-frontend dev lint format check clean \
	 deploy-devnet deploy-mainnet start-backend start-frontend start-program

help:
	@echo "Solana Full-Stack dApp - Available targets"
	@echo "===================================================="
	@echo "  make setup             # Initial project bootstrap"
	@echo "  make install           # Install backend/frontend dependencies"
	@echo "  make build             # Build all components"
	@echo "  make build-program     # Build Solana program"
	@echo "  make build-backend     # Build backend"
	@echo "  make build-frontend    # Build frontend"
	@echo "  make test              # Run full test suite"
	@echo "  make test-program      # Test Solana program"
	@echo "  make test-backend      # Test backend"
	@echo "  make test-frontend     # Test frontend"
	@echo "  make dev               # Start full development environment"
	@echo "  make start-program     # Start program build/deploy loop"
	@echo "  make start-backend     # Start backend dev server"
	@echo "  make start-frontend    # Start frontend dev server"
	@echo "  make lint              # Run linters"
	@echo "  make format            # Format code"
	@echo "  make check             # Lint + type checks"
	@echo "  make clean             # Remove build artifacts"
	@echo "  make deploy-devnet     # Deploy program to devnet"
	@echo "  make deploy-mainnet    # Deploy program to mainnet-beta"

setup:
	@echo "[setup] Bootstrapping project"
	@./scripts/setup.sh

install:
	@echo "[install] Installing project dependencies"
	@if [ -f backend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd backend && npm install); \
		else \
			echo "npm not found; skipping backend install"; \
		fi; \
	else \
		echo "backend/package.json not found; skipping"; \
	fi
	@if [ -f frontend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd frontend && npm install); \
		else \
			echo "npm not found; skipping frontend install"; \
		fi; \
	else \
		echo "frontend/package.json not found; skipping"; \
	fi

build:
	@./scripts/build-all.sh

build-program:
	@echo "[build] Program"
	@if [ -f program/Cargo.toml ]; then \
		if command -v anchor >/dev/null 2>&1; then \
			(cd program && anchor build); \
		elif command -v cargo >/dev/null 2>&1; then \
			(cd program && (cargo build-sbf || cargo build-bpf || cargo build)); \
		else \
			echo "Neither anchor nor cargo found"; exit 1; \
		fi; \
	else \
		echo "program/Cargo.toml not found; skipping"; \
	fi

build-backend:
	@echo "[build] Backend"
	@if [ -f backend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd backend && npm run build 2>/dev/null || echo "No build script defined; skipping backend build"); \
		else \
			echo "npm not found; skipping backend build"; \
		fi; \
	else \
		echo "backend/package.json not found; skipping"; \
	fi

build-frontend:
	@echo "[build] Frontend"
	@if [ -f frontend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd frontend && npm run build); \
		else \
			echo "npm not found; skipping frontend build"; \
		fi; \
	else \
		echo "frontend/package.json not found; skipping"; \
	fi

test:
	@./scripts/test-all.sh

test-program:
	@echo "[test] Program"
	@if [ -f program/Cargo.toml ]; then \
		if command -v anchor >/dev/null 2>&1; then \
			(cd program && anchor test); \
		elif command -v cargo >/dev/null 2>&1; then \
			(cd program && cargo test); \
		else \
			echo "Neither anchor nor cargo found"; exit 1; \
		fi; \
	else \
		echo "program/Cargo.toml not found; skipping"; \
	fi

test-backend:
	@echo "[test] Backend"
	@if [ -f backend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd backend && npm test); \
		else \
			echo "npm not found; skipping backend tests"; \
		fi; \
	else \
		echo "backend/package.json not found; skipping"; \
	fi

test-frontend:
	@echo "[test] Frontend"
	@if [ -f frontend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd frontend && npm test); \
		else \
			echo "npm not found; skipping frontend tests"; \
		fi; \
	else \
		echo "frontend/package.json not found; skipping"; \
	fi

dev:
	@./scripts/dev.sh

start-program:
	@$(MAKE) build-program

start-backend:
	@if [ -f backend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd backend && npm run dev); \
		else \
			echo "npm not found; cannot start backend"; \
		fi; \
	else \
		echo "backend/package.json not found; skipping"; \
	fi

start-frontend:
	@if [ -f frontend/package.json ]; then \
		if command -v npm >/dev/null 2>&1; then \
			(cd frontend && npm run dev); \
		else \
			echo "npm not found; cannot start frontend"; \
		fi; \
	else \
		echo "frontend/package.json not found; skipping"; \
	fi

lint:
	@echo "[lint] Running linters"
	@if [ -f program/Cargo.toml ] && command -v cargo >/dev/null 2>&1; then \
		(cd program && cargo clippy); \
	fi
	@if [ -f backend/package.json ] && command -v npm >/dev/null 2>&1; then \
		(cd backend && npm run lint 2>/dev/null || echo "No backend lint script defined"); \
	fi
	@if [ -f frontend/package.json ] && command -v npm >/dev/null 2>&1; then \
		(cd frontend && npm run lint 2>/dev/null || echo "No frontend lint script defined"); \
	fi

format:
	@echo "[format] Formatting code"
	@if [ -f program/Cargo.toml ] && command -v cargo >/dev/null 2>&1; then \
		(cd program && cargo fmt); \
	fi
	@if [ -f backend/package.json ] && command -v npm >/dev/null 2>&1; then \
		(cd backend && npm run format 2>/dev/null || echo "No backend format script defined"); \
	fi
	@if [ -f frontend/package.json ] && command -v npm >/dev/null 2>&1; then \
		(cd frontend && npm run format 2>/dev/null || echo "No frontend format script defined"); \
	fi

check: lint
	@echo "[check] Running type checks"
	@if [ -f backend/package.json ] && command -v npm >/dev/null 2>&1; then \
		(cd backend && npm run type-check 2>/dev/null || echo "No backend type-check script defined"); \
	fi
	@if [ -f frontend/package.json ] && command -v npm >/dev/null 2>&1; then \
		(cd frontend && npm run type-check 2>/dev/null || echo "No frontend type-check script defined"); \
	fi

clean:
	@echo "[clean] Removing build artifacts"
	@rm -rf program/target
	@rm -rf backend/dist backend/build backend/coverage
	@rm -rf frontend/dist frontend/build frontend/.next frontend/coverage
	@echo "[clean] Done"

deploy-devnet:
	@./scripts/deploy.sh devnet

deploy-mainnet:
	@./scripts/deploy.sh mainnet-beta
