import { createApp } from './app';
import { getConfig } from './config/env';
import { SolanaService } from './services/solana';

const main = async (): Promise<void> => {
  try {
    const config = getConfig();
    const solanaService = new SolanaService();

    const app = createApp(solanaService);

    const server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
      console.log(`📡 Solana Cluster: ${config.solanaClusterUrl}`);
      console.log(`📋 Program ID: ${config.programId}`);
      console.log(`🔑 Wallet: ${solanaService.getWalletPublicKey().toBase58()}`);
      console.log(`\nAvailable endpoints:`);
      console.log(`  GET  /health`);
      console.log(`  POST /api/counter/initialize`);
      console.log(`  POST /api/counter/increment`);
      console.log(`  GET  /api/counter/:counterAddress`);
    });

    const gracefulShutdown = (signal: string) => {
      console.log(`\n${signal} received, shutting down gracefully...`);
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

main();
