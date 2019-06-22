import { useEffect, useRef } from 'react'

export function useOnUnmount(callback: () => void, condition = true): void {
  useEffect(() => (condition ? callback : () => {}), [])
}

export function useMounted(): boolean {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return mountedRef.current
}
