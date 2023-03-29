import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test('Marcar la casilla si se da click', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const li = page.locator('li').first()
  await li.click()

  await expect(li).toHaveText('X')
  await li.click()
  await expect(li).toHaveText('X')
})
