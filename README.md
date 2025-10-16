# Solana Counter Service

A TypeScript backend service for interacting with a Solana counter program. This service provides REST endpoints for initializing and incrementing counters on the Solana blockchain using Anchor framework.

## Features

- 🚀 TypeScript with strict type checking
- 📡 Solana Web3.js and Anchor integration
- 🔒 Comprehensive error handling
- ✅ Request/response validation with Zod
- 🧪 Jest testing setup with integration test stubs
- 🔧 ESLint and Prettier for code quality
- 🔄 Hot reload with Nodemon
- 🛡️ Security headers with Helmet
- 📝 Structured logging with Morgan

## Prerequisites

- Node.js (v18 or higher recommended)
- A Solana wallet keypair
- Access to a Solana cluster (devnet, testnet, or mainnet)
- A deployed Solana counter program

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd solana-counter-service
```

2. Install dependencies:
```bash
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development          # development, test, or production
PORT=3000                     # Server port

# Solana Configuration
SOLANA_CLUSTER_URL=https://api.devnet.solana.com  # Solana RPC endpoint
COMMITMENT=confirmed          # Transaction commitment level: processed, confirmed, or finalized

# Program Configuration
COUNTER_PROGRAM_ID=YourProgramIDHere123456789    # Your deployed counter program ID
COUNTER_IDL_PATH=./src/idl/counter.json          # Optional: Path to your program IDL

# Wallet Configuration (choose ONE method)
# Method 1: Path to keypair file
WALLET_KEYPAIR_PATH=./wallet-keypair.json

# Method 2: Inline keypair (JSON array format)
# WALLET_KEYPAIR=[123,45,67,89,...]

# Method 3: Base58 encoded keypair
# WALLET_KEYPAIR=base58EncodedSecretKey

# Method 4: Base64 encoded keypair
# WALLET_KEYPAIR=base64EncodedSecretKey
```

### Required Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Application environment | `development` | No |
| `PORT` | Server port number | `3000` | No |
| `SOLANA_CLUSTER_URL` | Solana RPC endpoint URL | `https://api.devnet.solana.com` | No |
| `COMMITMENT` | Transaction commitment level | `confirmed` | No |
| `COUNTER_PROGRAM_ID` | Deployed counter program ID | From IDL metadata | No* |
| `WALLET_KEYPAIR_PATH` or `WALLET_KEYPAIR` | Wallet credentials | - | **Yes** |
| `COUNTER_IDL_PATH` | Path to program IDL file | `./src/idl/counter.json` | No |

\* `COUNTER_PROGRAM_ID` is required if not specified in the IDL file's metadata.

### Wallet Keypair Management

The service supports multiple formats for providing wallet credentials:

#### 1. Keypair File (Recommended for Development)

Create a Solana keypair file:
```bash
solana-keygen new --outfile ./wallet-keypair.json
```

Set the environment variable:
```env
WALLET_KEYPAIR_PATH=./wallet-keypair.json
```

#### 2. JSON Array Format

```env
WALLET_KEYPAIR=[123,45,67,89,...]
```

#### 3. Base58 Format

```env
WALLET_KEYPAIR=base58EncodedSecretKey
```

#### 4. Base64 Format

```env
WALLET_KEYPAIR=base64EncodedSecretKey
```

⚠️ **Security Warning**: Never commit wallet keypairs to version control. Always use environment variables or secure key management systems in production.

### IDL Configuration

The service requires an Anchor IDL file for the counter program. You can:

1. Use the default location: `./src/idl/counter.json`
2. Specify a custom path with `COUNTER_IDL_PATH`
3. Include the program ID in the IDL metadata:

```json
{
  "version": "0.1.0",
  "name": "counter",
  "instructions": [...],
  "accounts": [...],
  "metadata": {
    "address": "YourProgramIDHere123456789"
  }
}
```

## Running the Server

### Development Mode (with hot reload)

```bash
npm run dev
```

### Production Mode

```bash
# Build the project
npm run build

# Start the server
npm start
```

## Development Commands

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format

# Type checking
npm run typecheck

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

### Health Check

**GET** `/health`

Check the service health and configuration.

**Response:**
```json
{
  "status": "ok",
  "solanaCluster": "https://api.devnet.solana.com",
  "programId": "YourProgramIDHere123456789"
}
```

### Initialize Counter

**POST** `/api/counter/initialize`

Initialize a new counter account using a Program Derived Address (PDA).

