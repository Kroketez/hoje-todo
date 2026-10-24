import { useEffect, useState } from 'react'

// Seven-segment display, drawn like the "now serving" counter above a service desk.

const SEGMENTS: Record<string, string> = {
  a: '6,4 9,1 31,1 34,4 31,7 9,7',
  b: '36,6 39,9 39,30 36,33 33,30 33,9',
  c: '36,37 39,40 39,61 36,64 33,61 33,40',
  d: '6,66 9,63 31,63 34,66 31,69 9,69',
  e: '4,37 7,40 7,61 4,64 1,61 1,40',
  f: '4,6 7,9 7,30 4,33 1,30 1,9',
  g: '6,35 9,32 31,32 34,35 31,38 9,38',
}

const DIGITS: Record<string, string> = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abged',
  '3': 'abgcd',
  '4': 'fgbc',
  '5': 'afgcd',
  '6': 'afgedc',
  '7': 'abc',
  '8': 'abcdefg',
  '9': 'abcdfg',
  '-': 'g',
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Led({ value }: { value: string }) {
  // When the number changes, the display blanks for a moment and then the
  // new digits light up left to right, like a counter calling the next ticket.
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (value === shown) return
    if (reducedMotion()) return setShown(value)
    setShown(' '.repeat(value.length))
    const timer = setTimeout(() => setShown(value), 90)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react/exhaustive-deps
  }, [value])

  return (
    <span className="led" aria-hidden="true">
      {shown.split('').map((char, i) => {
        const lit = DIGITS[char] ?? ''
        return (
          <svg key={i} className="led-digit" viewBox="-2 0 44 70">
            <g transform="skewX(-6) translate(4 0)">
              {Object.entries(SEGMENTS).map(([name, points], s) => (
                <polygon
                  key={name}
                  points={points}
                  className={lit.includes(name) ? 'seg on' : 'seg'}
                  style={{ transitionDelay: lit ? `${i * 70 + s * 10}ms` : '0ms' }}
                />
              ))}
            </g>
          </svg>
        )
      })}
    </span>
  )
}
