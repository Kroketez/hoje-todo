import { Check, GripVertical, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { addDays, dueLabel, longLabel } from '../dates'
import type { Bucket, Task } from '../types'

export const ticketNo = (n: number) => String(n % 1000).padStart(3, '0')

interface Props {
  task: Task
  bucket: Bucket
  today: string
  editing: boolean
  dragging: boolean
  dragOffset: number
  position: number
  total: number
  onToggle: (id: string) => void
  onEdit: (id: string | null) => void
  onSave: (id: string, title: string, due: string | null) => void
  onDelete: (id: string) => void
  onStep: (id: string, delta: number) => void
  onDragStart: (id: string, event: PointerEvent<HTMLButtonElement>) => void
}

export function Ticket(props: Props) {
  const { task, bucket, today, editing, dragging, dragOffset, position, total } = props
  const style: CSSProperties | undefined = dragging ? { transform: `translateY(${dragOffset}px)` } : undefined

  function onHandleKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      event.stopPropagation()
      props.onStep(task.id, event.key === 'ArrowUp' ? -1 : 1)
    }
  }

  return (
    <li
      className={`ticket b-${bucket}${dragging ? ' is-dragging' : ''}${editing ? ' is-editing' : ''}`}
      data-id={task.id}
      tabIndex={-1}
      style={style}
    >
      <button
        type="button"
        className="stub"
        aria-label={`Ticket ${ticketNo(task.number)}, position ${position} of ${total}. Drag, or press up and down arrows, to reorder.`}
        onPointerDown={(e) => props.onDragStart(task.id, e)}
        onKeyDown={onHandleKey}
      >
        <span className="stub-no" aria-hidden="true">
          Nº
        </span>
        <span className="stub-num">{ticketNo(task.number)}</span>
        <GripVertical className="stub-grip" aria-hidden="true" size={16} />
      </button>
      {editing ? (
        <EditForm task={task} today={today} onSave={props.onSave} onCancel={() => props.onEdit(null)} />
      ) : (
        <div className="body">
          <label className="check">
            <input type="checkbox" checked={task.done} onChange={() => props.onToggle(task.id)} />
            <span className="box" aria-hidden="true">
              <Check size={16} strokeWidth={3} />
            </span>
            <span className="title" onDoubleClick={(e) => (e.preventDefault(), props.onEdit(task.id))}>
              {task.title}
            </span>
          </label>
          <span className="due">
            {task.due ? (
              <time dateTime={task.due} title={longLabel(task.due)}>
                {dueLabel(task.due, today)}
              </time>
            ) : (
              'Someday'
            )}
          </span>
          <div className="actions">
            <button type="button" className="icon-btn" aria-label={`Edit “${task.title}”`} onClick={() => props.onEdit(task.id)}>
              <Pencil size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn danger"
              aria-label={`Delete “${task.title}”`}
              onClick={() => props.onDelete(task.id)}
            >
              <Trash2 size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

function EditForm({
  task,
  today,
  onSave,
  onCancel,
}: {
  task: Task
  today: string
  onSave: Props['onSave']
  onCancel: () => void
}) {
  const [title, setTitle] = useState(task.title)
  const [due, setDue] = useState(task.due ?? '')
  const [error, setError] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()
    input.current?.select()
  }, [])

  return (
    <form
      className="body edit"
      aria-label={`Edit ticket ${ticketNo(task.number)}`}
      onSubmit={(e) => {
        e.preventDefault()
        const clean = title.trim()
        if (!clean) {
          setError('Write something before saving.')
          input.current?.focus()
          return
        }
        onSave(task.id, clean, due || null)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          onCancel()
        }
      }}
    >
      <label className="sr-only" htmlFor={`edit-${task.id}`}>
        Task
      </label>
      <input
        id={`edit-${task.id}`}
        ref={input}
        className="field edit-title"
        value={title}
        onChange={(e) => (setTitle(e.target.value), setError(''))}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `edit-err-${task.id}` : undefined}
        maxLength={200}
      />
      <label className="sr-only" htmlFor={`edit-due-${task.id}`}>
        Due date
      </label>
      <input
        id={`edit-due-${task.id}`}
        className="field edit-due"
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
      />
      <div className="edit-quick" role="group" aria-label="Quick dates">
        <button type="button" className="chip" onClick={() => setDue(today)}>
          Today
        </button>
        <button type="button" className="chip" onClick={() => setDue(addDays(today, 1))}>
          Tomorrow
        </button>
        <button type="button" className="chip" onClick={() => setDue('')}>
          No date
        </button>
      </div>
      <div className="edit-actions">
        <button type="button" className="btn ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn primary">
          Save
        </button>
      </div>
      {error && (
        <p className="form-error" id={`edit-err-${task.id}`} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
