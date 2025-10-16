const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export interface CounterData {
  value: number
  account: string
  lastUpdated?: string
}

export interface ApiError {
  error: string
  message?: string
}

export async function fetchCounterValue(): Promise<CounterData> {
  const response = await fetch(`${API_BASE_URL}/api/counter`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ error: 'Failed to fetch counter value' }))
    throw new Error(error.message || error.error || 'Failed to fetch counter value')
  }

  return response.json()
}

export async function initializeCounter(walletAddress: string): Promise<CounterData> {
  const response = await fetch(`${API_BASE_URL}/api/counter/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress }),
  })

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ error: 'Failed to initialize counter' }))
    throw new Error(error.message || error.error || 'Failed to initialize counter')
  }

  return response.json()
}

export async function incrementCounter(walletAddress: string): Promise<CounterData> {
  const response = await fetch(`${API_BASE_URL}/api/counter/increment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress }),
  })

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({ error: 'Failed to increment counter' }))
    throw new Error(error.message || error.error || 'Failed to increment counter')
  }

  return response.json()
}
