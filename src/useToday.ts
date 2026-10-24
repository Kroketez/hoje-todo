import { useEffect, useState } from 'react'
import { toKey } from './dates'

/** Today's local date key; rolls over at midnight and when the tab comes back. */
export function useToday(): string {
  const [today, setToday] = useState(() => toKey(new Date()))

  useEffect(() => {
    const check = () => setToday(toKey(new Date()))
    const timer = setInterval(check, 60_000)
    document.addEventListener('visibilitychange', check)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', check)
    }
  }, [])

  return today
}
