# Architecture Overview

This document provides a comprehensive overview of the Solana Counter Program project architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│                  (Next.js + TypeScript)                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Wallet     │  │   Counter    │  │     UI       │     │
│  │   Provider   │  │   Dashboard  │  │  Components  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ @solana/web3.js
                            │ @coral-xyz/anchor
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Solana Blockchain                      │
│                         (Devnet)                            │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │            Counter Program (Anchor)                │    │
│  │                                                      │    │
│  │  ┌──────────────┐         ┌──────────────┐        │    │
│  │  │  initialize  │         │  increment   │        │    │
│  │  │              │         │              │        │    │
│  │  │ Creates new  │         │ Increments   │        │    │
│  │  │   counter    │         │   counter    │        │    │
│  │  └──────────────┘         └──────────────┘        │    │
│  │                                                      │    │
│  │  Counter Account:                                   │    │
│  │  - count: u64                                       │    │
│  │  - authority: Pubkey                                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
solana-counter-program/
│
├── programs/                    # Smart contracts
│   └── counter-program/
│       ├── src/
│       │   └── lib.rs          # Main program logic
│       └── Cargo.toml          # Rust dependencies
│
├── tests/                       # Test suite
│   └── counter-program.ts      # Integration tests
│
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   └── lib/                # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Backend API (future)
│   └── README.md
│
├── scripts/                     # Utility scripts
│   ├── deploy.sh               # Deployment script
│   ├── setup-local.sh          # Local setup script
│   └── README.md
│
├── migrations/                  # Anchor migrations
│   └── deploy.ts
│
├── Anchor.toml                 # Anchor configuration
├── Cargo.toml                  # Rust workspace
├── package.json                # Root dependencies
├── tsconfig.json               # TypeScript config
├── Makefile                    # Development tasks
│
├── README.md                   # Main documentation
├── QUICKSTART.md               # Quick start guide
├── CONTRIBUTING.md             # Contribution guidelines
├── ARCHITECTURE.md             # This file
├── LICENSE                     # MIT License
│
└── Configuration Files
    ├── .editorconfig           # Editor settings
    ├── .gitignore              # Git ignore rules
    ├── .prettierrc             # Prettier config
    └── .prettierignore         # Prettier ignore rules
```

## Component Details

### Smart Contract (Anchor Program)

**Location**: `programs/counter-program/src/lib.rs`

**Features**:
- Written in Rust using the Anchor framework
- Two main instructions: `initialize` and `increment`
- Account validation and authority checks
- Overflow protection with checked arithmetic
- Custom error handling

**Data Structures**:
```rust
pub struct Counter {
    pub count: u64,        // Counter value
    pub authority: Pubkey, // Owner's public key
}
```

**Instructions**:
1. **initialize**: Creates a new counter account
   - Initializes count to 0
   - Sets authority to the signer
   - Allocates account space

2. **increment**: Increments counter by 1
   - Validates authority
   - Uses checked addition (prevents overflow)
   - Updates on-chain state

**Error Codes**:
- `Overflow`: Arithmetic overflow
- `Unauthorized`: Invalid authority

### Test Suite

**Location**: `tests/counter-program.ts`

**Coverage**:
- ✅ Counter initialization
- ✅ Single increment operation
- ✅ Multiple increments
- ✅ Authority validation (negative test)

**Framework**: Anchor's test framework with Mocha and Chai

### Frontend Application

**Location**: `frontend/`

**Tech Stack**:
- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Solana Wallet Adapter for wallet integration

**Key Components**:
- `WalletProvider`: Solana wallet integration
- `CounterDashboard`: Main counter interface
- `WalletButton`: Wallet connection UI
- `WalletStatus`: Display connection status
- UI components: Button, Card, Alert

**Features**:
- Wallet connection (Phantom/Solflare)
- Initialize counter
- Increment counter
- Real-time updates
- Error handling
- Responsive design

### Scripts

**deploy.sh**: Interactive deployment script
- Validates environment
- Checks wallet balance
- Builds and deploys program
- Displays program ID

**setup-local.sh**: Local development setup
- Configures Solana CLI
- Starts local validator
- Creates wallet
- Requests airdrop

## Data Flow

### Initialize Counter Flow

```
User clicks "Initialize"
    │
    ▼
