import { useCallback, useEffect, useReducer } from 'react'
import { sampleTasks } from './sample'
import type { Task } from './types'

const STORAGE_KEY = 'hoje.v1'

interface Saved {
  tasks: Task[]
  nextNumber: number
}

export type Undo =
  | { kind: 'delete'; task: Task; index: number }
  | { kind: 'reset'; previous: Saved }

interface State extends Saved {
  undo: Undo | null
}

type Action =
  | { type: 'add'; title: string; due: string | null }
  | { type: 'update'; id: string; title: string; due: string | null }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'move'; id: string; toIndex: number }
  | { type: 'reset'; today: string }
  | { type: 'undo' }
  | { type: 'dismissUndo' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const task: Task = {
        id: crypto.randomUUID(),
        number: state.nextNumber,
        title: action.title,
        due: action.due,
        done: false,
      }
      return { ...state, tasks: [...state.tasks, task], nextNumber: state.nextNumber + 1 }
    }
    case 'update':
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, title: action.title, due: action.due } : t)),
      }
    case 'toggle':
      return { ...state, tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)) }
    case 'delete': {
      const index = state.tasks.findIndex((t) => t.id === action.id)
      if (index < 0) return state
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
        undo: { kind: 'delete', task: state.tasks[index], index },
      }
    }
    case 'move': {
      const from = state.tasks.findIndex((t) => t.id === action.id)
      if (from < 0 || from === action.toIndex) return state
      const tasks = [...state.tasks]
      const [task] = tasks.splice(from, 1)
      tasks.splice(action.toIndex, 0, task)
      return { ...state, tasks }
    }
    case 'reset':
      return {
        ...sampleTasks(action.today),
        undo: { kind: 'reset', previous: { tasks: state.tasks, nextNumber: state.nextNumber } },
      }
    case 'undo': {
      const undo = state.undo
      if (!undo) return state
      if (undo.kind === 'reset') return { ...undo.previous, undo: null }
      const tasks = [...state.tasks]
      tasks.splice(Math.min(undo.index, tasks.length), 0, undo.task)
      return { ...state, tasks, undo: null }
    }
    case 'dismissUndo':
      return { ...state, undo: null }
  }
}

function load(today: string): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw) as Saved
      if (Array.isArray(saved.tasks) && typeof saved.nextNumber === 'number') return { ...saved, undo: null }
    }
  } catch {
    // Unreadable or blocked storage: fall through to the sample list.
  }
  return { ...sampleTasks(today), undo: null }
}

export function useTasks(today: string) {
  const [state, dispatch] = useReducer(reducer, today, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks: state.tasks, nextNumber: state.nextNumber }))
    } catch {
      // Storage full or blocked: the list still works for this visit.
    }
  }, [state.tasks, state.nextNumber])

  return {
    tasks: state.tasks,
    undo: state.undo,
    add: useCallback((title: string, due: string | null) => dispatch({ type: 'add', title, due }), []),
    update: useCallback(
      (id: string, title: string, due: string | null) => dispatch({ type: 'update', id, title, due }),
      [],
    ),
    toggle: useCallback((id: string) => dispatch({ type: 'toggle', id }), []),
    remove: useCallback((id: string) => dispatch({ type: 'delete', id }), []),
    move: useCallback((id: string, toIndex: number) => dispatch({ type: 'move', id, toIndex }), []),
    reset: useCallback(() => dispatch({ type: 'reset', today }), [today]),
    undoLast: useCallback(() => dispatch({ type: 'undo' }), []),
    dismissUndo: useCallback(() => dispatch({ type: 'dismissUndo' }), []),
  }
}
