import { addDays } from './dates'
import type { Task } from './types'

/** Errands shown on the first visit, dated around today so the demo always looks lived-in. */
export function sampleTasks(today: string): { tasks: Task[]; nextNumber: number } {
  const rows: [string, number | null, boolean?][] = [
    ['Pay the electricity bill', -2],
    ['Return library books', -1],
    ['Pick up prescription at the pharmacy', 0],
    ['Buy milk, eggs and bread', 0],
    ['Call Mum about Sunday lunch', 0],
    ['Take out the recycling', 0, true],
    ['Dentist appointment, 10:30', 3],
    ['Renew car insurance', 6],
    ['Book a haircut', 12],
    ['Fix the squeaky wardrobe door', null],
    ['Sort the photos from summer', null],
  ]
  const tasks = rows.map(([title, offset, done], i) => ({
    id: `sample-${i + 1}`,
    number: i + 1,
    title,
    due: offset === null ? null : addDays(today, offset),
    done: Boolean(done),
  }))
  return { tasks, nextNumber: tasks.length + 1 }
}
