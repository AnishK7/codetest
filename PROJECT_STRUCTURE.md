# Project Structure

This document describes the organization and structure of the Solana Full-Stack dApp project.

## Directory Overview

```
solana-dapp/
├── program/                 # Solana on-chain program
│   ├── src/
│   │   ├── lib.rs          # Main program entry point
│   │   ├── instructions/   # Instruction handlers
│   │   ├── state/          # Account state definitions
│   │   └── errors.rs       # Error definitions
│   ├── tests/              # Program integration tests
│   ├── Cargo.toml          # Rust dependencies
│   └── Anchor.toml         # Anchor configuration (if using Anchor)
│
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── index.js        # Server entry point
│   │   ├── routes/         # API route handlers
│   │   ├── controllers/    # Business logic controllers
│   │   ├── services/       # Service layer (Solana, DB, etc.)
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   ├── tests/              # Backend tests
│   ├── package.json        # Node.js dependencies
│   ├── .env.example        # Environment template
│   └── README.md           # Backend-specific documentation
│
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── index.js        # App entry point
│   │   ├── App.js          # Root component
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── contexts/       # React contexts (wallet, etc.)
│   │   ├── services/       # API client services
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS/styling files
│   ├── public/             # Static assets
│   ├── tests/              # Frontend tests
│   ├── package.json        # Node.js dependencies
│   ├── .env.example        # Environment template
│   └── README.md           # Frontend-specific documentation
│
├── scripts/                 # Automation scripts
│   ├── setup.sh            # Project setup
│   ├── build-all.sh        # Build all components
│   ├── test-all.sh         # Run all tests
│   ├── deploy.sh           # Deployment script
│   └── dev.sh              # Start dev environment
│
├── .git/                    # Git repository data
├── .gitignore               # Git ignore rules
├── Makefile                 # Build automation
├── README.md                # Main project documentation
├── DEVELOPMENT.md           # Developer guide
├── CONTRIBUTING.md          # Contribution guidelines
├── PROJECT_STRUCTURE.md     # This file
└── LICENSE                  # Project license
```

## Component Details

### Program (`/program`)

The on-chain Solana program written in Rust.

**Key Files:**
- `lib.rs`: Program entry point and instruction routing
- `instructions/`: Individual instruction handler implementations
- `state/`: Account structures and state management
- `errors.rs`: Custom error definitions

**Build Output:**
- `target/deploy/`: Compiled `.so` files for deployment
- `target/idl/`: Interface Definition Language files (Anchor)

**Conventions:**
- Use snake_case for function and variable names
- Use PascalCase for struct and enum names
- Prefix instruction contexts with the instruction name

### Backend (`/backend`)

Node.js API server for off-chain processing.

**Key Directories:**

**`src/routes/`**: HTTP route definitions
```javascript
// Example: routes/user.js
router.get('/users/:id', userController.getUser);
```

**`src/controllers/`**: Request handling logic
```javascript
// Example: controllers/userController.js
exports.getUser = async (req, res) => { /* ... */ };
```

**`src/services/`**: Business logic and external integrations
```javascript
// Example: services/solanaService.js
class SolanaService {
  async getAccountInfo(publicKey) { /* ... */ }
}
```

**`src/middleware/`**: Express middleware
```javascript
// Example: middleware/auth.js
function authenticateToken(req, res, next) { /* ... */ }
```

**Conventions:**
- Use camelCase for variables and functions
- Use PascalCase for classes
- Export modules using `module.exports` or ES6 `export`

### Frontend (`/frontend`)

React-based web interface.

**Key Directories:**

**`src/components/`**: Reusable UI components
```
components/
├── common/          # Shared components (Button, Input, etc.)
├── wallet/          # Wallet-related components
└── transaction/     # Transaction components
```

**`src/pages/`**: Full page components
```javascript
// Example: pages/Dashboard.js
function Dashboard() {
  return <div>Dashboard content</div>;
}
```

**`src/hooks/`**: Custom React hooks
```javascript
// Example: hooks/useWallet.js
function useWallet() {
  const [connected, setConnected] = useState(false);
  // ...
  return { connected, connect, disconnect };
}
```

**`src/contexts/`**: React context providers
```javascript
// Example: contexts/WalletContext.js
export const WalletContext = createContext();
```

