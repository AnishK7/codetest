# Frontend Application

React-based frontend for the Solana dApp.

## Structure

```
frontend/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── favicon.ico        # App favicon
├── src/
│   ├── index.tsx          # App entry point
│   ├── App.tsx            # Root component
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts (wallet, etc.)
│   ├── hooks/             # Custom hooks
│   ├── services/          # API client & utilities
│   ├── utils/             # Helper functions
│   ├── types/             # TypeScript type definitions
│   └── styles/            # CSS/styling
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript configuration
├── .env.example           # Environment variable template
└── README.md              # This file
```

## Scripts

Common npm scripts (define in `package.json`):

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint 'src/**/*.{ts,tsx}'",
    "format": "prettier --write 'src/**/*.{ts,tsx}'",
    "type-check": "tsc --noEmit"
  }
}
```

## Environment Variables

Configured via `.env` (copy from `.env.example`):

```env
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_SOLANA_NETWORK=devnet
REACT_APP_SOLANA_RPC_URL=https://api.devnet.solana.com
REACT_APP_PROGRAM_ID=ReplaceWithDeployedProgramId
REACT_APP_NAME=Solana dApp
REACT_APP_VERSION=1.0.0
REACT_APP_ENABLE_ANALYTICS=false
```

**Note**: Only variables prefixed with `REACT_APP_` are exposed to the client.

## Development Workflow

```bash
# Install dependencies
npm install

# Run development server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
```

## Key Dependencies

### Solana Wallet Adapter

Integrate wallet connectivity:

```bash
npm install @solana/wallet-adapter-react \
            @solana/wallet-adapter-react-ui \
            @solana/wallet-adapter-wallets \
            @solana/web3.js
```

Example setup:
```tsx
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Your app content */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
```

## Project Conventions

### Component Structure

```tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

### Custom Hooks

```tsx
import { useState, useEffect } from 'react';

export function useBalance(publicKey: string | null) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    // Fetch balance logic
    fetchBalance(publicKey).then(setBalance);
  }, [publicKey]);

  return balance;
}
```

### Context Usage

```tsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

## Wallet Integration

### Connect Wallet

```tsx
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function ConnectWallet() {
  return <WalletMultiButton />;
}
```

### Send Transaction

```tsx
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function SendTransaction() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSend = async () => {
    if (!publicKey) return;

    const transaction = /* build transaction */;
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature);
  };

  return <button onClick={handleSend}>Send</button>;
}
```

## Styling

### CSS Modules
```tsx
import styles from './MyComponent.module.css';

function MyComponent() {
  return <div className={styles.container}>Content</div>;
}
```

### Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### Styled Components
```bash
npm install styled-components
```

## Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

test('renders component', () => {
  render(<MyComponent title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Hook Testing
```tsx
import { renderHook } from '@testing-library/react-hooks';
import { useBalance } from './useBalance';

test('fetches balance', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useBalance('public-key')
  );
  await waitForNextUpdate();
  expect(result.current).toBeGreaterThan(0);
});
```

## Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npx serve -s build
```

## Deployment

Common deployment platforms:
- **Vercel**: Zero-config deployment for React apps
- **Netlify**: Continuous deployment with Git integration
- **AWS S3 + CloudFront**: Static hosting with CDN
- **GitHub Pages**: Free hosting for public repos

## Resources

- [React Documentation](https://react.dev/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [TypeScript + React](https://react-typescript-cheatsheet.netlify.app/)
