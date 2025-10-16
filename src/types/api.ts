import { z } from 'zod';

export const InitializeCounterRequestSchema = z.object({
  seed: z.string().optional().default('counter'),
});

export const IncrementCounterRequestSchema = z.object({
  counterAddress: z.string(),
});

export const CounterAddressParamSchema = z.object({
  counterAddress: z.string(),
});

export type InitializeCounterRequest = z.infer<
  typeof InitializeCounterRequestSchema
>;
export type IncrementCounterRequest = z.infer<
  typeof IncrementCounterRequestSchema
>;
export type CounterAddressParams = z.infer<typeof CounterAddressParamSchema>;

export interface InitializeCounterResponse {
  success: boolean;
  counterAddress: string;
  seed: string;
  signature: string;
}

export interface IncrementCounterResponse {
  success: boolean;
  counterAddress: string;
  newCount: string;
  signature: string;
}

export interface GetCounterResponse {
  success: boolean;
  counterAddress: string;
  authority: string;
  count: string;
}

export interface HealthCheckResponse {
  status: 'ok';
  solanaCluster: string;
  programId: string;
}
