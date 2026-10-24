---
name: Hoje
description: A day as a take-a-number queue. Civic signage blue over thermal-ticket paper, one LED red counter.
colors:
  civic: "#1d3a8f"
  civic-deep: "#152c6e"
  civic-ink: "#1d3a8f"
  on-civic: "#ffffff"
  on-civic-2: "#c9d4f2"
  ground: "#eef0ea"
  ticket: "#fbfbf8"
  ink: "#15171c"
  ink-2: "#4a5060"
  rule: "#d6d8d0"
  perf: "#c6c9c0"
  late: "#c4261f"
  late-tint: "#fbe4e1"
  late-stub: "#c4261f"
  btn: "#1d3a8f"
  btn-hover: "#152c6e"
  today: "#1d3a8f"
  today-ink: "#fbfbf8"
  soon: "#dbe3f6"
  later: "#eceef4"
  panel: "#15171c"
  panel-2: "#9aa1ae"
  led-on: "#ff3b2f"
  led-off: "#2a2d34"
  late-on-panel: "#ff8a80"
  paper-hover: "#dfe4f3"
  focus: "#f2b705"
  civic-dark: "#142a66"
  civic-deep-dark: "#0f2152"
  civic-ink-dark: "#9db4f5"
  on-civic-2-dark: "#b3c1ea"
  ground-dark: "#0f1116"
  ticket-dark: "#1a1d24"
  ink-dark: "#eceef2"
  ink-2-dark: "#a8afbd"
  rule-dark: "#2b303a"
  perf-dark: "#3a404c"
  late-dark: "#ff7a70"
  late-tint-dark: "#3a1d1d"
  late-stub-dark: "#d0342b"
  btn-dark: "#3b5fd0"
  btn-hover-dark: "#4c6fe0"
  today-dark: "#3b5fd0"
  today-ink-dark: "#ffffff"
  soon-dark: "#26345c"
  later-dark: "#232835"
  panel-dark: "#07080b"
  panel-edge-dark: "#2b303a"
  led-off-dark: "#1b1d22"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.2
  body-large:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.45
  display-compact:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  body-small:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  stub-mark:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.1em"
  label:
    fontFamily: "Atkinson Hyperlegible Next Variable, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.14em"
  ticket-number:
    fontFamily: "Atkinson Hyperlegible Mono Variable, ui-monospace, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "tnum"
  data:
    fontFamily: "Atkinson Hyperlegible Mono Variable, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    fontFeature: "tnum"
  counter-label:
    fontFamily: "Atkinson Hyperlegible Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.18em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  panel: "12px"
  pill: "999px"
spacing:
  half: "4px"
  u: "8px"
  u2: "16px"
  u3: "24px"
  u4: "32px"
  u6: "48px"
  u12: "96px"
  rail: "288px"
  column-max: "1088px"
components:
  button-primary:
    backgroundColor: "{colors.btn}"
    textColor: "{colors.on-civic}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.btn-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "48px"
  button-now-done:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.ink}"
    typography: "{typography.body-large}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "56px"
  button-now-done-hover:
    backgroundColor: "{colors.paper-hover}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    size: "40px"
  icon-button-hover:
    backgroundColor: "{colors.later}"
    textColor: "{colors.ink}"
  icon-button-danger-hover:
    backgroundColor: "{colors.late-tint}"
    textColor: "{colors.late}"
  field:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "48px"
  field-add:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.ink}"
    typography: "{typography.body-large}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "56px"
  chip:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "32px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ticket}"
  rail:
    backgroundColor: "{colors.civic}"
    textColor: "{colors.on-civic}"
    padding: "32px 24px 24px"
    width: "{spacing.rail}"
  rail-search:
    backgroundColor: "{colors.civic-deep}"
    textColor: "{colors.on-civic-2}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "48px"
  filter-tab:
    backgroundColor: "transparent"
    textColor: "{colors.on-civic}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "48px"
  filter-tab-active:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.civic-ink}"
  now-strip:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-civic}"
    rounded: "{rounded.panel}"
    padding: "24px 32px"
  ticket:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "64px"
  ticket-stub-overdue:
    backgroundColor: "{colors.late-stub}"
    textColor: "{colors.on-civic}"
    typography: "{typography.ticket-number}"
    width: "80px"
  ticket-stub-today:
    backgroundColor: "{colors.today}"
    textColor: "{colors.today-ink}"
    typography: "{typography.ticket-number}"
    width: "80px"
  ticket-stub-soon:
    backgroundColor: "{colors.soon}"
    textColor: "{colors.civic-ink}"
    typography: "{typography.ticket-number}"
    width: "80px"
  ticket-stub-later:
    backgroundColor: "{colors.later}"
    textColor: "{colors.civic-ink}"
    typography: "{typography.ticket-number}"
    width: "80px"
  ticket-stub-someday:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.ticket-number}"
    width: "80px"
  toast:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.on-civic}"
    rounded: "{rounded.md}"
    padding: "8px 8px 8px 20px"
  dialog:
    backgroundColor: "{colors.ticket}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
    width: "480px"
