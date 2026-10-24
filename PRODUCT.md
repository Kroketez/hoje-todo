# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Node.js + Vite + React + TypeScript (user's choice, matching their previous project "Selo"). Static build deployed to GitHub Pages via GitHub Actions. No backend; data lives in localStorage.

## Users

One person keeping a personal list of everyday errands: groceries, bills, appointments, small chores. Opens it on a phone in passing or on a laptop at a desk.

## Product Purpose

A personal to-do list that answers "what do I need to do today?" first. Success: the user opens it, sees what is overdue and due today at a glance, ticks things off, and closes it.

Also a portfolio piece for the author (Simão Carvalho, GitHub: Kroketez), so craft and polish are visible to reviewers.

## Positioning

Focus on today. Overdue and today's items lead; later and undated items step back. Name: **Hoje** (Portuguese for "today").

## Capabilities and Constraints

- Add, edit, delete tasks (Undo on delete), mark done
- Due dates
- Filters: all / active / done; text search
- Drag to reorder
- localStorage persistence, sample tasks on first visit, reset button
- Keyboard shortcuts
- Fully responsive (phone and desktop) and accessible
- Must not look like a generic AI-made app; no generic "AI" fonts (Archivo, Inter and similar were rejected)

## Evidence on Hand

None. Sample tasks are illustrative errands, not real user data.

## Product Principles

1. Today first: the most urgent thing is always the most visible thing.
2. Quick in, quick out: adding or completing a task takes one action.
3. Nothing is lost by accident: destructive actions can be undone.
4. Works the same by touch, mouse or keyboard.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard operable (including reorder), visible focus, screen-reader labels and live announcements, reduced-motion respected, sufficient contrast.
