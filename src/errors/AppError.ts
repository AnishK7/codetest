export interface ErrorDetails {
  field?: string;
  message: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: ErrorDetails[];

  constructor(message: string, statusCode = 500, details?: ErrorDetails[]) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails[]) {
    super(message, 400, details);
  }
}