---

# Design System: Hoje

## Overview

**Creative North Star: "The Queue Ticket"**

Hoje treats a day as a take-a-number queue at a civic service desk. The shell is signage blue, the work area is thermal-ticket paper, and the single most urgent open task sits under a seven-segment "now serving" counter. Ticking that task off calls the next number: the LED blanks, relights digit by digit, and the next ticket slides up into service. Everything else is a paper ticket in line behind it.

The world is legible before it is decorative. Atkinson Hyperlegible carries all text; its mono sibling carries ticket numbers, counts and dates because they are data. Every size is a multiple of one 8px cell. Urgency is never a free choice of colour: it runs on one fixed ramp (overdue, today, soon, later, someday) expressed by the weight of each ticket's stub. Density is calm and operational: one column, generous 48px targets, nothing on screen that is not a task, a count or a control.

Two themes ship. Light is the daytime counter: blue shell over warm off-white paper. Dark is the evening counter: a deeper navy shell, charcoal paper, a near-black LED housing with a hairline edge, and lifted blues so text keeps AA contrast.

**Key Characteristics:**
- Civic blue shell (rail, or top bar on phones) framing a paper work column.
- Tasks as perforated tickets: numbered stub, dashed tear line with punched notches, title, mono due date.
- One dark "Now serving" strip with a seven-segment SVG counter, the only LED on screen.
- One 8px cell sets every dimension; urgency on one five-step stub ramp.
- Destructive controls (Delete, Reset) isolated by space; editing dims everything else.

## Colors

A restrained civic palette: one blue doing structural work, warm neutrals for paper, and red held back for lateness and the counter.

### Primary
- **Signage Blue** (civic): the shell. Fills the rail and phone top bar, the primary button, the "today" stub and text selection. In dark theme it deepens (civic-dark) for the shell and brightens (btn-dark, today-dark) wherever it must read as an action or a stub on charcoal.
- **Counter Blue Deep** (civic-deep): recessed wells inside the shell (search field, phone filter track) and the primary button's hover.
- **Blue on Paper** (civic-ink): the same blue used as text on paper (active filter tab, today's due date, stub numerals, focused field border). In dark theme it becomes a light periwinkle (civic-ink-dark) so it still reads on charcoal.

### Secondary
- **Overdue Red** (late, late-stub): the only warm accent in the work area. Fills the overdue stub, colours overdue dates and the rail's late count, marks invalid fields and the delete hover (with late-tint behind it). In dark, text red lightens (late-dark) while the stub stays a saturated fill (late-stub-dark).
- **LED Red** (led-on): lit segments of the seven-segment counter. Unlit segments use led-off so the full "8" ghost stays faintly visible, as on a real display. Late meta text on the panel uses late-on-panel.

### Tertiary
- **Focus Amber** (focus): the single focus ring colour, 3px with 2px offset, in both themes. Also the skip link.

### Neutral
- **Counter Floor** (ground): page background, and the colour punched through the ticket notches.
- **Thermal Paper** (ticket): ticket faces, fields, chips, the dialog, and the active filter tab inside the shell.
- **Receipt Ink** (ink): body text, checkbox stroke, selected chip fill.
- **Faded Ink** (ink-2): secondary text, due dates, group headings, placeholder text, icon buttons at rest.
- **Hairline** (rule): field and ghost-button borders, the done-ticket outline.
- **Perforation** (perf): the dashed tear line, empty-state border, dialog row dividers, scrollbar thumb.
- **Soon Wash** (soon) and **Later Wash** (later): the two quiet stub tints at the low end of the urgency ramp; later also serves as the neutral hover wash.
- **LED Housing** (panel, panel-2): the Now strip and toast background, and their muted metadata text. In dark the housing drops to near-black (panel-dark) and gains a 1px edge (panel-edge-dark).

### Named Rules
**The One LED Rule.** LED red belongs to the counter's lit segments. Lateness uses Overdue Red. The Now strip's own button is paper on ink, not red, so the digits stay the only glowing thing.

**The Fixed Ramp Rule.** Urgency is shown only by stub fill, in this order and no other: overdue (late-stub, white numeral), today (today, paper numeral), soon (soon wash), later (later wash), someday (no fill, faded numeral). Done tickets lose fill and shadow and keep only a hairline outline.

**The Blue Shell Rule.** Signage blue frames the work; it does not flood it. On paper, blue appears only as text, the primary button, a focused border, or the today stub.

## Typography

**Display Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif)
**Body Font:** Atkinson Hyperlegible Next Variable (with system-ui, sans-serif)
**Label/Mono Font:** Atkinson Hyperlegible Mono Variable (with ui-monospace, monospace)

