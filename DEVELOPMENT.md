# Development Guide

This document provides detailed information for developers working on this Solana dApp project.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Development Environment](#development-environment)
- [Coding Standards](#coding-standards)
- [Testing Strategy](#testing-strategy)
- [Debugging](#debugging)
- [Performance Optimization](#performance-optimization)
- [Security Best Practices](#security-best-practices)

## Getting Started

### First-Time Setup

1. Clone the repository and navigate to the project directory
2. Run the setup script: `make setup` or `./scripts/setup.sh`
3. Configure environment files (`.env`) for backend and frontend
4. Install all dependencies: `make install`
5. Start the development environment: `make dev`

### Daily Development Workflow

```bash
# Pull latest changes
git pull origin main

# Start development servers
make dev

# In separate terminals, watch for changes
cd backend && npm run dev
cd frontend && npm start

# Run tests as you develop
make test
```

## Project Architecture

### Component Overview

```
┌─────────────────┐
│    Frontend     │  React app with wallet integration
│   (Port 3000)   │
└────────┬────────┘
         │
         │ HTTP/WebSocket
         ▼
┌─────────────────┐
│     Backend     │  Node.js API server
│   (Port 3001)   │  - Transaction building
└────────┬────────┘  - Data indexing
         │           - Caching
         │
         │ Solana SDK
         ▼
┌─────────────────┐
│  Solana Program │  On-chain logic
│    (Devnet)     │  - State management
└─────────────────┘  - Business rules
```

### Tech Stack

**Program (On-Chain)**
- Language: Rust
- Framework: Anchor (or native Solana)
- Testing: Rust unit tests, Anchor test framework

**Backend (Off-Chain)**
- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL (optional)
- Cache: Redis (optional)
- Testing: Jest/Mocha

**Frontend (Client)**
- Framework: React
- Wallet: @solana/wallet-adapter
- UI Library: (to be determined)
- Testing: Jest + React Testing Library

### Data Flow

1. **User Action**: User interacts with the frontend UI
2. **Wallet Approval**: Transaction is prepared and sent to wallet for signing
3. **Backend Processing**: (Optional) Backend validates or indexes transaction
4. **On-Chain Execution**: Signed transaction is sent to Solana network
5. **State Update**: Program updates on-chain state
6. **UI Refresh**: Frontend polls or listens for confirmation and updates UI

## Development Environment

### Environment Variables

#### Backend `.env`

```env
# Server
PORT=3001
NODE_ENV=development

# Solana
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=YourProgramIdHere

# Database (optional)
DATABASE_URL=postgresql://localhost/solana_app

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Security
SESSION_SECRET=generate-a-secure-secret
ALLOWED_ORIGINS=http://localhost:3000
```

#### Frontend `.env`

```env
# API
REACT_APP_BACKEND_URL=http://localhost:3001

# Solana
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_SOLANA_RPC_URL=https://api.devnet.solana.com
REACT_APP_PROGRAM_ID=YourProgramIdHere
```

### Local Solana Validator

For faster development, use a local validator:

```bash
# Start local validator
solana-test-validator --reset

# Configure CLI to use local validator
solana config set --url localhost

# Check validator is running
solana cluster-version
```

### Hot Reloading

All components support hot reloading in development:

- **Program**: Rebuild with `anchor build` and redeploy
- **Backend**: Uses `nodemon` or similar for auto-restart
- **Frontend**: React dev server auto-reloads on changes

## Coding Standards

### Rust (Program)

- Follow standard Rust formatting: `cargo fmt`
- Run clippy for lints: `cargo clippy`
- Document public functions with `///` doc comments
- Use `#[error_code]` enum for program errors
- Keep instruction handlers small and focused

Example:
```rust
/// Initializes a new account with the given parameters
pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
    let account = &mut ctx.accounts.account;
    account.data = data;
    Ok(())
}
```

### JavaScript/TypeScript (Backend & Frontend)

- Use ESLint and Prettier for formatting
- Prefer `const` over `let`, avoid `var`
- Use async/await over raw Promises
- Add JSDoc comments for complex functions
- Use TypeScript for type safety (if applicable)

Example:
```javascript
/**
 * Fetches account data from the Solana program
 * @param {PublicKey} accountPubkey - The account to fetch
 * @returns {Promise<AccountData>} The decoded account data
 */
async function fetchAccountData(accountPubkey) {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  return decodeAccountData(accountInfo.data);
}
```

### Git Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add user profile endpoint

- Implement GET /api/user/:id
- Add validation for user ID
- Include tests for new endpoint
```

## Testing Strategy

### Program Tests

```bash
# Run Anchor tests
cd program
anchor test

# Run with logs
anchor test -- --show-logs

# Run specific test
anchor test -- --test test_name
```

Test structure:
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_initialization() {
        // Setup
        // Execute
        // Assert
    }
}
```

### Backend Tests

```bash
# Run all tests
cd backend
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- user.test.js

# Watch mode
npm test -- --watch
```

### Frontend Tests

```bash
# Run all tests
cd frontend
npm test

# Run with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u
```

### Integration Testing

For full-stack integration tests:

1. Start local validator
2. Deploy program
3. Start backend with test database
4. Run end-to-end tests

```bash
# Automated with script
./scripts/integration-test.sh
```

## Debugging

### Program Debugging

1. **Add Logs**:
```rust
msg!("Debug value: {}", my_value);
```

2. **View Logs**:
```bash
solana logs --url devnet
```

3. **Use Anchor Test Framework**:
```typescript
try {
  await program.methods.myInstruction().rpc();
} catch (err) {
  console.error("Error:", err);
}
```

### Backend Debugging

1. **Use debugger**:
```javascript
// Add breakpoint
debugger;

// Or console.log
console.log("Debug:", variableName);
```

2. **VS Code Launch Config** (`.vscode/launch.json`):
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "program": "${workspaceFolder}/backend/src/index.js"
}
```

3. **Check Logs**:
```bash
tail -f backend/logs/app.log
```

### Frontend Debugging

1. **Browser DevTools**: Use React DevTools extension
2. **Console Logging**: `console.log()` in components
3. **Network Tab**: Monitor API calls
4. **Wallet Console**: Check wallet adapter logs

## Performance Optimization

### Program Optimization

- Minimize account size
- Use zero-copy deserialization where possible
- Batch instructions when feasible
- Close unused accounts to reclaim rent

### Backend Optimization

- Implement caching (Redis)
- Use connection pooling for database
- Index frequently queried fields
- Implement pagination for large datasets
- Use WebSockets for real-time updates

### Frontend Optimization

- Lazy load components
- Memoize expensive computations
- Optimize re-renders with `React.memo`
- Use virtual scrolling for long lists
- Implement request debouncing

## Security Best Practices

### Program Security

- Validate all input parameters
- Check signer authorities
- Verify account ownership
- Use PDA (Program Derived Addresses) correctly
- Implement access control
- Audit for arithmetic overflow/underflow

### Backend Security

- Validate all inputs
- Use parameterized queries (SQL injection prevention)
- Implement rate limiting
- Use HTTPS in production
- Store secrets in environment variables
- Implement CORS properly

### Frontend Security

- Never expose private keys
- Validate all user input
- Use wallet adapters correctly
- Display transaction details before signing
- Implement CSRF protection
- Keep dependencies updated

## Useful Commands

### Solana CLI

```bash
# Check balance
solana balance

# Airdrop SOL (devnet)
solana airdrop 2

# View program logs
solana logs <PROGRAM_ID>

# Get account info
solana account <ACCOUNT_ADDRESS>

# View transaction
solana confirm <SIGNATURE>
```

### Anchor CLI

```bash
# Initialize new program
anchor init my_program

# Build program
anchor build

# Test program
anchor test

# Deploy program
anchor deploy

# Upgrade program
anchor upgrade <PROGRAM_ID> target/deploy/program.so
```

### Makefile Shortcuts

```bash
# Full setup
make setup

# Build everything
make build

# Test everything
make test

# Start dev environment
make dev

# Deploy to devnet
make deploy-devnet
```

## Additional Resources

- [Solana Cookbook](https://solanacookbook.com/)
- [Anchor Book](https://book.anchor-lang.com/)
- [Solana Program Library](https://spl.solana.com/)
- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Getting Help

- Check documentation first
- Search existing issues
- Ask in Solana Discord
- Create a detailed GitHub issue

---

Happy coding! 🚀
