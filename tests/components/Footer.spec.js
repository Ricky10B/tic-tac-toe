// @type-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test('Reiniciar el juego', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  await page.locator('li').first().click()
  await page.locator('li').last().click()
  await page.locator('li').nth(4).click()
  await page.locator('li:nth-child(2)').click()

  await page.getByRole('button', { name: 'Reiniciar partida' }).click()
  expect((await page.locator('li').allTextContents()).filter(liText => liText !== '')).toHaveLength(0)
})
