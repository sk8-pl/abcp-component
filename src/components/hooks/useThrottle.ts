import { useCallback, useEffect, useRef } from 'react'
import { DEFAULT_THROTTLE_MS } from '../../config'

const getRemainingTime = (lastTriggeredTime: number, throttleMs: number) => {

  const elapsedTime = Date.now() - lastTriggeredTime
  const remainingTime = throttleMs - elapsedTime

  return (remainingTime < 0) ? 0 : remainingTime
}

export type useThrottledFunctionProps = {
  callbackFn:(args:  any) => void
  throttleMs?: number
}

const useThrottledFunction = ({
  callbackFn,
  throttleMs = DEFAULT_THROTTLE_MS,
}: useThrottledFunctionProps) => {
  const lastTriggered = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const throttledFn = useCallback(<T>(args?: T) => {
    let remainingTime = getRemainingTime(lastTriggered.current, throttleMs)

    if (remainingTime === 0) {
      lastTriggered.current = Date.now()
      callbackFn(args)
      cancel()
    }

  }, [callbackFn, cancel])

  useEffect(() => cancel, [cancel])

  return throttledFn
}

export default useThrottledFunction;
