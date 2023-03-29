import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Cuadro from './Cuadro'

afterEach(cleanup)

test('Renderizado con null como cuando se inicia el juego', () => {
  render(
    <Cuadro
      id={0}
      letra={null}
      marcarCasilla={() => {}}
    />
  )

  const span = screen.getByRole('listitem').firstElementChild
  expect(span).not.toHaveTextContent('X')
})

test('Renderizado cuando se ha marcado un cuadro con X y otro con O', () => {
  const componenteX = render(
    <Cuadro
      id={0}
      letra='X'
      marcarCasilla={() => {}}
    />
  )

  const letraX = componenteX.getByText('X')
  expect(letraX).toBeInTheDocument()

  cleanup()

  const componenteO = render(
    <Cuadro
      id={1}
      letra='O'
      marcarCasilla={() => {}}
    />
  )

  const letraO = componenteO.getByText('O')
  expect(letraO).toBeInTheDocument()
})

test('Al darle click se marca la casilla', async () => {
  const board = [null]
  const id = 0
  const marcarCasilla = jest.fn()

  render(
    <Cuadro
      id={id}
      letra={board[id]}
      marcarCasilla={marcarCasilla}
    />
  )

  const li = screen.getByRole('listitem')
  await userEvent.click(li)
  expect(marcarCasilla).toHaveBeenCalledTimes(1)
})
