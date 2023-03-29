export default function Cuadro ({ id, letra, marcarCasilla }) {
  return (
    <li
      className={`-m-[3px] grid place-content-center font-medium cursor-pointer relative ${id % 2 !== 0 ? `border-[#009A8A] border${id}` : ''}`}
      onClick={marcarCasilla}
    >
      <span className={`text-[3.5em] sm:text-[4em] leading-[0px] mb-[7px] mr-[3px] pointer-events-none letra-${letra}`}>
        {letra}
      </span>
    </li>
  )
}
