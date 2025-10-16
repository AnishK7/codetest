import { SolanaService } from '../src/services/solana';
import { Keypair, PublicKey } from '@solana/web3.js';

jest.mock('../src/config/env', () => ({
  getConfig: jest.fn(() => ({
    nodeEnv: 'test',
    port: 3000,
    solanaClusterUrl: 'https://api.devnet.solana.com',
    commitment: 'confirmed',
    programId: 'CounterProgram111111111111111111111111111',
    walletSecretKey: Keypair.generate().secretKey,
    counterIdlPath: undefined,
  })),
}));

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn((filePath: string) => {
    if (filePath.includes('counter.json')) {
      return JSON.stringify({
        version: '0.1.0',
        name: 'counter',
        instructions: [],
        accounts: [],
        metadata: { address: 'CounterProgram111111111111111111111111111' },
      });
    }
    throw new Error('File not found');
  }),
}));

describe('SolanaService', () => {
  let solanaService: SolanaService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Integration Tests Stubs', () => {
    it('should have initializeCounter method', () => {
      expect(typeof SolanaService.prototype.initializeCounter).toBe('function');
    });

    it('should have incrementCounter method', () => {
      expect(typeof SolanaService.prototype.incrementCounter).toBe('function');
    });

    it('should have getCounterData method', () => {
      expect(typeof SolanaService.prototype.getCounterData).toBe('function');
    });

    it('should have getClusterInfo method', () => {
      expect(typeof SolanaService.prototype.getClusterInfo).toBe('function');
    });
  });

  describe('Service initialization', () => {
    it('should create a SolanaService instance', () => {
      expect(() => {
        solanaService = new SolanaService();
      }).not.toThrow();
    });
  });
});
