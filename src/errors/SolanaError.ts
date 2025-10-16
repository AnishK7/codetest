import { AppError } from './AppError';

export class SolanaError extends AppError {
  constructor(message: string, originalError?: Error) {
    const finalMessage = originalError
      ? `${message}: ${originalError.message}`
      : message;
    super(finalMessage, 500);
  }
}

export class TransactionError extends AppError {
  constructor(message: string, signature?: string) {
    const finalMessage = signature
      ? `${message}. Transaction signature: ${signature}`
      : message;
    super(finalMessage, 500);
  }
}

export class AccountNotFoundError extends AppError {
  constructor(accountAddress: string) {
    super(`Account not found: ${accountAddress}`, 404);
  }
}