**Request Body:**
```json
{
  "seed": "counter"  // Optional, defaults to "counter"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "counterAddress": "CounterPDA123456789...",
  "seed": "counter",
  "signature": "TransactionSignature123..."
}
```

### Increment Counter

**POST** `/api/counter/increment`

Increment an existing counter.

**Request Body:**
```json
{
  "counterAddress": "CounterPDA123456789..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "counterAddress": "CounterPDA123456789...",
  "newCount": "5",
  "signature": "TransactionSignature456..."
}
```

### Get Counter

**GET** `/api/counter/:counterAddress`

Retrieve the current state of a counter.

**Response (200 OK):**
```json
{
  "success": true,
  "counterAddress": "CounterPDA123456789...",
  "authority": "WalletPublicKey123...",
  "count": "42"
}
```

## Error Handling

The service provides structured error responses:

```json
{
  "error": {
    "message": "Error description",
    "details": [
      {
        "field": "counterAddress",
        "message": "Required"
      }
    ]
  }
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Resource created
- `400` - Bad request / Validation error
- `404` - Resource not found
- `500` - Server error

## Testing

The service includes comprehensive test suites:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Test Structure

- `tests/api.test.ts` - API endpoint integration tests
- `tests/counter.test.ts` - SolanaService unit tests

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── env.ts              # Environment configuration
│   ├── errors/
│   │   ├── AppError.ts         # Base error classes
│   │   └── SolanaError.ts      # Solana-specific errors
│   ├── idl/
│   │   └── counter.json        # Counter program IDL
│   ├── middleware/
│   │   ├── errorHandler.ts     # Global error handler
│   │   └── validateRequest.ts  # Request validation middleware
│   ├── routes/
│   │   ├── counter.ts          # Counter endpoints
│   │   └── health.ts           # Health check endpoint
│   ├── services/
│   │   └── solana.ts           # Solana/Anchor service
│   ├── types/
│   │   └── api.ts              # API type definitions
│   ├── utils/
│   │   └── keypair.ts          # Keypair parsing utilities
│   ├── app.ts                  # Express app setup
│   └── index.ts                # Application entry point
├── tests/
│   ├── api.test.ts             # API tests
│   └── counter.test.ts         # Service tests
├── .env                        # Environment variables (create this)
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── jest.config.js              # Jest configuration
├── nodemon.json                # Nodemon configuration
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Running Against Devnet

1. Ensure you have SOL in your wallet for transaction fees:
```bash
solana airdrop 2 --url devnet
```

2. Deploy your counter program to devnet (if not already deployed):
```bash
anchor build
anchor deploy --provider.cluster devnet
```

3. Update your `.env` file with the deployed program ID

4. Start the service:
```bash
npm run dev
```

5. Test the endpoints:
```bash
# Initialize a counter
curl -X POST http://localhost:3000/api/counter/initialize \
  -H "Content-Type: application/json" \
  -d '{"seed": "my-counter"}'

# Increment the counter
curl -X POST http://localhost:3000/api/counter/increment \
  -H "Content-Type: application/json" \
  -d '{"counterAddress": "YourCounterAddress"}'

# Get counter data
curl http://localhost:3000/api/counter/YourCounterAddress
```

## Production Deployment

### Environment Setup

1. Use production-grade RPC endpoints (not public devnet URLs)
2. Store wallet keypairs in secure key management systems (e.g., AWS Secrets Manager, HashiCorp Vault)
3. Set `NODE_ENV=production`
4. Configure proper logging and monitoring
5. Use HTTPS and proper CORS settings

### Security Considerations

- Never expose wallet private keys in logs or error messages
- Implement rate limiting for API endpoints
- Use authentication/authorization for production APIs
- Monitor transaction failures and account for retry logic
- Implement proper key rotation policies

## Troubleshooting

### Common Issues

1. **"Wallet configuration missing"**
   - Ensure `WALLET_KEYPAIR_PATH` or `WALLET_KEYPAIR` is set
   - Verify the keypair file exists and is readable

2. **"COUNTER_PROGRAM_ID is not set"**
   - Set `COUNTER_PROGRAM_ID` in `.env` or include it in the IDL metadata

3. **"Account does not exist"**
   - Verify the counter address is correct
   - Ensure the counter was properly initialized

4. **Transaction failures**
   - Check you have sufficient SOL for transaction fees
   - Verify the program is deployed to the correct cluster
   - Ensure the wallet has proper authority

## Contributing

1. Follow the existing code style (enforced by ESLint and Prettier)
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting PRs

## License

MIT
