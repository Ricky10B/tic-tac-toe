export default function Footer ({ reiniciarJuego }) {
  return (
    <footer>
      <button
        className='text-[#14bdac] font-bold w-full h-full'
        onClick={reiniciarJuego}
      >
        Reiniciar partida
      </button>
    </footer>
  )
}