**Character:** A public-signage pairing built for reading at a glance: open, unambiguous letterforms for words, and a matching mono with tabular figures for every number the queue produces.

### Hierarchy
- **Display** (800, 2.5rem, 1; Display Compact 2rem on phones): the "Hoje" wordmark in the rail only.
- **Headline** (700, 1.75rem, 1.2, balanced wrap; 1.25rem on phones): the task being served in the Now strip.
- **Title** (700, 1.375rem): dialog headings (keyboard shortcuts).
- **Lead** (400, 1.125rem): the add-task field and the empty-state message.
- **Body Large** (400, 1.0625rem): ticket titles, filter tabs, the Now button.
- **Body** (400, 1rem, 1.45): everything else.
- **Body Small** (0.9375rem): chips, form errors (600), and phone-size subtitle and Now meta.
- **Stub Mark** (0.6875rem, 0.1em): the "Nº" over each stub numeral; hidden on phones.
- **Label** (700, 0.8125rem, 0.14em, uppercase): group headings ("Overdue and today", "Coming up", "Someday"), each followed by a mono count.
- **Ticket Number** (mono 700, 1.25rem, 1, tabular; 1rem on phones): the three-digit stub numeral, prefixed by a small "Nº".
- **Data** (mono 400, 0.875rem, tabular): due dates, rail summary, filter counts, date inputs, kbd keys (0.75rem).
- **Counter Label** (mono 600, 0.75rem, 0.18em, uppercase): the "Now serving" heading over the LED, in panel-2.

### Named Rules
**The Numbers Are Data Rule.** Every number the queue produces (ticket numbers, counts, dates) is set in the mono with tabular figures. Words never use the mono.

**The Drawn Digits Rule.** The seven-segment face is SVG, drawn only for the Now counter. It is never a font and never appears anywhere else.

## Layout

Two columns on desktop: a sticky 288px (36 cells) civic rail at full viewport height, and a work column capped at 1088px (136 cells) with 32px top, 48px side and 96px bottom padding. The work column stacks with 24px gaps: Now strip, add bar, then ticket groups (12px between heading and list, 8px between tickets). The rail stacks brand, summary, search, filters, and pushes shortcuts and Reset to its foot.

At 860px and below the rail becomes a static blue top bar: wordmark and icon-only shortcut and reset buttons on one row, then summary, search, and a horizontal filter track on a civic-deep well. The work column pads 16px. The Now strip folds to two columns with its button spanning full width, and the add bar becomes sticky under it on the ground colour so adding is always within reach. Ticket stubs shrink to 56px, the "Nº" drops, and the due date moves under the title.

Spacing is always a multiple of the 8px cell (with 4px half steps for tight internal gaps). Hit targets are 40 to 56px.

## Elevation & Depth

Paper sits just above the floor. Tickets and the Now strip carry one soft resting shadow; a deeper lift appears only when something is picked up or takes over the screen (dragging, editing, the toast, the dialog). Depth otherwise comes from tone: blue shell, paper, and the dark LED housing. Dark theme replaces both shadows with heavier black ones and adds a hairline edge to the Now strip.

### Shadow Vocabulary
- **Resting paper** (`box-shadow: 0 1px 1px rgb(21 23 28 / 0.06), 0 2px 6px rgb(21 23 28 / 0.06)`; dark `0 1px 2px rgb(0 0 0 / 0.4)`): tickets and the Now strip at rest.
- **Lift** (`box-shadow: 0 10px 24px rgb(21 23 28 / 0.18), 0 2px 6px rgb(21 23 28 / 0.12)`; dark `0 12px 28px rgb(0 0 0 / 0.55)`): a dragged or edited ticket, the toast, the dialog.

### Named Rules
**The Picked-Up Rule.** Lift is a state, never a style. A surface earns the lift shadow only while it is being dragged, edited, or is a transient overlay.

**The Step-Back Rule.** While a ticket is edited, every other ticket, the Now strip and the add bar drop to 40% opacity.

## Shapes

Gently rounded, ticket-cut forms. The working radius is 6px (tickets, fields, buttons, tabs, icon buttons); 4px for small marks (checkbox, kbd, focus ring); 8px for the toast and phone filter track; 10px for the dialog; 12px for the Now strip housing; full pills only for due-date chips. The ticket's signature geometry is its perforation: a 2px dashed tear line between stub and body, with two 6px half-circle notches punched top and bottom in the floor colour. The empty state reuses the dashed perforation as its border.

