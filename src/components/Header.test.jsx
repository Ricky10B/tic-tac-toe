import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

beforeEach(cleanup)

test('Botones por defecto y sin ganadas', () => {
  const turno = 'X'
  const jugando = false
  const juegoGanado = false
  const handleJugador = jest.fn()
  const ganadasX = 0
  const ganadasO = 0

  render(
    <Header
      turno={turno}
      jugando={jugando}
      juegoGanado={juegoGanado}
      handleJugador={handleJugador}
      ganadasX={ganadasX}
      ganadasO={ganadasO}
    />
  )

  const allButtons = screen.getAllByRole('button')
  const botonX = allButtons[0]
  const botonO = allButtons[1]
  expect(botonX).toHaveClass('seleccionado')
  expect(botonO).not.toHaveClass('seleccionado')
  expect(botonX.lastElementChild).toHaveTextContent('-')
  expect(botonO.lastElementChild).toHaveTextContent('-')
})

test('El jugador seleccionado es O', () => {
  const turno = 'O'
  const jugando = false
  const juegoGanado = false
  const handleJugador = jest.fn()
  const ganadasX = 0
  const ganadasO = 0

  render(
    <Header
      turno={turno}
      jugando={jugando}
      juegoGanado={juegoGanado}
      handleJugador={handleJugador}
      ganadasX={ganadasX}
      ganadasO={ganadasO}
    />
  )

  const allButtons = screen.getAllByRole('button')
  const botonX = allButtons[0]
  const botonO = allButtons[1]
  expect(botonX).not.toHaveClass('seleccionado')
  expect(botonO).toHaveClass('seleccionado')
})

test('Letra O ganandole a la X', () => {
  const turno = 'X'
  const jugando = false
  const juegoGanado = false
  const handleJugador = jest.fn()
  const ganadasX = 2
  const ganadasO = 3

  render(
    <Header
      turno={turno}
      jugando={jugando}
      juegoGanado={juegoGanado}
      handleJugador={handleJugador}
      ganadasX={ganadasX}
      ganadasO={ganadasO}
    />
  )

  const allButtons = screen.getAllByRole('button')
  const botonX = allButtons[0]
  const botonO = allButtons[1]
  expect(botonX.lastElementChild).toHaveTextContent('2')
  expect(botonO.lastElementChild).toHaveTextContent('3')
})

test('Ejecuta la función que maneja al jugador', async () => {
  const turno = 'X'
  const jugando = false
  const juegoGanado = false
  const handleJugador = jest.fn()
  const ganadasX = 0
  const ganadasO = 0

  render(
    <Header
      turno={turno}
      jugando={jugando}
      juegoGanado={juegoGanado}
      handleJugador={handleJugador}
      ganadasX={ganadasX}
      ganadasO={ganadasO}
    />
  )

  const allButtons = screen.getAllByRole('button')
  const botonX = allButtons[0]
  const botonO = allButtons[1]
  await userEvent.click(botonX)
  await userEvent.click(botonO)

  expect(handleJugador).toHaveBeenCalledTimes(2)
})
