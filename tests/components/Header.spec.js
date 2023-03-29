import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'

test('Iniciar el juego escogiendo la letra que comienza', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  await expect(page.getByText('Comenzar partida o seleccionar jugador')).toBeVisible()
  await expect(page.getByText('Turno de')).not.toBeVisible()

  const botonX = page.getByRole('button', { name: 'X -' })
  const botonO = page.getByRole('button', { name: 'O -' })

  await botonX.click()
  await botonO.click()

  await expect(botonX).toHaveClass(/seleccionado/)
  await expect(botonO).not.toHaveClass(/seleccionado/)
  await expect(page.getByText('Comenzar partida o seleccionar jugador')).not.toBeVisible()
  await expect(page.getByText('Turno de X')).toBeVisible()

  await page.getByText('Reiniciar partida').click()

  await botonO.click()
  await botonX.click()

  await expect(botonX).not.toHaveClass(/seleccionado/)
  await expect(botonO).toHaveClass(/seleccionado/)
  await expect(page.getByText('Comenzar partida o seleccionar jugador')).not.toBeVisible()
  await expect(page.getByText('Turno de O')).toBeVisible()
})
