'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  CounterData,
  fetchCounterValue,
  incrementCounter,
  initializeCounter,
} from '@/lib/api'

interface CounterState {
  data: CounterData | null
  isLoading: boolean
  isUpdating: boolean
  error: string | null
}

export function useCounter() {
  const [state, setState] = useState<CounterState>({
    data: null,
    isLoading: true,
    isUpdating: false,
    error: null,
  })

  const loadCounter = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))
    try {
      const data = await fetchCounterValue()
      setState({ data, isLoading: false, isUpdating: false, error: null })
    } catch (error) {
      setState({ data: null, isLoading: false, isUpdating: false, error: (error as Error).message })
    }
  }, [])

  useEffect(() => {
    void loadCounter()
  }, [loadCounter])

  const handleAction = useCallback(async (action: 'initialize' | 'increment', walletAddress: string) => {
    setState((prev) => ({ ...prev, isUpdating: true, error: null }))
    try {
      const data =
        action === 'initialize'
          ? await initializeCounter(walletAddress)
          : await incrementCounter(walletAddress)
      setState({ data, isLoading: false, isUpdating: false, error: null })
    } catch (error) {
      setState((prev) => ({ ...prev, isUpdating: false, error: (error as Error).message }))
    }
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  return {
    counter: state.data,
    isLoading: state.isLoading,
    isUpdating: state.isUpdating,
    error: state.error,
    refresh: loadCounter,
    initialize: (walletAddress: string) => handleAction('initialize', walletAddress),
    increment: (walletAddress: string) => handleAction('increment', walletAddress),
    clearError,
  }
}
