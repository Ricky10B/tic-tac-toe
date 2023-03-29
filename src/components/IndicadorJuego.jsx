export default function IndicadorJuego ({ jugando, juegoGanado, turno }) {
  return (
    <small className='text-[#9aa0a6]'>
      <span className={!jugando && !juegoGanado ? 'block' : 'hidden'}>
        Comenzar partida o seleccionar jugador
      </span>
      <span className={jugando && !juegoGanado ? 'block' : 'hidden'}>
        Turno de <strong>{turno}</strong>
      </span>
      <span className={juegoGanado ? 'block' : 'hidden'}>
        Juego Finalizado
      </span>
    </small>
  )
}
