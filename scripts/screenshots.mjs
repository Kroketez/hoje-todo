// Regenerate the README screenshots in docs/.
// Usage: npm run screenshots   (starts its own dev server)
// Add --full to also save full-page captures to .impeccable/review/ for design review.
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { chromium, devices } from '@playwright/test'

const PORT = 4184
const URL = `http://localhost:${PORT}/`
const TODAY = new Date('2026-10-24T12:00:00+01:00')
const FULL = process.argv.includes('--full')

const server = spawn(`npx vite --port ${PORT} --strictPort`, { shell: true, stdio: 'ignore' })

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(URL)).ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('Dev server did not start')
}

async function shoot(browser, options, file, { dark = false, fullPage = false } = {}) {
  const context = await browser.newContext({
    ...options,
    reducedMotion: 'reduce',
    timezoneId: 'Europe/Lisbon',
    locale: 'en-GB',
    colorScheme: dark ? 'dark' : 'light',
  })
  const page = await context.newPage()
  await page.clock.setFixedTime(TODAY)
  await page.goto(URL)
  await page.locator('.now').waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: file, fullPage })
  await context.close()
  console.log('saved', file)
}

const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }
const phone = { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } }

try {
  await waitForServer()
  mkdirSync('docs', { recursive: true })
  const browser = await chromium.launch()
  await shoot(browser, desktop, 'docs/desktop.png')
  await shoot(browser, desktop, 'docs/desktop-dark.png', { dark: true })
  await shoot(browser, phone, 'docs/mobile.png')
  if (FULL) {
    mkdirSync('.impeccable/review', { recursive: true })
    await shoot(browser, desktop, '.impeccable/review/desktop.png', { fullPage: true })
    await shoot(browser, phone, '.impeccable/review/mobile.png', { fullPage: true })
    await shoot(browser, desktop, '.impeccable/review/desktop-dark.png', { dark: true, fullPage: true })
  }
  await browser.close()
} finally {
  server.kill()
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' })
}
