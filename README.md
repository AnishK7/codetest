# Solana Counter Frontend

A modern, responsive Next.js application with TypeScript and Tailwind CSS that integrates with Solana wallets (Phantom/Solflare) to interact with an on-chain counter program.

## Features

- 🔐 **Wallet Integration**: Connect with Phantom or Solflare wallets
- 📊 **Counter Dashboard**: View and interact with the on-chain counter
- ⚡ **Real-time Updates**: Live counter value and wallet status
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🌓 **Dark Mode**: Optimized for dark theme viewing
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet Adapter**: @solana/wallet-adapter-react

## Prerequisites

- Node.js 18+ and npm/yarn
- A Solana wallet (Phantom or Solflare browser extension)
- Backend API running (default: http://localhost:8080)

## Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment variables:

```bash
cp .env.example .env.local
```

3. Configure your environment variables in `.env.local`:

```
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── counter-dashboard.tsx   # Main counter interface
│   ├── providers/
│   │   └── wallet-provider.tsx # Solana wallet provider setup
│   ├── ui/
│   │   ├── alert.tsx       # Alert component
│   │   ├── button.tsx      # Button component
│   │   └── card.tsx        # Card component
│   └── wallet/
│       ├── wallet-button.tsx   # Wallet connection button
│       └── wallet-status.tsx   # Wallet status display
├── hooks/
│   └── use-counter.ts      # Counter state management hook
└── lib/
    └── api.ts              # API client for backend calls
```

## Features & Components

### Wallet Integration
- Connect/disconnect wallet functionality
- Display wallet address and connection status
- Support for Phantom and Solflare wallets

### Counter Dashboard
- View current counter value
- Initialize new counter
- Increment counter
- Real-time updates
- Error handling with user-friendly messages

### UI Components
- **Button**: Customizable button with variants and loading states
- **Card**: Flexible card component for content organization
- **Alert**: Toast-style notifications for errors and success messages

## API Endpoints

The frontend expects the following API endpoints:

- `GET /api/counter` - Fetch current counter value
- `POST /api/counter/initialize` - Initialize a new counter
- `POST /api/counter/increment` - Increment the counter

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
