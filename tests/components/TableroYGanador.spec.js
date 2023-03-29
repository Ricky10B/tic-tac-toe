import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST_URL)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test('X gana el juego', async ({ page }) => {
  await page.locator('li').first().click()
  await page.locator('li:nth-child(5)').click()
  await page.locator('li:nth-child(2)').click()
  await page.locator('li:nth-child(6)').click()
  await page.locator('li:nth-child(3)').click()
  await expect(page.getByText('Juego Finalizado')).toBeVisible()

  await page.waitForTimeout(1500)
  await expect(page.getByRole('list')).not.toBeVisible()
  await expect(page.getByText('X¡GANADOR!')).toBeVisible()
  await expect(page.getByText('O¡GANADOR!')).not.toBeVisible()
})

test('O gana el juego', async ({ page }) => {
  await page.locator('li').last().click()
  await page.locator('li').first().click()
  await page.locator('li:nth-child(8)').click()
  await page.locator('li:nth-child(2)').click()
  await page.locator('li:nth-child(6)').click()
  await page.locator('li:nth-child(3)').click()
  await expect(page.getByText('Juego Finalizado')).toBeVisible()

  await page.waitForTimeout(1500)
  await expect(page.getByRole('list')).not.toBeVisible()
  await expect(page.getByText('O¡GANADOR!')).toBeVisible()
  await expect(page.getByText('X¡GANADOR!')).not.toBeVisible()
})

test('Empate en el juego', async ({ page }) => {
  await page.locator('li:nth-child(1)').click()
  await page.locator('li:nth-child(3)').click()
  await page.locator('li:nth-child(2)').click()
  await page.locator('li:nth-child(4)').click()
  await page.locator('li:nth-child(6)').click()
  await page.locator('li:nth-child(5)').click()
  await page.locator('li:nth-child(7)').click()
  await page.locator('li:nth-child(8)').click()
  await page.locator('li:nth-child(9)').click()
  await expect(page.getByText('Juego Finalizado')).toBeVisible()

  await page.waitForTimeout(1500)
  await expect(page.getByRole('list')).not.toBeVisible()
  await expect(page.getByText('¡EMPATE!')).toBeVisible()
})