**`src/services/`**: API clients and external services
```javascript
// Example: services/api.js
export const api = {
  fetchUser: (id) => axios.get(`/api/users/${id}`)
};
```

**Conventions:**
- Use PascalCase for component files and names
- Use camelCase for utilities and hooks
- Prefix custom hooks with `use`
- Keep components small and focused

### Scripts (`/scripts`)

Automation scripts for common tasks.

**`setup.sh`**: Initial project setup
- Creates environment files from templates
- Installs dependencies
- Validates prerequisites

**`build-all.sh`**: Builds all components
- Compiles Solana program
- Builds backend (if applicable)
- Builds frontend production bundle

**`test-all.sh`**: Runs entire test suite
- Program tests (Rust/Anchor)
- Backend tests (Jest/Mocha)
- Frontend tests (React Testing Library)

**`deploy.sh`**: Deployment automation
- Configures network
- Deploys program
- Updates configuration

**`dev.sh`**: Development environment
- Starts local validator
- Deploys program locally
- Starts backend dev server
- Starts frontend dev server

## File Naming Conventions

### Program (Rust)
- Files: `snake_case.rs`
- Modules: `snake_case`
- Structs: `PascalCase`
- Functions: `snake_case`

### Backend (JavaScript/TypeScript)
- Files: `camelCase.js` or `kebab-case.js`
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

### Frontend (React)
- Components: `PascalCase.js` or `PascalCase.jsx`
- Utilities: `camelCase.js`
- Styles: `ComponentName.css` or `component-name.module.css`

## Configuration Files

### Environment Files

**`.env.example`**: Template with all required variables
```env
# Comments explaining each variable
VARIABLE_NAME=default_value
```

**`.env`**: Actual configuration (not committed to git)
```env
PORT=3001
SOLANA_NETWORK=devnet
```

### Package Files

**`package.json`**: Node.js project configuration
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  }
}
```

**`Cargo.toml`**: Rust project configuration
```toml
[package]
name = "program-name"
version = "0.1.0"

[dependencies]
anchor-lang = "0.29.0"
```

## Build Artifacts

### Program
- `target/deploy/*.so`: Deployable program binary
- `target/idl/*.json`: Interface Definition Language

### Backend
- `dist/`: Compiled JavaScript (if using TypeScript)
- `build/`: Build output directory

### Frontend
- `build/`: Production build output
- `dist/`: Distribution files

**Note**: All build artifacts are gitignored.

## Testing Structure

### Program Tests
```
program/tests/
├── integration/
│   ├── test_initialize.rs
│   └── test_transfer.rs
└── utils.rs
```

### Backend Tests
```
backend/tests/
├── unit/
│   ├── services/
│   └── utils/
└── integration/
    └── api/
```

### Frontend Tests
```
frontend/src/
├── components/
│   └── Button.test.js
├── hooks/
│   └── useWallet.test.js
└── pages/
    └── Dashboard.test.js
```

## Documentation Files

- **README.md**: Main project documentation, setup instructions
- **DEVELOPMENT.md**: Developer guide, technical details
- **CONTRIBUTING.md**: Contribution guidelines
- **PROJECT_STRUCTURE.md**: This file, project organization
- **LICENSE**: Project license information

## Adding New Features

When adding a new feature, follow this structure:

1. **Program**: Add instruction in `program/src/instructions/`
2. **Backend**: Create service in `backend/src/services/`
3. **Frontend**: Add components in `frontend/src/components/`
4. **Tests**: Add tests for each layer
5. **Docs**: Update relevant documentation

## Best Practices

### Module Organization
- Keep related files together
- Use index files for clean imports
- Separate concerns (UI, logic, data)
- Avoid circular dependencies

### Import Order
```javascript
// 1. External dependencies
import React from 'react';
import { Connection } from '@solana/web3.js';

// 2. Internal modules
import { api } from './services/api';
import { formatAmount } from './utils/formatting';

// 3. Components
import Button from './components/Button';

// 4. Styles
import './App.css';
```

### Code Organization
- One component per file
- Group related functionality
- Keep files under 300 lines
- Extract reusable logic

## Questions?

For more information:
- See [README.md](README.md) for setup instructions
- See [DEVELOPMENT.md](DEVELOPMENT.md) for development guide
- See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
