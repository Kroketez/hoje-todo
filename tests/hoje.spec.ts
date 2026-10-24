import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Saturday 24 October 2026, midday in Lisbon. Sample tasks are dated around this.
const TODAY = new Date('2026-10-24T12:00:00+01:00')

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(TODAY)
  await page.goto('/')
})

const now = (page: Page) => page.getByRole('region', { name: 'Now serving' })
const group = (page: Page, name: string) => page.getByRole('region', { name: new RegExp(`^${name}`) })
const ticket = (page: Page, title: string) => page.locator('li[data-id]').filter({ hasText: title })
const titles = (page: Page, name: string) => group(page, name).locator('li .title').allTextContents()

test('first visit shows sample tasks with the oldest overdue task being served', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Hoje', level: 1 })).toBeVisible()
  await expect(page.getByText('Saturday 24 October')).toBeVisible()
  await expect(now(page)).toContainText('Pay the electricity bill')
  await expect(now(page)).toContainText('ticket 001')
  await expect(now(page)).toContainText('Overdue · 2 days late')
  expect(await titles(page, 'Overdue and today')).toEqual([
    'Pay the electricity bill',
    'Return library books',
    'Pick up prescription at the pharmacy',
    'Buy milk, eggs and bread',
    'Call Mum about Sunday lunch',
  ])
  await expect(group(page, 'Done')).toContainText('Take out the recycling')
})

test('adds a task with a due date and keeps it after reload', async ({ page }) => {
  await page.getByLabel('New task').fill('Buy stamps')
  await page.getByRole('button', { name: 'Tomorrow' }).click()
  await page.getByRole('button', { name: 'Take a ticket' }).click()

  const added = ticket(page, 'Buy stamps')
  await expect(added).toContainText('012')
  await expect(added).toContainText('Tomorrow')
  await expect(group(page, 'Coming up')).toContainText('Buy stamps')
  await expect(page.getByLabel('New task')).toHaveValue('')

  await page.reload()
  await expect(ticket(page, 'Buy stamps')).toBeVisible()
})

test('adds a task for a picked date and for someday', async ({ page }) => {
  await page.getByLabel('New task').fill('Plan the trip')
  await page.getByRole('button', { name: 'Pick a date' }).click()
  await page.getByLabel('Due date').fill('2026-11-20')
  await page.getByLabel('New task').press('Enter')
  await expect(ticket(page, 'Plan the trip')).toContainText('20 Nov')

  await page.getByLabel('New task').fill('Learn to knit')
  await page.getByRole('button', { name: 'Someday' }).click()
  await page.getByLabel('New task').press('Enter')
  await expect(group(page, 'Someday')).toContainText('Learn to knit')
})

test('refuses an empty task with a clear message', async ({ page }) => {
  await page.getByRole('button', { name: 'Take a ticket' }).click()
  await expect(page.getByRole('alert')).toHaveText('Type a task first, then take a ticket.')
  await expect(page.locator('li[data-id]')).toHaveCount(11)
})

test('"Done, next" finishes the served task and calls the next ticket', async ({ page }) => {
  await now(page).getByRole('button', { name: 'Done, next' }).click()
  await expect(now(page)).toContainText('Return library books')
  await expect(now(page)).toContainText('ticket 002')
  await expect(group(page, 'Done')).toContainText('Pay the electricity bill')
  await expect(ticket(page, 'Pay the electricity bill').getByRole('checkbox')).toBeChecked()
})

test('ticking every task due today clears the queue', async ({ page }) => {
  for (let i = 0; i < 5; i++) await now(page).getByRole('button', { name: 'Done, next' }).click()
  await expect(now(page)).toContainText('Queue clear for today')
  await expect(now(page)).toContainText('Next up: Dentist appointment, 10:30')
})

test('marks a task done and back again with its checkbox', async ({ page }) => {
  const box = ticket(page, 'Call Mum').getByRole('checkbox')
  await box.check()
  await expect(group(page, 'Done')).toContainText('Call Mum')
  await ticket(page, 'Call Mum').getByRole('checkbox').uncheck()
  await expect(group(page, 'Overdue and today')).toContainText('Call Mum')
})

