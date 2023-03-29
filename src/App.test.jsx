import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

beforeEach(cleanup)

describe('Comenzando el juego', () => {
  let container
  beforeEach(() => {
    cleanup()
    const componente = render(<App />)
    container = componente.container
  })

  test('Renderiza el tablero con los valores por defecto', async () => {
    const buttons = container.querySelectorAll('header div button')
    const botonX = buttons[0]
    expect(botonX).toHaveClass('seleccionado')

    const allSpans = container.querySelectorAll('small span')
    const spanComenzarPartida = allSpans[0]
    const spanTurno = allSpans[1]
    const spanJuegoFinalizado = allSpans[2]

    expect(spanComenzarPartida).toHaveClass('block')
    expect(spanTurno).toHaveClass('hidden')
    expect(spanJuegoFinalizado).toHaveClass('hidden')
  })

  test('Comienza el juego la letra O', async () => {
    const buttons = container.querySelectorAll('header div button')
    const botonX = buttons[0]
    const botonO = buttons[1]
    await userEvent.click(botonO)
    expect(botonX).not.toHaveClass('seleccionado')
    expect(botonO).toHaveClass('seleccionado')

    const allSpans = container.querySelectorAll('small span')
    const spanComenzarPartida = allSpans[0]
    const spanTurno = allSpans[1]

    expect(spanComenzarPartida).toHaveClass('hidden')
    expect(spanTurno).toHaveClass('block')
    expect(spanTurno.firstElementChild).toHaveTextContent('O')
  })

  test('Comienza el juego la letra X', async () => {
    const buttons = container.querySelectorAll('header div button')
    const botonX = buttons[0]
    const botonO = buttons[1]
    await userEvent.click(botonX)
    expect(botonX).toHaveClass('seleccionado')
    expect(botonO).not.toHaveClass('seleccionado')

    const allSpans = container.querySelectorAll('small span')
    const spanComenzarPartida = allSpans[0]
    const spanTurno = allSpans[1]

    expect(spanComenzarPartida).toHaveClass('hidden')
    expect(spanTurno).toHaveClass('block')
    expect(spanTurno.firstElementChild).toHaveTextContent('X')
  })

  test('El juego se inica al darle click a un cuadro, y se muestra la letra correspondiente', async () => {
    const listLi = screen.getAllByRole('listitem')
    const li = listLi[0]
    await userEvent.click(li)

    expect(li).toHaveTextContent('X')

    const buttons = container.querySelectorAll('header div button')
    const botonX = buttons[0]
    const botonO = buttons[1]
    expect(botonX).not.toHaveClass('seleccionado')
    expect(botonO).toHaveClass('seleccionado')

    const allSpans = container.querySelectorAll('small span')
    const spanComenzarPartida = allSpans[0]
    const spanTurno = allSpans[1]

    expect(spanComenzarPartida).toHaveClass('hidden')
    expect(spanTurno).toHaveClass('block')
    expect(spanTurno.firstElementChild).toHaveTextContent('O')
  })

  test('Seleccionar la letra al comenzar el juego', async () => {
    const listButtons = container.querySelectorAll('header div button')
    const botonX = listButtons[0]
    const botonO = listButtons[1]
    await userEvent.click(botonX)
    await userEvent.click(botonO)

    expect(botonX).toHaveClass('seleccionado')
    expect(botonO).not.toHaveClass('seleccionado')

    const listSpan = container.querySelectorAll('header div small span')
    expect(listSpan[0]).toHaveClass('hidden')
    expect(listSpan[1]).toHaveClass('block')
    expect(listSpan[2]).toHaveClass('hidden')
    expect(listSpan[1].firstElementChild).toHaveTextContent('X')
  })
})

test('No marcar la casilla si ya se ocupó', async () => {
  render(<App />)

  const ul = screen.getByRole('list')
  const li = ul.firstElementChild

  await userEvent.click(li)
  await userEvent.click(li)
  expect(li.firstElementChild).toHaveTextContent('X')
})

