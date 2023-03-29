import { comprobarGanador } from './comprobarGanador'

test('Posiciones que no están en el juego', () => {
  // Más de las 9 posiciones del juego que tiene una dimensión de 3x3
  const tablero = [null, null, 'O', 'X', null, null, 'X', 'O', null, null, null, null, null]
  expect(comprobarGanador(tablero)).toBeNull()
})

test('No hay ganador en el juego', () => {
  const tablero = [null, null, 'O', 'X', null, null, 'X', 'O', null]
  expect(comprobarGanador(tablero)).toBeNull()
})

test('O gana el juego', () => {
  const tablero = ['O', 'O', 'O', 'X', null, null, 'X', 'O', null]
  expect(comprobarGanador(tablero)).toBe(0)
})

test('X gana el juego', () => {
  const tablero = ['O', null, 'O', 'X', 'X', 'X', 'X', 'O', 'O']
  expect(comprobarGanador(tablero)).toBe(3)
})

test('Empate en el juego', () => {
  const tablero = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X']
  expect(comprobarGanador(tablero)).toBeNull()
})

test('2 ganadores en el juego, debe tomar el primero', () => {
  const tablero = [null, null, null, 'O', 'O', 'O', 'X', 'X', 'X']
  const result = comprobarGanador(tablero)
  expect(result).toBe(3)
  expect(result).not.toBe(6)
})

test('Tablero de juego vacío', () => {
  const tablero = []
  expect(comprobarGanador(tablero)).toBeNull()
})
