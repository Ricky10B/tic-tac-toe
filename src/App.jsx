import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import TableroYGanador from './components/TableroYGanador'
import { comprobarGanador } from './helpers/comprobarGanador'

export default function App () {
  const [juego, setJuego] = useState({
    tablero: Array.from({ length: 9 }).fill(null),
    jugando: false,
    turno: 'X',
    X: 0,
    O: 0
  })

  const [ganador, setGanador] = useState({
    letraGanadora: '',
    juegoGanado: false,
    animacionGanador: false
  })

  const verificarGanador = (tablero) => {
    const posicion = comprobarGanador(tablero)

    if (posicion !== null) {
      const letraGanadora = tablero[posicion]
      setGanador({
        ...ganador,
        letraGanadora,
        juegoGanado: true
      })

      // Incrementa las veces ganadas del jugador que ha ganado
      // dependiendo si es X o O
      if (letraGanadora === 'X') {
        setJuego(prevState => ({
          ...prevState,
          turno: tablero[posicion],
          X: prevState.X + 1
        }))
      } else {
        setJuego(prevState => ({
          ...prevState,
          turno: tablero[posicion],
          O: prevState.O + 1
        }))
      }

      setTimeout(() => {
        setGanador(prevState => ({
          ...prevState,
          animacionGanador: true
        }))
      }, 1500)
    }

    if (!tablero.includes(null) && posicion === null) {
      setGanador({
        ...ganador,
        juegoGanado: true,
        letraGanadora: 'XO'
      })

      setTimeout(() => {
        setGanador(prevState => ({
          ...prevState,
          animacionGanador: true
        }))
      }, 1500)
    }
  }

  const handleJugador = (jugadorSeleccionado) => {
    if (juego.jugando) return

    setJuego({
      ...juego,
      jugando: true,
      turno: jugadorSeleccionado
    })
  }

  const marcarCasilla = (id) => {
    if (ganador.juegoGanado || juego.tablero[id]) return

    const nuevoTablero = juego.tablero.map((letra, indice) => {
      if (indice === id) return juego.turno
      return letra
    })

    setJuego({
      ...juego,
      jugando: true,
      tablero: nuevoTablero,
      turno: juego.turno === 'X' ? 'O' : 'X'
    })
    verificarGanador(nuevoTablero)
  }

  const reiniciarJuego = () => {
    setJuego(prevState => ({
      ...prevState,
      tablero: Array.from({ length: 9 }).fill(null),
      jugando: false,
      turno: 'X'
    }))

    setGanador({
      letraGanadora: '',
      juegoGanado: false,
      animacionGanador: false
    })
  }

  return (
    <main className='w-full h-screen max-w-screen-md mx-auto flex justify-center items-center'>
      <section className='border border-[#3c4043] rounded w-[90%] sm:w-[80%] md:w-[400px] h-[60%] sm:h-[55%] md:h-[400px] grid grid-rows-[minmax(5em,_8em)_auto_2em] sm:grid-rows-[5em_auto_2em]'>
        <Header
          turno={juego.turno}
          jugando={juego.jugando}
          juegoGanado={ganador.juegoGanado}
          handleJugador={handleJugador}
          ganadasX={juego.X}
          ganadasO={juego.O}
        />
        <section className='bg-[#14bdac]'>
          <div className='h-full flex justify-center items-center'>
            <TableroYGanador
              ganador={ganador}
              marcarCasilla={marcarCasilla}
              tablero={juego.tablero}
            />
          </div>
        </section>
        <Footer reiniciarJuego={reiniciarJuego} />
      </section>
    </main>
  )
}
