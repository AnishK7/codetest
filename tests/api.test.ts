import request from 'supertest';
import { createApp } from '../src/app';
import type { SolanaService } from '../src/services/solana';
import { Keypair } from '@solana/web3.js';
import type { Mock } from 'jest-mock';

jest.mock('../src/config/env');

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

type SolanaServiceMock = {
  initializeCounter: jest.Mock<
    Promise<{
      counterAddress: string;
      signature: string;
      seed: string;
    }>,
    [string?]
  >;
  incrementCounter: jest.Mock<
    Promise<{
      signature: string;
      newCount: string;
    }>,
    [string]
  >;
  getCounterData: jest.Mock<
    Promise<{
      authority: string;
      count: string;
    }>,
    [string]
  >;
  getClusterInfo: jest.Mock<
    Promise<{
      cluster: string;
      programId: string;
    }>,
    []
  >;
  getWalletPublicKey: jest.Mock<ReturnType<SolanaService['getWalletPublicKey']>, []>;
};

describe('API Endpoints', () => {
  let app: ReturnType<typeof createApp>;
  let mockSolanaService: SolanaServiceMock;

  beforeEach(() => {
    mockSolanaService = {
      initializeCounter: jest.fn(),
      incrementCounter: jest.fn(),
      getCounterData: jest.fn(),
      getClusterInfo: jest.fn(),
      getWalletPublicKey: jest.fn(() => Keypair.generate().publicKey),
    };

    app = createApp(mockSolanaService as unknown as SolanaService);
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      mockSolanaService.getClusterInfo.mockResolvedValue({
        cluster: 'https://api.devnet.solana.com',
        programId: 'CounterProgram111111111111111111111111111',
      });

      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        solanaCluster: 'https://api.devnet.solana.com',
        programId: 'CounterProgram111111111111111111111111111',
      });
    });
  });

  describe('POST /api/counter/initialize', () => {
    it('should initialize a counter with default seed', async () => {
      mockSolanaService.initializeCounter.mockResolvedValue({
        counterAddress: 'Dummy1111111111111111111111111111111111111',
        signature: 'signature123',
        seed: 'counter',
      });

      const response = await request(app)
        .post('/api/counter/initialize')
        .send({});

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.counterAddress).toBe(
        'Dummy1111111111111111111111111111111111111',
      );
      expect(response.body.signature).toBe('signature123');
      expect(mockSolanaService.initializeCounter).toHaveBeenCalledWith(
        'counter',
      );
    });

    it('should initialize a counter with custom seed', async () => {
      mockSolanaService.initializeCounter.mockResolvedValue({
        counterAddress: 'Dummy1111111111111111111111111111111111111',
        signature: 'signature456',
        seed: 'custom-seed',
      });

      const response = await request(app)
        .post('/api/counter/initialize')
        .send({ seed: 'custom-seed' });

      expect(response.status).toBe(201);
      expect(response.body.seed).toBe('custom-seed');
      expect(mockSolanaService.initializeCounter).toHaveBeenCalledWith(
        'custom-seed',
      );
    });
  });

  describe('POST /api/counter/increment', () => {
    it('should increment a counter', async () => {
      const counterAddress = 'Counter111111111111111111111111111111111111';
      mockSolanaService.incrementCounter.mockResolvedValue({
        signature: 'sig789',
        newCount: '5',
      });

      const response = await request(app)
        .post('/api/counter/increment')
        .send({ counterAddress });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.newCount).toBe('5');
      expect(response.body.signature).toBe('sig789');
      expect(mockSolanaService.incrementCounter).toHaveBeenCalledWith(
        counterAddress,
      );
    });

    it('should return validation error for missing counterAddress', async () => {
      const response = await request(app)
        .post('/api/counter/increment')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/counter/:counterAddress', () => {
    it('should get counter data', async () => {
      const counterAddress = 'Counter111111111111111111111111111111111111';
      mockSolanaService.getCounterData.mockResolvedValue({
        authority: 'Authority111111111111111111111111111111111',
        count: '42',
      });

      const response = await request(app).get(
        `/api/counter/${counterAddress}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe('42');
      expect(response.body.authority).toBe(
        'Authority111111111111111111111111111111111',
      );
      expect(mockSolanaService.getCounterData).toHaveBeenCalledWith(
        counterAddress,
      );
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');

      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toBe('Resource not found');
    });
  });
});