Frontend creates transaction
    │
    ▼
User signs with wallet
    │
    ▼
Transaction sent to Solana
    │
    ▼
Counter Program validates accounts
    │
    ▼
Creates Counter account
    │
    ├─ count: 0
    └─ authority: user's pubkey
    │
    ▼
Transaction confirmed
    │
    ▼
Frontend updates UI
```

### Increment Counter Flow

```
User clicks "Increment"
    │
    ▼
Frontend creates transaction
    │
    ▼
User signs with wallet
    │
    ▼
Transaction sent to Solana
    │
    ▼
Counter Program validates
    │
    ├─ Counter exists?
    ├─ Authority matches?
    └─ No overflow?
    │
    ▼
Increments count by 1
    │
    ▼
Transaction confirmed
    │
    ▼
Frontend fetches new value
    │
    ▼
UI updates with new count
```

## Security Considerations

### Smart Contract Security

1. **Authority Validation**
   - Uses `has_one = authority` constraint
   - Prevents unauthorized modifications

2. **Overflow Protection**
   - `checked_add()` prevents integer overflow
   - Returns error on overflow

3. **Account Validation**
   - Anchor's account constraints
   - Type-safe account deserialization

4. **Initialization Guard**
   - `init` constraint ensures one-time initialization
   - Prevents reinitialization attacks

### Frontend Security

1. **Wallet Integration**
   - Uses official Solana Wallet Adapter
   - No private key handling in app

2. **Transaction Signing**
   - All transactions require user approval
   - Wallet handles signing securely

3. **RPC Connection**
   - Configurable RPC endpoints
   - Environment variable configuration

## Deployment Architecture

### Development Environment

```
Developer Machine
    │
    ├─ Solana CLI (local validator)
    ├─ Anchor CLI (build & deploy)
    ├─ Node.js (frontend dev server)
    └─ Rust toolchain (compile program)
```

### Devnet Deployment

```
Developer Machine
    │
    ├─ Build: anchor build
    ├─ Deploy: anchor deploy
    │
    ▼
Solana Devnet
    │
    └─ Program: GK5CdkKWciUWsj6uSLSZwJBDpji7AavaBin5dZau4uX3
```

### Production Architecture (Future)

```
                    ┌─────────────┐
                    │   Frontend  │
                    │   (Vercel)  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Backend   │
                    │    (API)    │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Solana    │
                    │  Mainnet    │
                    └─────────────┘
```

## Development Workflow

1. **Setup**: Install dependencies
2. **Build**: Compile Rust program
3. **Test**: Run test suite locally
4. **Deploy**: Deploy to devnet/mainnet
5. **Verify**: Test deployed program
6. **Frontend**: Connect frontend to program

## Testing Strategy

### Unit Tests
- Individual instruction handlers
- Account validation logic
- Error conditions

### Integration Tests
- Full transaction flow
- Multiple instruction sequence
- Authority validation

### End-to-End Tests (Future)
- Frontend + backend + blockchain
- User workflows
- Error handling

## Performance Considerations

### On-Chain Performance
- Minimal compute units used
- Single account modification per instruction
- No complex calculations

### Frontend Performance
- Static generation where possible
- Client-side state management
- Efficient RPC calls

## Future Enhancements

### Smart Contract
- [ ] Decrement instruction
- [ ] Reset counter
- [ ] Multiple counters per user
- [ ] Counter with custom step size
- [ ] Access control improvements

### Frontend
- [ ] Historical counter data
- [ ] Counter analytics
- [ ] Multiple counter management
- [ ] Transaction history

### Backend
- [ ] REST API for counter operations
- [ ] WebSocket for real-time updates
- [ ] Caching layer
- [ ] Analytics service

### Infrastructure
- [ ] CI/CD pipeline
- [ ] Automated testing
- [ ] Monitoring and alerting
- [ ] Production deployment

## Resources

- **Anchor Framework**: https://anchor-lang.com/
- **Solana Documentation**: https://docs.solana.com/
- **Solana Cookbook**: https://solanacookbook.com/
- **Next.js Documentation**: https://nextjs.org/docs
