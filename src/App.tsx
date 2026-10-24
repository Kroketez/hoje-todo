import { Keyboard, RotateCcw, Search, X } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { AddBar } from './components/AddBar'
import { NowServing } from './components/NowServing'
import { ShortcutsDialog } from './components/Shortcuts'
import { Ticket, ticketNo } from './components/Ticket'
import { bucketOf, dueLabel, longLabel } from './dates'
import { useTasks } from './store'
import type { Bucket, Filter, Task } from './types'
import { useToday } from './useToday'

interface Section {
  id: string
  title: string
  buckets: Bucket[]
}

const SECTIONS: Section[] = [
  { id: 'now', title: 'Overdue and today', buckets: ['overdue', 'today'] },
  { id: 'soon', title: 'Coming up', buckets: ['soon', 'later'] },
  { id: 'someday', title: 'Someday', buckets: ['someday'] },
  { id: 'done', title: 'Done', buckets: ['done'] },
]

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return true
  return target instanceof HTMLInputElement && !['checkbox', 'radio', 'button', 'submit'].includes(target.type)
}

interface Drag {
  id: string
  startY: number
  offset: number
}

export default function App() {
  const today = useToday()
  const store = useTasks(today)
  const { tasks } = store
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showKeys, setShowKeys] = useState(false)
  const [message, setMessage] = useState('')
  const [drag, setDrag] = useState<Drag | null>(null)
  const addRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<Drag | null>(null)

  const announce = useCallback((text: string) => {
    // Clear first so the same text is read again.
    setMessage('')
    requestAnimationFrame(() => setMessage(text))
  }, [])

  const buckets = useMemo(() => new Map(tasks.map((t) => [t.id, bucketOf(t, today)])), [tasks, today])
  const queue = tasks.filter((t) => {
    const b = buckets.get(t.id)
    return b === 'overdue' || b === 'today'
  })
  const serving = queue[0]
  const nextUp = tasks.find((t) => buckets.get(t.id) === 'soon' || buckets.get(t.id) === 'later')
  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.done).length,
    done: tasks.filter((t) => t.done).length,
    overdue: tasks.filter((t) => buckets.get(t.id) === 'overdue').length,
    today: tasks.filter((t) => buckets.get(t.id) === 'today').length,
  }

  const q = fold(query.trim())
  const visible = tasks.filter((t) => {
    if (filter === 'active' && t.done) return false
    if (filter === 'done' && !t.done) return false
    return !q || fold(t.title).includes(q)
  })
  const sections = SECTIONS.map((s) => ({
    ...s,
    items: visible.filter((t) => s.buckets.includes(buckets.get(t.id)!)),
  })).filter((s) => s.items.length > 0)

  const sectionOf = useCallback(
    (id: string) => sections.find((s) => s.items.some((t) => t.id === id)),
    [sections],
  )

  // Move a ticket one step within its section (keyboard and drag share this).
  const step = useCallback(
    (id: string, delta: number) => {
      const section = sectionOf(id)
      if (!section) return false
      const i = section.items.findIndex((t) => t.id === id)
      const target = section.items[i + delta]
      if (!target) return false
      store.move(id, tasks.indexOf(target))
      announce(`Moved to position ${i + delta + 1} of ${section.items.length} in ${section.title}.`)
      return true
    },
    [sectionOf, store, tasks, announce],
  )

  const toggle = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id)
      if (!task) return
      store.toggle(id)
      if (task.done) return announce(`“${task.title}” is back on the list.`)
      const nextInQueue = task.id === serving?.id ? queue[1] : serving
      announce(
        nextInQueue
          ? `Done: ${task.title}. Now serving ${ticketNo(nextInQueue.number)}, ${nextInQueue.title}.`
          : `Done: ${task.title}.`,
      )
    },
    [tasks, store, serving, queue, announce],
  )

  const remove = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id)
      store.remove(id)
      if (editingId === id) setEditingId(null)
      if (task) announce(`Deleted “${task.title}”. Press Control Z or the Undo button to bring it back.`)
    },
    [tasks, store, editingId, announce],
  )

  // ---- Drag to reorder (pointer events, so mouse, pen and touch all work) ----
  const onDragStart = useCallback((id: string, event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const d = { id, startY: event.clientY, offset: 0 }
    dragRef.current = d
    setDrag(d)
  }, [])

  useEffect(() => {
    if (!drag) return
    const id = drag.id

    function onMove(e: globalThis.PointerEvent) {
      const d = dragRef.current
      if (!d) return
      let offset = e.clientY - d.startY
      const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`)
      const list = el?.parentElement
      if (el && list) {
        const items = Array.from(list.children) as HTMLElement[]
        const i = items.indexOf(el)
        const gap = parseFloat(getComputedStyle(list).rowGap) || 0
        const below = items[i + 1]
        const above = items[i - 1]
        if (below && offset > (below.offsetHeight + gap) / 2) {
          if (step(id, 1)) d.startY += below.offsetHeight + gap
        } else if (above && offset < -(above.offsetHeight + gap) / 2) {
          if (step(id, -1)) d.startY -= above.offsetHeight + gap
        }
        offset = e.clientY - d.startY
      }
      d.offset = offset
      setDrag({ ...d })
    }
    function onUp() {
      dragRef.current = null
      setDrag(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
    // Re-bind only when a new drag starts; `step` reads fresh state each render.
  }, [drag?.id, step]) // eslint-disable-line react/exhaustive-deps

  // ---- Keyboard shortcuts ----
  useEffect(() => {
    function focusTicket(el: Element | null | undefined) {
      if (el instanceof HTMLElement) el.focus()
    }
    function onKey(e: KeyboardEvent) {
      if (showKeys) return
      const target = e.target as HTMLElement | null
      if (isTyping(target)) {
        if (e.key === 'Escape' && target === searchRef.current) {
          setQuery('')
          target?.blur()
        } else if (e.key === 'Escape') target?.blur()
        return
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (store.undo) {
          e.preventDefault()
          store.undoLast()
          announce('Undone.')
        }
        return
      }
      if (e.ctrlKey || e.metaKey) return

      const ticket = target?.closest<HTMLElement>('[data-id]')
      const id = ticket?.dataset.id
      const all = Array.from(document.querySelectorAll<HTMLElement>('li[data-id]'))
      const key = e.key

      if (key === '/') {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (key.toLowerCase() === 'n') {
        e.preventDefault()
        addRef.current?.focus()
      } else if (key === '?') {
        e.preventDefault()
        setShowKeys(true)
      } else if (key === '1' || key === '2' || key === '3') {
        setFilter(FILTERS[Number(key) - 1].id)
      } else if (key === 'Escape') {
        if (query) setQuery('')
      } else if (key.toLowerCase() === 'j' || (key === 'ArrowDown' && !e.altKey && ticket === target)) {
        e.preventDefault()
        focusTicket(ticket ? all[all.indexOf(ticket) + 1] : all[0])
      } else if (key.toLowerCase() === 'k' || (key === 'ArrowUp' && !e.altKey && ticket === target)) {
        e.preventDefault()
        focusTicket(ticket ? all[all.indexOf(ticket) - 1] : all[all.length - 1])
      } else if (id && e.altKey && (key === 'ArrowUp' || key === 'ArrowDown')) {
        e.preventDefault()
        step(id, key === 'ArrowUp' ? -1 : 1)
        requestAnimationFrame(() => focusTicket(document.querySelector(`li[data-id="${id}"]`)))
      } else if (id && (key.toLowerCase() === 'x' || (key === ' ' && ticket === target))) {
        e.preventDefault()
        toggle(id)
        requestAnimationFrame(() => focusTicket(document.querySelector(`li[data-id="${id}"]`)))
      } else if (id && (key.toLowerCase() === 'e' || (key === 'Enter' && ticket === target))) {
        e.preventDefault()
        setEditingId(id)
      } else if (id && (key === 'Delete' || key === 'Backspace')) {
        e.preventDefault()
        const i = all.indexOf(ticket!)
        const neighbour = all[i + 1] ?? all[i - 1]
        remove(id)
        requestAnimationFrame(() => focusTicket(neighbour))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showKeys, store, query, step, toggle, remove, announce])

  // Tickets glide to their new place when the list changes (FLIP).
  const positions = useRef(new Map<string, number>())
  useLayoutEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const next = new Map<string, number>()
    document.querySelectorAll<HTMLElement>('li[data-id]').forEach((el) => {
      const id = el.dataset.id!
      const top = el.getBoundingClientRect().top + window.scrollY
      next.set(id, top)
      const before = positions.current.get(id)
      if (still || before === undefined || id === dragRef.current?.id) return
      const dy = before - top
      if (Math.abs(dy) < 1) return
      el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }], {
        duration: 360,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      })
    })
    positions.current = next
  })

  // Undo toast hides itself after a while.
  useEffect(() => {
    if (!store.undo) return
    const timer = setTimeout(store.dismissUndo, 8000)
    return () => clearTimeout(timer)
  }, [store.undo, store.dismissUndo])

  const undoText = store.undo?.kind === 'delete' ? `Deleted “${store.undo.task.title}”` : 'Sample tasks restored'

  return (
    <div className={`app${editingId ? ' has-editing' : ''}${drag ? ' has-drag' : ''}`}>
      <a className="skip" href="#main">
        Skip to tasks
      </a>
      <aside className="rail">
        <div className="brand">
          <h1>Hoje</h1>
          <p>{longLabel(today)}</p>
        </div>
        <p className="rail-summary">
          {counts.overdue > 0 && <span className="rail-late">{counts.overdue} overdue</span>}
          {counts.overdue > 0 && ' · '}
          {counts.today} due today
        </p>
        <div className="search" role="search">
          <Search size={18} aria-hidden="true" />
          <label htmlFor="search" className="sr-only">
            Search tasks
          </label>
          <input
            id="search"
            ref={searchRef}
            type="search"
            placeholder="Search tasks"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd aria-hidden="true">/</kbd>
        </div>
        <nav className="filters" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              <span>{f.label}</span>
              <span className="count">{counts[f.id]}</span>
            </button>
          ))}
        </nav>
        <div className="rail-foot">
          <button type="button" className="rail-link" onClick={() => setShowKeys(true)}>
            <Keyboard size={18} aria-hidden="true" />
            Shortcuts <kbd aria-hidden="true">?</kbd>
          </button>
          <button
            type="button"
            className="rail-link reset"
            onClick={() => {
              store.reset()
              setEditingId(null)
              announce('Sample tasks restored. Press Control Z to undo.')
            }}
          >
            <RotateCcw size={18} aria-hidden="true" />
            Reset sample tasks
          </button>
        </div>
      </aside>

      <main id="main" className="work">
        <NowServing task={serving} next={nextUp} today={today} remaining={queue.length} onDone={toggle} />
        <AddBar
          ref={addRef}
          today={today}
          onAdd={(title, due) => {
            store.add(title, due)
            announce(`Added “${title}”${due ? `, due ${dueLabel(due, today).toLowerCase()}` : ''}.`)
          }}
        />

        {sections.length === 0 && (
          <div className="empty">
            {q ? (
              <>
                <p className="empty-title">No tickets match “{query.trim()}”</p>
                <button type="button" className="btn ghost" onClick={() => setQuery('')}>
                  Clear search
                </button>
              </>
            ) : filter === 'done' ? (
              <p className="empty-title">Nothing done yet. Tick a ticket and it lands here.</p>
            ) : (
              <p className="empty-title">No tasks. Type one above and take a ticket.</p>
            )}
          </div>
        )}

        {sections.map((section) => (
          <section key={section.id} className={`group g-${section.id}`} aria-labelledby={`h-${section.id}`}>
            <h2 id={`h-${section.id}`} className="group-title">
              {section.title}
              <span className="group-count">{section.items.length}</span>
            </h2>
            <ol className="tickets">
              {section.items.map((task: Task, i) => (
                <Ticket
                  key={task.id}
                  task={task}
                  bucket={buckets.get(task.id)!}
                  today={today}
                  editing={editingId === task.id}
                  dragging={drag?.id === task.id}
                  dragOffset={drag?.id === task.id ? drag.offset : 0}
                  position={i + 1}
                  total={section.items.length}
                  onToggle={toggle}
                  onEdit={(id) => {
                    setEditingId(id)
                    if (!id) requestAnimationFrame(() => (document.querySelector(`li[data-id="${task.id}"]`) as HTMLElement)?.focus())
                  }}
                  onSave={(id, title, due) => {
                    store.update(id, title, due)
                    setEditingId(null)
                    announce('Saved.')
                    requestAnimationFrame(() => (document.querySelector(`li[data-id="${id}"]`) as HTMLElement)?.focus())
                  }}
                  onDelete={remove}
                  onStep={step}
                  onDragStart={onDragStart}
                />
              ))}
            </ol>
          </section>
        ))}
      </main>

      {store.undo && (
        <div className="toast" role="status">
          <span>{undoText}</span>
          <button
            type="button"
            className="toast-undo"
            onClick={() => {
              store.undoLast()
              announce('Undone.')
            }}
          >
            Undo
          </button>
          <button type="button" className="icon-btn toast-close" aria-label="Dismiss" onClick={store.dismissUndo}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {message}
      </p>
      <ShortcutsDialog open={showKeys} onClose={() => setShowKeys(false)} />
    </div>
  )
}
