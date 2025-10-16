# Solana Counter Frontend

A modern, responsive Next.js application with TypeScript and Tailwind CSS that integrates with Solana wallets (Phantom/Solflare) to interact with an on-chain counter program.

## Features

- 🔐 **Wallet Integration**: Connect with Phantom or Solflare wallets
- 📊 **Counter Dashboard**: View and interact with the on-chain counter
- ⚡ **Real-time Updates**: Live counter value and wallet status
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Fully responsive across all devices
- 🌙 **Dark Mode**: Beautiful dark-themed interface

## Project Structure

```
frontend/
├── src/
│   ├── app/                           # Next.js app directory
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout with providers
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── counter-dashboard.tsx     # Main counter interface
│   │   ├── providers/
│   │   │   └── wallet-provider.tsx   # Wallet adapter setup
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   └── wallet/                   # Wallet components
│   │       ├── wallet-button.tsx
│   │       └── wallet-status.tsx
│   ├── hooks/
│   │   └── use-counter.ts            # Counter logic hook
│   └── lib/
│       └── api.ts                    # API utilities
├── .env.example                       # Environment template
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies & scripts
├── tailwind.config.js                 # Tailwind CSS config
└── tsconfig.json                      # TypeScript configuration
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

**Note**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Solana wallet extension (Phantom or Solflare)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Dependencies

- **Next.js** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **@solana/wallet-adapter-react** - Solana wallet integration
- **@solana/web3.js** - Solana Web3 library

## Component Overview

### Counter Dashboard

The main interface component that displays:
- Current counter value
- Increment/Decrement buttons
- Transaction status and loading states
- Error handling

### Wallet Provider

Configures Solana wallet adapters:
- Connection to Solana RPC
- Phantom and Solflare wallet support
- Auto-connect functionality

### UI Components

Reusable components:
- **Button**: Styled buttons with variants and loading states
- **Card**: Container component with consistent styling
- **Alert**: Notification component for success/error messages

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button in the header
2. **Select Wallet**: Choose Phantom or Solflare from the modal
3. **Approve Connection**: Authorize the connection in your wallet
4. **Interact with Counter**: Use the increment/decrement buttons
5. **Approve Transactions**: Confirm each transaction in your wallet

## Development Tips

### Hot Reload

Next.js provides automatic hot reloading. Changes to components will reflect immediately without page refresh.

### TypeScript

The project uses strict TypeScript. Ensure all components and functions are properly typed:

```tsx
interface CounterProps {
  initialValue: number;
  onUpdate?: (value: number) => void;
}

export function Counter({ initialValue, onUpdate }: CounterProps) {
  // Component implementation
}
```

### Styling with Tailwind

Use Tailwind's utility classes for styling:

```tsx
<div className="flex items-center gap-4 rounded-lg bg-slate-800 p-4">
  <button className="rounded-md bg-primary-600 px-4 py-2 hover:bg-primary-700">
    Click me
  </button>
</div>
```

### Custom Hooks

Extract reusable logic into custom hooks:

```tsx
export function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
}
```

## API Integration

The app expects a backend API running at `NEXT_PUBLIC_API_BASE_URL`. The API should provide:

```typescript
GET  /api/counter        // Get current counter value
POST /api/counter/increment
POST /api/counter/decrement
```

## Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start

# Or export static site
npm run build && npm run export
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: .next
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Troubleshooting

### Wallet Won't Connect

- Ensure wallet extension is installed and unlocked
- Check that you're on the correct network (devnet/mainnet)
- Clear browser cache and try again
- Check browser console for errors

### RPC Errors

- Verify `NEXT_PUBLIC_SOLANA_RPC_URL` is correct
- Try switching to a different RPC endpoint
- Check network status and rate limits

### Transaction Fails

- Ensure wallet has sufficient SOL for transaction fees
- Check that the program is deployed and accessible
- Verify the program ID is correct

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Contributing

See the main [CONTRIBUTING.md](../CONTRIBUTING.md) file for guidelines.

## License

See the [LICENSE](../LICENSE) file for details.
