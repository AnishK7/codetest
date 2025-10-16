# Project Structure

This document provides an overview of the repository structure and organization.

## Directory Layout

```
solana-counter-program/
│
├── programs/                    # Smart Contracts
│   └── counter-program/         
│       ├── src/
│       │   └── lib.rs          # Main program implementation
│       └── Cargo.toml          # Program dependencies
│
├── tests/                       # Test Suite
│   └── counter-program.ts      # Anchor integration tests
│
├── frontend/                    # Next.js Frontend Application
│   ├── src/
│   │   ├── app/               # Next.js app directory
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utility functions
│   ├── package.json           # Frontend dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── .env.example           # Environment variables template
│
├── backend/                     # Backend API (Future)
│   └── README.md              # Backend documentation
│
├── scripts/                     # Utility Scripts
│   ├── deploy.sh              # Deployment script
│   ├── setup-local.sh         # Local development setup
│   └── README.md              # Scripts documentation
│
├── migrations/                  # Anchor Migrations
│   └── deploy.ts              # Deployment migration
│
├── target/                      # Build Output (gitignored)
│   ├── deploy/                # Program binaries
│   ├── types/                 # Generated TypeScript types
│   └── idl/                   # Generated IDL files
│
├── node_modules/               # Node Dependencies (gitignored)
│
├── Anchor.toml                 # Anchor configuration
├── Cargo.toml                  # Rust workspace config
├── package.json                # Root dependencies
├── tsconfig.json               # Root TypeScript config
├── rust-toolchain.toml         # Rust version specification
│
├── .gitignore                  # Git ignore rules
├── .editorconfig               # Editor configuration
├── .prettierrc                 # Prettier configuration
├── .prettierignore             # Prettier ignore rules
│
├── Makefile                    # Build automation
├── README.md                   # Main documentation
├── QUICKSTART.md               # Quick start guide
├── CONTRIBUTING.md             # Contributing guidelines
├── LICENSE                     # MIT License
└── PROJECT_STRUCTURE.md        # This file
```

## Key Files

### Smart Contract

**`programs/counter-program/src/lib.rs`**
- Main program implementation
- Defines instructions: `initialize` and `increment`
- Defines account structure: `Counter`
- Implements error handling and validation

**`programs/counter-program/Cargo.toml`**
- Program dependencies (anchor-lang, anchor-spl, etc.)
- Program metadata

### Tests

**`tests/counter-program.ts`**
- Integration tests using Anchor's testing framework
- Tests initialization, increment, and authorization
- Uses Mocha and Chai for assertions

### Configuration

**`Anchor.toml`**
- Anchor framework configuration
- Program addresses for different clusters (localnet, devnet)
- Provider settings (RPC URL, wallet path)
- Test script configuration

**`Cargo.toml`**
- Rust workspace configuration
- Build optimization settings
- Workspace member paths

**`package.json`** (Root)
- Anchor dependencies (@coral-xyz/anchor)
- Test framework dependencies (mocha, chai, ts-mocha)
- Build and test scripts

**`tsconfig.json`** (Root)
- TypeScript configuration for tests and migrations
- Module resolution and compilation settings

### Scripts

**`scripts/deploy.sh`**
- Interactive deployment script
- Validates environment and prerequisites
- Builds and deploys program to configured cluster
- Displays deployment information

**`scripts/setup-local.sh`**
- Sets up local development environment
- Starts local validator if needed
- Creates wallet and requests airdrop
- Prepares for local testing

### Frontend

**`frontend/package.json`**
- Next.js and React dependencies
- Solana web3 libraries
- Wallet adapter packages
- UI component libraries

**`frontend/src/app/`**
- Next.js 13+ app directory structure
- Page routes and layouts
- Global styles

**`frontend/src/components/`**
- React components for UI
- Wallet integration components
- Counter dashboard
- Reusable UI elements

### Documentation

**`README.md`**
- Comprehensive project documentation
- Installation and setup instructions
- API reference and examples
- Deployment guides
- Troubleshooting

**`QUICKSTART.md`**
- Condensed getting started guide
- 5-minute setup instructions
- Common commands
- Quick reference

**`CONTRIBUTING.md`**
- Contribution guidelines
- Code style standards
- Development workflow
- Pull request process

## Build Artifacts

The following directories are generated during build and are gitignored:

- `target/` - Rust/Anchor build output
  - `target/deploy/` - Compiled program binaries (.so files)
  - `target/types/` - Generated TypeScript types
  - `target/idl/` - Interface Definition Language (IDL) files

- `node_modules/` - Node.js dependencies

- `.anchor/` - Anchor framework cache

- `test-ledger/` - Local validator ledger data

## Environment Files

- `.env.example` - Template for environment variables (committed)
- `.env.local` - Local environment configuration (gitignored)
- `.env` - Environment variables (gitignored)

## Adding New Files

When adding new files to the project:

### New Program Instructions
1. Add instruction handler in `programs/counter-program/src/lib.rs`
2. Add corresponding test in `tests/counter-program.ts`
3. Update documentation in README.md

### New Components
1. Add component file in `frontend/src/components/`
2. Export from appropriate index file
3. Import and use in pages/layouts

### New Scripts
1. Add script file in `scripts/`
2. Make executable: `chmod +x scripts/your-script.sh`
3. Document in `scripts/README.md`

### New Documentation
1. Add .md file in root or appropriate directory
2. Link from main README.md
3. Update PROJECT_STRUCTURE.md if needed

## Dependencies

### Rust Dependencies
- `anchor-lang` - Anchor framework core
- `anchor-spl` - Solana Program Library utilities

### Node Dependencies
- `@coral-xyz/anchor` - Anchor TypeScript client
- `@solana/web3.js` - Solana JavaScript SDK
- `next` - Next.js framework
- `react` - React library
- `mocha` - Test framework
- `chai` - Assertion library

## Build Process

1. **Rust Compilation**: `cargo build-sbf`
   - Compiles Rust code to BPF bytecode
   - Produces .so binary in target/deploy/

2. **IDL Generation**: Anchor generates IDL
   - Creates JSON interface definition
   - Generates TypeScript types

3. **TypeScript Compilation**: `tsc`
   - Compiles TypeScript test files
   - Type-checks code

4. **Test Execution**: `ts-mocha`
   - Starts local validator
   - Deploys program
   - Runs test suite
   - Reports results

## Version Control

The repository uses Git with the following ignored paths:
- Build artifacts (target/, dist/, .anchor/)
- Dependencies (node_modules/)
- Environment files (.env.local, .env)
- OS files (.DS_Store, *.swp)
- Lockfiles (Cargo.lock for libraries)

See `.gitignore` for complete list.

## Continuous Integration

For CI/CD integration, typical workflow:

1. Install Rust and Anchor
2. Install Node.js dependencies: `yarn install`
3. Build program: `anchor build`
4. Run tests: `anchor test`
5. Build frontend: `cd frontend && npm run build`
6. Deploy (if on main branch)

See individual CI/CD provider docs for specific configuration.
