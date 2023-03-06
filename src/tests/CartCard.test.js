import { render, screen } from "@testing-library/react"
import CartCard from "../components/Cart/CartCard"
import userEvent from "@testing-library/user-event"

const productMock = {
    image: "https://picsum.photos/200",
    title: "Casaco",
    price: 100,
    quantity: 1
}
const removeFromCartMock = jest.fn()

describe("Cart Card", () => {
    test('teste de renderição de imagem, título, preço, quantidade e botão de remover produto', () => {
        
        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock}
        />)

        //screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /casaco/i
        })
        const title = screen.getByRole('heading', {
            name: /casaco/i
        })
        const price = screen.getByText(/\$100\.00/i)
        const quantity = screen.getByText(/x1/i)

        const button = screen.getByRole('button', {
            name: /remove/i
        })

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(quantity).toBeInTheDocument()
        expect(button).toBeInTheDocument()

    })

    test('garantir que quando o botão for clicado o produto seja removido do carrinho', async () => { 
        const user = userEvent.setup()

        render(<CartCard
            product={productMock}
            removeFromCart={removeFromCartMock}
        />)

        const button = screen.getByRole('button', {
            name: /remove/i
        })

        await user.click(button)

        expect(removeFromCartMock).toBeCalled()
    })
})

