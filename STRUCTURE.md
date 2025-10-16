# Repository Structure Documentation

This document provides a comprehensive overview of the repository structure and organization.

## Directory Structure

```
.
├── programs/                    # Anchor smart contracts
│   └── counter-program/        # Counter program implementation
│       ├── src/
│       │   └── lib.rs         # Main program logic with initialize & increment
│       └── Cargo.toml         # Rust package configuration
│
├── tests/                      # Anchor test suite
│   └── counter-program.ts     # Comprehensive tests for counter program
│
├── frontend/                   # Next.js frontend application
│   ├── src/                   # Frontend source code
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom React hooks
│   │   └── lib/              # Utility libraries
│   ├── package.json          # Frontend dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── next.config.js        # Next.js configuration
│
├── backend/                    # Backend API (placeholder)
│   └── README.md              # Backend documentation
│
├── scripts/                    # Utility scripts
│   ├── deploy.sh              # Interactive deployment script
│   ├── setup-local.sh         # Local development setup
│   └── README.md              # Scripts documentation
│
├── migrations/                 # Anchor migrations
│   └── deploy.ts              # Deployment migration script
│
├── Anchor.toml                # Anchor workspace configuration
├── Cargo.toml                 # Rust workspace configuration
├── package.json               # Root package configuration
├── tsconfig.json              # Root TypeScript configuration
├── Makefile                   # Development commands
├── .editorconfig              # Editor configuration
├── .prettierrc                # Prettier configuration
├── .prettierignore            # Prettier ignore patterns
├── .gitignore                 # Git ignore patterns
├── README.md                  # Main documentation
├── QUICKSTART.md              # Quick start guide
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # MIT License
└── rust-toolchain.toml        # Rust toolchain specification
```

## Key Files

### Smart Contract

**programs/counter-program/src/lib.rs**
- Main Anchor program implementation
- Instructions: `initialize`, `increment`
- Accounts: `Counter` struct with count and authority
- Error codes: `Overflow`, `Unauthorized`
- Account validation with `has_one` constraint

### Tests

**tests/counter-program.ts**
- Comprehensive test suite using Anchor framework
- Tests initialization, single/multiple increments, authority validation
- Uses Mocha and Chai for assertions

### Configuration Files

**Anchor.toml**
- Anchor workspace configuration
- Program addresses for localnet and devnet
- Provider settings (cluster: devnet, wallet path)
- Test script configuration

**Cargo.toml**
- Rust workspace configuration
- Release profile optimizations (LTO, overflow checks)

**package.json** (root)
- Root dependencies: @coral-xyz/anchor, @solana/web3.js
- Dev dependencies: TypeScript, Mocha, Chai, Prettier
- Scripts: build, test, deploy, format, lint

**tsconfig.json** (root)
- TypeScript configuration for tests and migrations
- Targets ES2020, CommonJS module system
- Includes: tests/, migrations/

### Scripts

**scripts/deploy.sh**
- Interactive deployment script with checks
- Verifies Solana/Anchor CLI installation
- Checks cluster configuration and wallet balance
- Builds and deploys the program
- Provides post-deployment instructions

**scripts/setup-local.sh**
- Sets up local development environment
- Configures Solana for localnet
- Starts local validator if not running
- Creates wallet and requests airdrop

### Development Tools

**Makefile**
- Common development commands
- Targets: install, build, test, deploy, clean, format, lint
- Simplifies workflow with `make <command>`

**.editorconfig**
- Cross-editor configuration
- Indentation: 2 spaces (JS/TS), 4 spaces (Rust)
- Line endings: LF, UTF-8 encoding

**.prettierrc** & **.prettierignore**
- Code formatting configuration
- 80 character line width, semicolons, double quotes
- Excludes: node_modules, target, build artifacts

## Documentation Files

**README.md**
- Comprehensive project documentation
- Features, prerequisites, installation instructions
- Build, test, and deployment guides
- API reference and troubleshooting

**QUICKSTART.md**
- 5-minute setup guide
- Essential commands and workflows
- Quick testing and deployment instructions

**CONTRIBUTING.md**
- Contribution guidelines
- Development workflow and code style
- Testing guidelines and PR checklist

**STRUCTURE.md** (this file)
- Repository structure documentation
- Detailed file and directory descriptions

## Frontend Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── counter-dashboard.tsx    # Main counter interface
│   │   ├── providers/
│   │   │   └── wallet-provider.tsx  # Solana wallet setup
│   │   ├── ui/                      # UI components
│   │   └── wallet/                  # Wallet components
│   ├── hooks/
│   │   └── use-counter.ts     # Counter state management
│   └── lib/
│       └── api.ts             # API client
└── package.json               # Frontend dependencies
```

## Build Artifacts (Ignored)

- `target/` - Rust build artifacts and compiled programs
- `node_modules/` - Node.js dependencies
- `.anchor/` - Anchor build cache
- `test-ledger/` - Local test validator data
- `.next/` - Next.js build output

## Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Program Configuration

**Program ID**: `GK5CdkKWciUWsj6uSLSZwJBDpji7AavaBin5dZau4uX3`
**Cluster**: Devnet (configurable in Anchor.toml)
**Wallet**: `~/.config/solana/id.json`

## Dependencies

### Rust/Anchor
- anchor-lang (latest via Cargo.toml reference)
- Rust 1.89.0 (specified in rust-toolchain.toml)

### Node.js
- @coral-xyz/anchor: ^0.32.1
- @solana/web3.js: ^1.91.4
- TypeScript: ^5.2.2
- Mocha, Chai (testing)

### Frontend
- Next.js: ^13.5.6
- React: ^18.2.0
- @solana/wallet-adapter-react: ^0.15.24
- Tailwind CSS: ^3.3.3

## Development Workflow

1. **Initial Setup**: `make install` or `yarn install && cd frontend && npm install`
2. **Build**: `make build` or `anchor build`
3. **Test**: `make test` or `anchor test`
4. **Deploy**: `make deploy` or `./scripts/deploy.sh`
5. **Local Dev**: `./scripts/setup-local.sh`
6. **Frontend**: `cd frontend && npm run dev`

## Version Control

**Git Configuration**
- Branch: `scaffold-anchor-solana-counter-repo`
- .gitignore includes: build artifacts, dependencies, env files

**Ignored Patterns**
- node_modules/, target/, .anchor/
- .env*, .DS_Store
- Build outputs: dist/, build/, out/

## Testing Strategy

**Test Coverage**
- ✅ Counter initialization with proper account setup
- ✅ Single increment operation
- ✅ Multiple sequential increments
- ✅ Authority validation (rejects unauthorized users)
- ✅ Error handling for overflow (via checked_add)

**Test Environment**
- Local validator started automatically by `anchor test`
- Fresh state for each test run
- Uses Keypair.generate() for test accounts
- Includes airdrop for unauthorized authority test

## Deployment Targets

**Localnet**
- For development and testing
- Started with `solana-test-validator`

**Devnet**
- Default target (Anchor.toml)
- Public test network
- Free SOL via airdrop

**Mainnet-beta**
- Production deployment (requires configuration)
- Real SOL required

## Additional Resources

All documentation files include:
- Installation instructions
- Usage examples
- Troubleshooting guides
- Links to official Solana/Anchor resources

## Maintenance

**Regular Tasks**
- Keep dependencies updated
- Run tests before commits: `make test`
- Format code: `make format`
- Clean build artifacts: `make clean`
- Check for security updates

---

Last updated: 2024-10-16
