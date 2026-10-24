import { Check } from 'lucide-react'
import { dueLabel } from '../dates'
import type { Task } from '../types'
import { Led } from './Led'
import { ticketNo } from './Ticket'

interface Props {
  task: Task | undefined
  next: Task | undefined
  today: string
  remaining: number
  onDone: (id: string) => void
}

export function NowServing({ task, next, today, remaining, onDone }: Props) {
  const late = task?.due && task.due < today
  return (
    <section className="now" aria-labelledby="now-label">
      <div className="now-counter">
        <h2 id="now-label" className="now-label">
          Now serving
        </h2>
        <Led value={task ? ticketNo(task.number) : '---'} />
        {task && <span className="sr-only">ticket {ticketNo(task.number)}</span>}
      </div>
      <div className="now-task" key={task?.id ?? 'clear'}>
        {task ? (
          <>
            <p className="now-title">{task.title}</p>
            <p className={late ? 'now-meta late' : 'now-meta'}>
              {late ? `Overdue · ${dueLabel(task.due, today)}` : 'Due today'}
              {remaining > 1 && ` · ${remaining - 1} more waiting`}
            </p>
          </>
        ) : (
          <>
            <p className="now-title">Queue clear for today</p>
            <p className="now-meta">
              {next ? `Next up: ${next.title}, ${dueLabel(next.due, today).toLowerCase()}` : 'Nothing waiting. Add a task below.'}
            </p>
          </>
        )}
      </div>
      {task && (
        <button type="button" className="now-done" onClick={() => onDone(task.id)}>
          <Check aria-hidden="true" size={20} strokeWidth={2.5} />
          Done, next
        </button>
      )}
    </section>
  )
}
