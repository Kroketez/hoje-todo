import { Plus } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { addDays } from '../dates'

interface Props {
  today: string
  onAdd: (title: string, due: string | null) => void
}

type When = 'today' | 'tomorrow' | 'none' | 'date'

export const AddBar = forwardRef<HTMLInputElement, Props>(function AddBar({ today, onAdd }, ref) {
  const [title, setTitle] = useState('')
  const [when, setWhen] = useState<When>('today')
  const [date, setDate] = useState(addDays(today, 2))
  const [error, setError] = useState('')

  const due = when === 'today' ? today : when === 'tomorrow' ? addDays(today, 1) : when === 'date' ? date || null : null

  const chip = (value: When, label: string) => (
    <button type="button" className="chip" aria-pressed={when === value} onClick={() => setWhen(value)}>
      {label}
    </button>
  )

  return (
    <form
      className="add"
      aria-label="Add a task"
      onSubmit={(e) => {
        e.preventDefault()
        const clean = title.trim()
        if (!clean) {
          setError('Type a task first, then take a ticket.')
          return
        }
        onAdd(clean, due)
        setTitle('')
        setError('')
      }}
    >
      <div className="add-row">
        <label htmlFor="new-task" className="sr-only">
          New task
        </label>
        <input
          id="new-task"
          ref={ref}
          className="field add-input"
          placeholder="Add a task, e.g. Buy stamps"
          autoComplete="off"
          maxLength={200}
          value={title}
          onChange={(e) => (setTitle(e.target.value), setError(''))}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'add-error' : undefined}
        />
        <button type="submit" className="btn primary add-submit">
          <Plus size={20} strokeWidth={2.5} aria-hidden="true" />
          Take a ticket
        </button>
      </div>
      <div className="add-when" role="group" aria-label="Due">
        <span className="add-when-label" aria-hidden="true">
          Due
        </span>
        {chip('today', 'Today')}
        {chip('tomorrow', 'Tomorrow')}
        {chip('none', 'Someday')}
        {chip('date', 'Pick a date')}
        {when === 'date' && (
          <>
            <label htmlFor="new-due" className="sr-only">
              Due date
            </label>
            <input
              id="new-due"
              type="date"
              className="field add-date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </>
        )}
      </div>
      {error && (
        <p id="add-error" className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
})
