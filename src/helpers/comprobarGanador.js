export const comprobarGanador = (tablero) => {
  const posicionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < posicionesGanadoras.length; i++) {
    const [a, b, c] = posicionesGanadoras[i]
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return a
    }
  }

  return null
}
