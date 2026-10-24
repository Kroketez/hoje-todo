import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export const SHORTCUTS: [string[], string][] = [
  [['N'], 'New task'],
  [['/'], 'Search'],
  [['1', '2', '3'], 'Show all, active, done'],
  [['J', 'K'], 'Next / previous ticket'],
  [['X'], 'Mark focused ticket done'],
  [['E'], 'Edit focused ticket'],
  [['Del'], 'Delete focused ticket'],
  [['Alt', '↑ ↓'], 'Move focused ticket'],
  [['Ctrl', 'Z'], 'Undo delete or reset'],
  [['Esc'], 'Cancel, clear search'],
  [['?'], 'Show these shortcuts'],
]

export function ShortcutsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="shortcuts"
      aria-labelledby="shortcuts-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="shortcuts-head">
        <h2 id="shortcuts-title">Keyboard shortcuts</h2>
        <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <dl>
        {SHORTCUTS.map(([keys, label]) => (
          <div key={label}>
            <dt>
              {keys.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </dialog>
  )
}
