import IndicadorJuego from './IndicadorJuego'

export default function Header ({
  turno,
  jugando,
  juegoGanado,
  handleJugador,
  ganadasX,
  ganadasO
}) {
  return (
    <header className='flex flex-col justify-center items-center'>
      <div className='flex justify-center flex-col sm:flex-row gap-2'>
        <button className={`flex justify-around w-48 py-1 font-bold text-lg rounded-md border border-solid border-[#3c4043] border-b-2 border-b-transparent ${turno === 'X' && 'seleccionado'}`} onClick={() => handleJugador('X')}>
          <span>X</span>
          <span className='text-[#9aa0a6]'>{ganadasX === 0 ? '-' : ganadasX}</span>
        </button>
        <button className={`flex justify-around w-48 py-1 font-bold text-lg rounded-md border border-solid border-[#3c4043] border-b-2 border-b-transparent ${turno === 'O' && 'seleccionado'}`} onClick={() => handleJugador('O')}>
          <span>O</span>
          <span className='text-[#9aa0a6]'>{ganadasO === 0 ? '-' : ganadasO}</span>
        </button>
      </div>
      <div>
        <IndicadorJuego
          jugando={jugando}
          juegoGanado={juegoGanado}
          turno={turno}
        />
      </div>
    </header>
  )
}
