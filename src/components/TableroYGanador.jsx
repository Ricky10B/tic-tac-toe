import Cuadro from './Cuadro'

export default function TableroYGanador ({ ganador, tablero, marcarCasilla }) {
  return (
    <>
      <ul className={`${ganador.juegoGanado && 'ganador'} ${ganador.animacionGanador && 'ganador2'} grid grid-cols-3 w-3/4 sm:w-[45%] h-[80%] sm:h-[85%]`}>
        {tablero.map((letra, i) => (
          <Cuadro
            key={i}
            id={i}
            letra={letra}
            marcarCasilla={() => marcarCasilla(i)}
          />
        ))}
      </ul>
      <section id='cuadroGanador' className={`hidden flex-col justify-center items-center ${ganador.juegoGanado && 'ganador'} ${ganador.animacionGanador && 'ganador2'}`}>
        <h3 className={`text-[9.5em] leading-[1em] letra-${ganador.letraGanadora}`}>{ganador.letraGanadora}</h3>
        <p className='text-4xl sm:text-5xl letra-X font-medium'>
          {ganador.letraGanadora.length === 1 ? '¡GANADOR!' : '¡EMPATE!'}
        </p>
      </section>
    </>
  )
}