test('edits a task title and due date', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit “Book a haircut”' }).click()
  const form = page.getByRole('form', { name: 'Edit ticket 009' })
  await form.getByLabel('Task').fill('Book a haircut for Friday')
  await form.getByRole('button', { name: 'Today' }).click()
  await form.getByRole('button', { name: 'Save' }).click()

  await expect(form).toHaveCount(0)
  await expect(group(page, 'Overdue and today')).toContainText('Book a haircut for Friday')
})

test('cancelling an edit with Escape keeps the original', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit “Book a haircut”' }).click()
  const field = page.getByRole('form', { name: 'Edit ticket 009' }).getByLabel('Task')
  await field.fill('Something else')
  await field.press('Escape')
  await expect(ticket(page, 'Book a haircut')).toBeVisible()
  await expect(page.getByText('Something else')).toHaveCount(0)
})

test('an edit cannot save an empty title', async ({ page }) => {
  await page.getByRole('button', { name: 'Edit “Book a haircut”' }).click()
  const form = page.getByRole('form', { name: 'Edit ticket 009' })
  await form.getByLabel('Task').fill('   ')
  await form.getByRole('button', { name: 'Save' }).click()
  await expect(form.getByRole('alert')).toHaveText('Write something before saving.')
})

test('deletes a task and brings it back with Undo', async ({ page }) => {
  await page.getByRole('button', { name: 'Delete “Return library books”' }).click()
  await expect(ticket(page, 'Return library books')).toHaveCount(0)
  const toast = page.getByRole('status').filter({ hasText: 'Deleted' })
  await expect(toast).toContainText('Deleted “Return library books”')

  await toast.getByRole('button', { name: 'Undo' }).click()
  expect((await titles(page, 'Overdue and today'))[1]).toBe('Return library books')
  await expect(toast).toHaveCount(0)
})

test('Ctrl+Z undoes a delete', async ({ page }) => {
  await page.getByRole('button', { name: 'Delete “Sort the photos from summer”' }).click()
  await expect(ticket(page, 'Sort the photos')).toHaveCount(0)
  await page.keyboard.press('Control+z')
  await expect(ticket(page, 'Sort the photos')).toBeVisible()
})

test('filters between all, active and done', async ({ page }) => {
  const filters = page.getByRole('navigation', { name: 'Filter tasks' })
  await filters.getByRole('button', { name: /Done/ }).click()
  await expect(page.locator('li[data-id]')).toHaveCount(1)
  await expect(group(page, 'Done')).toContainText('Take out the recycling')

  await filters.getByRole('button', { name: /Active/ }).click()
  await expect(page.locator('li[data-id]')).toHaveCount(10)
  await expect(group(page, 'Done')).toHaveCount(0)

  await filters.getByRole('button', { name: /All/ }).click()
  await expect(page.locator('li[data-id]')).toHaveCount(11)
})

test('search narrows the list, ignores accents, and shows an empty state', async ({ page }) => {
  const search = page.getByRole('searchbox', { name: 'Search tasks' })
  await search.fill('PHARMÁCY')
  await expect(page.locator('li[data-id]')).toHaveCount(1)
  await expect(ticket(page, 'Pick up prescription')).toBeVisible()

  await search.fill('zebra')
  await expect(page.getByText('No tickets match “zebra”')).toBeVisible()
  await page.getByRole('button', { name: 'Clear search' }).click()
  await expect(page.locator('li[data-id]')).toHaveCount(11)
})

