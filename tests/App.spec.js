// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(LOCALHOST_URL)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test('Empezar el juego marcando una casilla y reiniciándolo', async ({ page }) => {
  const primerLi = page.locator('li').first()
  await primerLi.click()

  await expect(primerLi).toHaveText('X')
  await expect(page.getByText('Turno de O')).toBeVisible()
  await expect(page.getByText('Comenzar partida o seleccionar jugador')).not.toBeVisible()

  await page.getByRole('button', { name: 'Reiniciar partida' }).click()

  await expect(page.getByText('Turno de')).not.toBeVisible()
  await expect(page.getByText('Comenzar partida o seleccionar jugador')).toBeVisible()
})

test('Empezar el juego seleccionando letra', async ({ page }) => {
  const botonO = page.getByRole('button', { name: 'O -' })
  const botonX = page.getByRole('button', { name: 'X -' })

  await botonO.click()
  await botonX.click()

  await expect(botonO).toHaveClass(/seleccionado/)
  await expect(botonX).not.toHaveClass(/seleccionado/)

  await page.locator('li').first().click()

  await expect(page.getByText('Turno de X')).toBeVisible()
  await expect(page.getByText('Comenzar partida o seleccionar jugador')).not.toBeVisible()
})

test('La partida la gana la X 2 a 1', async ({ page }) => {
  const todasLasPosiciones = [
    [1, 5, 2, 8, 3],
    [1, 2, 9, 5, 7, 8],
    [3, 1, 6, 5, 9]
  ]

  for (const listaPosiciones of todasLasPosiciones) {
    for (const i of listaPosiciones) {
      await page.locator(`li:nth-child(${i})`).click()
    }

    await page.getByText('Reiniciar partida').click()
  }

  await expect(page.getByText('Comenzar partida o seleccionar jugador')).toBeVisible()
  await expect(page.getByRole('button', { name: 'X 2' })).toHaveClass(/seleccionado/)

  await expect(page.getByRole('button', { name: 'X 2' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'O 1' })).toBeVisible()
})
