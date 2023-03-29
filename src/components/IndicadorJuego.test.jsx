import { cleanup, render, screen } from '@testing-library/react'
import IndicadorJuego from './IndicadorJuego'

beforeEach(cleanup)

test('El juego no a comenzado', () => {
  const jugando = false
  const juegoGanado = false
  const turno = 'X'

  render(
    <IndicadorJuego
      jugando={jugando}
      juegoGanado={juegoGanado}
      turno={turno}
    />
  )

  const texto = screen.getByText('Comenzar partida o seleccionar jugador')
  expect(texto).toBeInTheDocument()
})

test('El juego a comenzado', () => {
  const jugando = true
  const juegoGanado = false
  const turno = 'O'

  render(
    <IndicadorJuego
      jugando={jugando}
      juegoGanado={juegoGanado}
      turno={turno}
    />
  )

  const texto = screen.getByText('Turno de')
  expect(texto).toBeInTheDocument()
  expect(texto.firstElementChild).toHaveTextContent(turno)
})

test('El juego tiene un ganador', () => {
  const jugando = false
  const juegoGanado = true
  const turno = 'X'

  render(
    <IndicadorJuego
      jugando={jugando}
      juegoGanado={juegoGanado}
      turno={turno}
    />
  )

  const texto = screen.getByText('Juego Finalizado')
  expect(texto).toBeInTheDocument()
})

test('El juego tiene un ganador y no muestra otros textos', () => {
  const jugando = true
  const juegoGanado = true
  const turno = 'O'

  render(
    <IndicadorJuego
      jugando={jugando}
      juegoGanado={juegoGanado}
      turno={turno}
    />
  )

  const texto = screen.getByText('Juego Finalizado')
  const textoNoVisible = screen.getByText('Comenzar partida o seleccionar jugador')
  expect(texto).toBeInTheDocument()
  expect(textoNoVisible).toHaveClass('hidden')
})
