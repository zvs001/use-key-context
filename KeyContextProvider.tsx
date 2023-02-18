import React, { ComponentProps, ReactElement, useContext, useMemo } from 'react'
import KeyContext from './KeyContext'

export function useKeyContext(key: string | number = ''): string {
  const keyCtx = useContext(KeyContext)
  if (!keyCtx?.value) return key.toString()

  // should handle values like: 0
  if (typeof key === 'undefined') return keyCtx.value

  const { value, delimiter = '/' } = keyCtx

  return `${value}${delimiter}${key}`
}

export interface KeyContextProviderProps {
  value: string | number
  children: ReactElement
  delimiter?: string
}
export function KeyContextProvider(props: KeyContextProviderProps) {
  const { value, children, delimiter } = props
  const ctxData = useContext(KeyContext)
  const key = useKeyContext(value)

  const ctxNextValue = useMemo((): ComponentProps<typeof KeyContext.Provider>['value'] => {
    return {
      value: key,
      delimiter: delimiter ?? ctxData.delimiter,
    }
  }, [key, ctxData, delimiter])

  return <KeyContext.Provider value={ctxNextValue}>{children}</KeyContext.Provider>
}
