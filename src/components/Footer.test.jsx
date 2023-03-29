import { cleanup, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from './Footer'

beforeEach(cleanup)

test.only('Footer', async () => {
  const reiniciarJuego = jest.fn()
  const { getByText } = render(
    <Footer
      reiniciarJuego={reiniciarJuego}
    />
  )

  const button = getByText(/Reiniciar partida/i)
  expect(button).toBeInTheDocument()
  await userEvent.click(button)
  expect(reiniciarJuego).toHaveBeenCalledTimes(1)
})
