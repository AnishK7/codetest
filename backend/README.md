# Backend API

Node.js backend service supporting the Solana dApp.

## Structure

```
backend/
├── src/
│   ├── index.ts            # Application entry point
│   ├── routes/             # HTTP route definitions
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic & Solana integrations
│   ├── middleware/         # Express middleware
│   ├── jobs/               # Background jobs (optional)
│   ├── utils/              # Utility functions
│   └── config/             # Configuration helpers
├── tests/                  # Unit and integration tests
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration (if using TS)
├── .env.example            # Environment variable template
└── README.md               # This file
```

## Scripts

Common npm scripts (define in `package.json`):

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc -p .",
    "start": "node dist/index.js",
    "test": "jest",
    "lint": "eslint 'src/**/*.ts'",
    "format": "prettier --write 'src/**/*.ts'",
    "type-check": "tsc --noEmit"
  }
}
```

## Environment Variables

Configured via `.env` (copy from `.env.example`):

```env
PORT=3001
NODE_ENV=development
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROGRAM_ID=ReplaceWithDeployedProgramId
DATABASE_URL=postgresql://user:password@localhost:5432/solana_app
REDIS_URL=redis://localhost:6379
SESSION_SECRET=replace-me
ALLOWED_ORIGINS=http://localhost:3000
LOG_LEVEL=info
```

## Development Workflow

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build

# Start production build
npm run start
```

## Project Conventions

### File Naming
- Controllers: `*.controller.ts`
- Services: `*.service.ts`
- Routes: `*.route.ts`
- Middleware: `*.middleware.ts`

### Code Style
- Use TypeScript for type safety
- Use `async/await`
- Handle errors with `try/catch`
- Validate all incoming data
- Use express middleware for reusable logic
- Log key events and errors

### Error Handling

Example error handler middleware:
```typescript
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
```

### Logging

Use a structured logger (e.g. pino or winston):
```typescript
import pino from 'pino';

export const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
```

## Solana Integration

Example service structure:
```typescript
import { Connection, PublicKey } from '@solana/web3.js';

class SolanaService {
  private connection: Connection;

  constructor(endpoint: string) {
    this.connection = new Connection(endpoint, 'confirmed');
  }

  async getBalance(publicKey: string) {
    const key = new PublicKey(publicKey);
    return this.connection.getBalance(key);
  }
}
```

## Testing

- Unit tests for controllers/services using Jest
- Integration tests using Supertest (API endpoints)
- Mock Solana connections in tests

Example test:
```typescript
describe('GET /health', () => {
  it('returns service status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
```

## Deployment

- Use environment variables for configuration
- Consider Dockerizing the backend
- Use PM2 or similar for process management
- Ensure SSL termination via reverse proxy

## Resources

- [Express Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
