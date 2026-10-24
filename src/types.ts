export interface Task {
  id: string
  /** Ticket number, handed out in order like a queue machine. */
  number: number
  title: string
  /** Local date as YYYY-MM-DD, or null for "someday". */
  due: string | null
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

/** How urgent a task is, from most to least. */
export type Bucket = 'overdue' | 'today' | 'soon' | 'later' | 'someday' | 'done'