## Components

### Buttons
Solid, square-shouldered and confident; 700 weight throughout.
- **Shape:** gently rounded (6px), 48px tall, 2px border slot.
- **Primary:** signage blue fill, white text, 20px side padding. Hover deepens to civic-deep (light) or brightens to btn-hover-dark (dark). The add button grows to 56px and collapses to an icon square on phones.
- **Ghost:** transparent with a hairline border; hover darkens the border to faded ink.
- **Done, next:** the Now strip's own button: paper on ink, 56px tall, check icon, hover to a pale blue paper, 1px press-down on active.
- **Icon buttons:** 40px squares (44px on phones), faded ink at rest, later-wash hover; the delete variant hovers to late-tint with red icon. Edit and Delete sit 16px apart.
- **Focus:** amber 3px ring, 2px offset, on every control.

### Chips
- **Style:** 32px pills on paper with a 1.5px hairline border, 0.9375rem text. Used for quick due choices (Today, Tomorrow, and similar) beside a compact mono date field.
- **State:** pressed chips invert to ink fill with paper text and 700 weight; hover darkens the border.

### Cards / Containers (Tickets)
- **Corner Style:** 6px, stub rounded on its outer corners only.
- **Background:** thermal paper; stub fill from the urgency ramp.
- **Shadow Strategy:** resting paper; lift while dragged or edited.
- **Border:** none, except done tickets (1px hairline outline, transparent face, struck-through title).
- **Internal Padding:** 8px vertical, 20px left after the perforation; 64px minimum height; 80px stub.
- **Body:** custom 24px square checkbox (2px ink stroke, ink fill with paper check when done), title, right-aligned mono due date, then Edit and Delete. The stub is the drag handle (grip icon) and reorders with arrow keys.

### Inputs / Fields
- **Style:** paper fill, 2px hairline border, 6px radius, 48px tall. The add field is 56px, 1.125rem, with a blue border at rest.
- **Focus:** border shifts to blue on paper; keyboard focus adds the amber ring.
- **Error:** border turns Overdue Red with a 600-weight red message below.
- **Search (in the shell):** a civic-deep well with on-civic text and placeholder; the amber ring wraps the whole well on focus.

### Navigation
- **Rail filters:** All / Active / Done as 48px rows on the blue shell, label left and mono count right. Hover washes white at 10%. The active tab is a paper tab with blue text and 700 weight, like a ticket slotted into the shell.
- **Rail foot:** quieter on-civic-2 links with kbd hints; Reset sits apart below a faint white rule with 16px of space above.
- **Mobile:** filters become an equal-width segmented track inside a civic-deep well; shortcuts and Reset become 44px icon buttons beside the wordmark.

### Now Serving Strip (signature)
A dark LED housing (panel) with 12px corners and 24px by 32px padding, in three columns: the counter (mono "Now serving" label over a 72px tall seven-segment SVG, 48px on phones), the served task (headline plus meta in panel-2, or late-on-panel when overdue, with "n more waiting"), and the Done, next button. When the number changes, the digits blank for 90ms, then segments light left to right (70ms per digit, 10ms per segment, 160ms ease-out fill), and the task text slides up 16px over 420ms. With nothing due it reads "---" and "Queue clear for today".

### Toast
Ink housing, 8px radius, lift shadow, bottom-centred, enters with a 16px rise over 320ms. Carries the deleted task name, an Undo button and a close icon.

## Do's and Don'ts

### Do:
- **Do** size every dimension from the 8px cell (4px half steps allowed for tight internal gaps).
- **Do** show urgency only through the five-step stub ramp, in its fixed order.
- **Do** set ticket numbers, counts and dates in Atkinson Hyperlegible Mono with tabular figures.
- **Do** keep destructive controls apart: Delete 16px from Edit, Reset below a rule at the rail foot.
- **Do** use the amber 3px focus ring with 2px offset on every interactive element, in both themes.
- **Do** use the house easing cubic-bezier(0.16, 1, 0.3, 1) for movement and collapse all motion under prefers-reduced-motion.
- **Do** redefine colour through the dark-theme token set rather than per-component overrides.

### Don't:
- **Don't** use LED red outside the counter's lit segments; lateness uses Overdue Red.
- **Don't** draw seven-segment digits anywhere but the Now counter.
- **Don't** fill the paper work area with signage blue; blue frames, paper holds the tasks.
- **Don't** give a resting surface the lift shadow.
- **Don't** add round checkboxes or a white list under a grey sidebar; tasks are tickets with stubs.
- **Don't** swap in generic interface fonts (Inter, Archivo and similar were rejected).
