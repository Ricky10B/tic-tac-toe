import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableroYGanador from './TableroYGanador'

test('Creación del tablero por defecto', () => {
  const ganador = {
    letraGanadora: '',
    juegoGanado: false,
    animacionGanador: false
  }
  const tablero = Array.from({ length: 9 }).fill(null)
  const marcarCasilla = jest.fn()

  render(
    <TableroYGanador
      ganador={ganador}
      tablero={tablero}
      marcarCasilla={marcarCasilla}
    />
  )

  const ul = screen.getByRole('list')
  const section = ul.nextElementSibling
  expect(ul).not.toHaveClass('ganador')
  expect(ul).not.toHaveClass('ganador2')
  expect(section).not.toHaveClass('ganador')
  expect(section).not.toHaveClass('ganador2')
})

test('Letra X gano el juego', () => {
  const ganador = {
    letraGanadora: 'X',
    juegoGanado: true,
    animacionGanador: true
  }
  const tablero = Array.from({ length: 9 }).fill(null)
  const marcarCasilla = jest.fn()

  render(
    <TableroYGanador
      ganador={ganador}
      tablero={tablero}
      marcarCasilla={marcarCasilla}
    />
  )

  const ul = screen.getByRole('list')
  const section = ul.nextElementSibling
  expect(ul).toHaveClass('ganador')
  expect(ul).toHaveClass('ganador2')
  expect(section).toHaveClass('ganador')
  expect(section).toHaveClass('ganador2')
})

test('Letra X gano el juego', () => {
  const ganador = {
    letraGanadora: 'X',
    juegoGanado: true,
    animacionGanador: true
  }
  const tablero = ['O', null, 'O', 'X', 'X', 'X', 'X', 'O', 'O']
  const marcarCasilla = jest.fn()

  render(
    <TableroYGanador
      ganador={ganador}
      tablero={tablero}
      marcarCasilla={marcarCasilla}
    />
  )

  const ul = screen.getByRole('list')
  const section = ul.nextElementSibling
  const h3 = section.firstElementChild
  expect(h3).toHaveClass('letra-X')
  expect(h3).toHaveTextContent('X')

  const p = section.lastElementChild
  expect(p).toHaveTextContent('¡GANADOR!')
})

test('Letra O gano el juego', () => {
  const ganador = {
    letraGanadora: 'O',
    juegoGanado: true,
    animacionGanador: true
  }
  const tablero = ['O', 'O', 'O', 'X', null, null, 'X', 'O', null]
  const marcarCasilla = jest.fn()

  render(
    <TableroYGanador
      ganador={ganador}
      tablero={tablero}
      marcarCasilla={marcarCasilla}
    />
  )

  const ul = screen.getByRole('list')
  const section = ul.nextElementSibling
  const h3 = section.firstElementChild
  expect(h3).toHaveClass('letra-O')
  expect(h3).toHaveTextContent('O')

  const p = section.lastElementChild
  expect(p).toHaveTextContent('¡GANADOR!')
})

test('Empate en el juego, ninguna letra gana y se muestran las 2', () => {
  const ganador = {
    letraGanadora: 'XO',
    juegoGanado: true,
    animacionGanador: true
  }
  const tablero = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']
  const marcarCasilla = jest.fn()

  render(
    <TableroYGanador
      ganador={ganador}
      tablero={tablero}
      marcarCasilla={marcarCasilla}
    />
  )

  const ul = screen.getByRole('list')
  const section = ul.nextElementSibling
  const h3 = section.firstElementChild
  expect(h3).toHaveClass('letra-XO')
  expect(h3).toHaveTextContent('XO')

  const p = section.lastElementChild
  expect(p).toHaveTextContent('¡EMPATE!')
})

test('Marca el cuadro cuando se da click en él', async () => {
  const ganador = {
    letraGanadora: '',
    juegoGanado: false,
    animacionGanador: false
  }
  const tablero = Array.from({ length: 9 }).fill(null)
  const marcarCasilla = jest.fn()

  render(
    <TableroYGanador
      ganador={ganador}
      tablero={tablero}
      marcarCasilla={marcarCasilla}
    />
  )

  const liList = screen.getAllByRole('listitem')
  await userEvent.click(liList[0])
  await userEvent.click(liList[1])
  await userEvent.click(liList[2])
  expect(marcarCasilla).toHaveBeenCalledTimes(3)
})
