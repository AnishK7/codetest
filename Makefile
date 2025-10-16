.PHONY: help build test deploy clean install format lint

help:
	@echo "Available commands:"
	@echo "  make install  - Install all dependencies"
	@echo "  make build    - Build the Anchor program"
	@echo "  make test     - Run tests"
	@echo "  make deploy   - Deploy to configured cluster"
	@echo "  make clean    - Clean build artifacts"
	@echo "  make format   - Format code"
	@echo "  make lint     - Lint code"

install:
	@echo "Installing Anchor dependencies..."
	yarn install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

build:
	@echo "Building Anchor program..."
	anchor build

test:
	@echo "Running Anchor tests..."
	anchor test

deploy:
	@echo "Deploying program..."
	./scripts/deploy.sh

clean:
	@echo "Cleaning build artifacts..."
	rm -rf target
	rm -rf test-ledger
	rm -rf .anchor

format:
	@echo "Formatting code..."
	prettier --write .

lint:
	@echo "Linting code..."
	prettier --check .