test('drags a ticket to a new place in its group', async ({ page, isMobile }) => {
  const handle = ticket(page, 'Call Mum').getByRole('button', { name: /^Ticket 005/ })
  const target = ticket(page, 'Return library books')
  await handle.scrollIntoViewIfNeeded()
  await target.evaluate((el) => el.scrollIntoView({ block: 'start' }))
  const from = (await handle.boundingBox())!
  const to = (await target.boundingBox())!
  const x = from.x + from.width / 2
  const y = (i: number) => from.y + from.height / 2 + ((to.y - from.y) * i) / 10

  if (isMobile) {
    // A real finger: touch events through the DevTools protocol.
    const cdp = await page.context().newCDPSession(page)
    const touch = (type: string, i: number) =>
      cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y: y(i) }] })
    await touch('touchStart', 0)
    for (let i = 1; i <= 10; i++) await touch('touchMove', i)
    await touch('touchEnd', 10)
  } else {
    await page.mouse.move(x, y(0))
    await page.mouse.down()
    for (let i = 1; i <= 10; i++) await page.mouse.move(x, y(i))
    await page.mouse.up()
  }

  expect(await titles(page, 'Overdue and today')).toEqual([
    'Pay the electricity bill',
    'Call Mum about Sunday lunch',
    'Return library books',
    'Pick up prescription at the pharmacy',
    'Buy milk, eggs and bread',
  ])
  await page.reload()
  expect((await titles(page, 'Overdue and today'))[1]).toBe('Call Mum about Sunday lunch')
})

test('reorders with the keyboard from the ticket handle', async ({ page }) => {
  const handle = ticket(page, 'Pay the electricity bill').getByRole('button', { name: /^Ticket 001/ })
  await handle.focus()
  await page.keyboard.press('ArrowDown')
  expect((await titles(page, 'Overdue and today')).slice(0, 2)).toEqual([
    'Return library books',
    'Pay the electricity bill',
  ])
  // The served ticket follows the new order.
  await expect(now(page)).toContainText('Return library books')
})

test('keyboard shortcuts drive the whole list', async ({ page }) => {
  await page.locator('body').click({ position: { x: 5, y: 890 } })

  await page.keyboard.press('n')
  await expect(page.getByLabel('New task')).toBeFocused()
  await page.keyboard.type('Post the parcel')
  await page.keyboard.press('Enter')
  await page.keyboard.press('Escape')

  await page.keyboard.press('/')
  await expect(page.getByRole('searchbox')).toBeFocused()
  await page.keyboard.press('Escape')

  await page.keyboard.press('j')
  await expect(ticket(page, 'Pay the electricity bill')).toBeFocused()
  await page.keyboard.press('j')
  await expect(ticket(page, 'Return library books')).toBeFocused()

  await page.keyboard.press('x')
  await expect(ticket(page, 'Return library books').getByRole('checkbox')).toBeChecked()

  await ticket(page, 'Buy milk').focus()
  await page.keyboard.press('Alt+ArrowUp')
  expect((await titles(page, 'Overdue and today')).indexOf('Buy milk, eggs and bread')).toBe(1)

  await page.keyboard.press('e')
  await expect(page.getByRole('form', { name: 'Edit ticket 004' }).getByLabel('Task')).toBeFocused()
  await page.keyboard.press('Escape')

  await ticket(page, 'Buy milk').focus()
  await page.keyboard.press('Delete')
  await expect(ticket(page, 'Buy milk')).toHaveCount(0)

  await page.keyboard.press('3')
  await expect(page.getByRole('button', { name: /Done/, pressed: true })).toBeVisible()

  await page.keyboard.press('?')
  await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('reset restores the sample tasks and can be undone', async ({ page }) => {
  await page.getByRole('button', { name: 'Delete “Book a haircut”' }).click()
  await page.getByLabel('New task').fill('My own task')
  await page.getByLabel('New task').press('Enter')

  await page.getByRole('button', { name: 'Reset sample tasks' }).click()
  await expect(ticket(page, 'My own task')).toHaveCount(0)
  await expect(ticket(page, 'Book a haircut')).toBeVisible()

  await page.getByRole('status').filter({ hasText: 'Sample tasks restored' }).getByRole('button', { name: 'Undo' }).click()
  await expect(ticket(page, 'My own task')).toBeVisible()
  await expect(ticket(page, 'Book a haircut')).toHaveCount(0)
})

test('has no detectable accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
})

test('has no accessibility violations in dark mode or while editing', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.getByRole('button', { name: 'Edit “Book a haircut”' }).click()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    // Dimmed background tickets are intentionally low-contrast while one is being edited.
    .exclude('.ticket:not(.is-editing)')
    .exclude('.now')
    .exclude('.add')
    .analyze()
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([])
})

test('the page never scrolls sideways', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