describe('Victorias en el juego', () => {
  jest.useFakeTimers({ advanceTimers: true })
  let container
  beforeEach(() => {
    cleanup()
    const componente = render(<App />)
    container = componente.container
  })

  test('La X gana el juego', async () => {
    const ul = screen.getByRole('list')
    expect(ul).not.toHaveClass('ganador')
    expect(ul).not.toHaveClass('ganador2')

    const section = ul.nextElementSibling
    expect(section).not.toHaveClass('ganador')
    expect(section).not.toHaveClass('ganador2')

    const posicionesGanadorasDeX = [0, 4, 1, 3, 2]
    const listLi = screen.getAllByRole('listitem')

    for (const i of posicionesGanadorasDeX) {
      await userEvent.click(listLi[i])
    }

    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(ul).toHaveClass('ganador')
    expect(section).toHaveClass('ganador')

    expect(ul).toHaveClass('ganador2')
    expect(section).toHaveClass('ganador2')
    expect(section.firstElementChild).toHaveTextContent('X')
    expect(section.lastElementChild).toHaveTextContent('¡GANADOR!')

    const listButtons = container.querySelectorAll('header div button')
    const botonX = listButtons[0]
    const botonO = listButtons[1]
    expect(botonX.lastElementChild).toHaveTextContent('1')
    expect(botonO.lastElementChild).toHaveTextContent('-')
  })

  test('La O gana el juego', async () => {
    const ul = screen.getByRole('list')
    expect(ul).not.toHaveClass('ganador')
    expect(ul).not.toHaveClass('ganador2')

    const section = ul.nextElementSibling
    expect(section).not.toHaveClass('ganador')
    expect(section).not.toHaveClass('ganador2')

    const posicionesGanadorasDeO = [8, 0, 4, 1, 3, 2]
    const listLi = screen.getAllByRole('listitem')

    for (const i of posicionesGanadorasDeO) {
      await userEvent.click(listLi[i])
    }

    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(ul).toHaveClass('ganador')
    expect(section).toHaveClass('ganador')

    expect(ul).toHaveClass('ganador2')
    expect(section).toHaveClass('ganador2')
    expect(section.firstElementChild).toHaveTextContent('O')
    expect(section.lastElementChild).toHaveTextContent('¡GANADOR!')

    const listButtons = container.querySelectorAll('header div button')
    const botonX = listButtons[0]
    const botonO = listButtons[1]
    expect(botonX.lastElementChild).toHaveTextContent('-')
    expect(botonO.lastElementChild).toHaveTextContent('1')
  })

  test('Empate en el juego', async () => {
    const ul = screen.getByRole('list')
    const section = ul.nextElementSibling
    const posicionesEmpateJuego = [0, 2, 1, 3, 5, 4, 6, 7, 8]
    const listLi = screen.getAllByRole('listitem')

    for (const i of posicionesEmpateJuego) {
      await userEvent.click(listLi[i])
    }

    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(ul).toHaveClass('ganador')
    expect(section).toHaveClass('ganador')

    expect(ul).toHaveClass('ganador2')
    expect(section).toHaveClass('ganador2')
    expect(section.firstElementChild).toHaveTextContent('XO')
    expect(section.lastElementChild).toHaveTextContent('¡EMPATE!')

    const listButtons = container.querySelectorAll('header div button')
    const botonX = listButtons[0]
    const botonO = listButtons[1]
    expect(botonX.lastElementChild).toHaveTextContent('-')
    expect(botonO.lastElementChild).toHaveTextContent('-')
  })
})

test('Reiniciar el juego', async () => {
  const { container } = render(<App />)
  const listLi = screen.getAllByRole('listitem')
  const posicionesMarcadas = [0, 4, 8, 2, 7]
  for (const i of posicionesMarcadas) {
    await userEvent.click(listLi[i])
  }

  const botonReiniciarJuego = container.querySelector('footer button')
  await userEvent.click(botonReiniciarJuego)
  expect(listLi.every(li => li.textContent === '')).toBeTruthy()

  const buttons = container.querySelectorAll('header div button')
  const botonX = buttons[0]
  const botonO = buttons[1]
  expect(botonX).toHaveClass('seleccionado')
  expect(botonO).not.toHaveClass('seleccionado')

  const allSpans = container.querySelectorAll('small span')
  const spanComenzarPartida = allSpans[0]
  const spanTurno = allSpans[1]

  expect(spanComenzarPartida).toHaveClass('block')
  expect(spanTurno).toHaveClass('hidden')
})
