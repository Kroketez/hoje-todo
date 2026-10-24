import type { Bucket, Task } from './types'

const DAY = 86_400_000

/** Local calendar date as YYYY-MM-DD. */
export function toKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(key: string, days: number): string {
  const date = fromKey(key)
  date.setDate(date.getDate() + days)
  return toKey(date)
}

/** Whole days from `today` to `key` (negative = in the past). */
export function daysBetween(today: string, key: string): number {
  return Math.round((fromKey(key).getTime() - fromKey(today).getTime()) / DAY)
}

export function bucketOf(task: Task, today: string): Bucket {
  if (task.done) return 'done'
  if (!task.due) return 'someday'
  const diff = daysBetween(today, task.due)
  if (diff < 0) return 'overdue'
  if (diff === 0) return 'today'
  if (diff <= 7) return 'soon'
  return 'later'
}

const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric' })
const dayMonth = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
const longDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

/** Short label for the due column: "2 days late", "Today", "Tue 27", "9 Nov". */
export function dueLabel(due: string | null, today: string): string {
  if (!due) return 'No date'
  const diff = daysBetween(today, due)
  if (diff < -1) return `${-diff} days late`
  if (diff === -1) return 'Yesterday'
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff <= 7) return weekday.format(fromKey(due))
  return dayMonth.format(fromKey(due))
}

/** Full date for screen readers and the header. */
export function longLabel(key: string): string {
  return longDate.format(fromKey(key))
}
