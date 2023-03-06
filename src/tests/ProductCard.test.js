import { render, screen } from "@testing-library/react"
import ProductCard from "../components/ProductsList/ProductCard"
import userEvent from "@testing-library/user-event"

const productMock = {
    id: "1",
    image: "https://picsum.photos/200",
    title: "Casaco",
    price: 100
}

const addToCartMock = jest.fn()

describe("ProductCard", () => {
    test('teste de renderição do card de produtos', () => {
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)
        const card = screen.getByText("Casaco")
        expect(card).toBeInTheDocument()
    })

    test('teste de renderição de imagem, título, preço e botão de compras', () => {
        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)

        //screen.logTestingPlaygroundURL()

        const image = screen.getByRole('img', {
            name: /casaco/i
        })
        const title = screen.getByRole('heading', {
            name: /casaco/i
        })
        const price = screen.getByText(/\$100\.00/i)
        const button = screen.getByRole('button', {
            name: /buy/i
        })

        expect(image).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(button).toBeInTheDocument()

    })

    test('garantir que quando o botão for clicado o produto seja adicionado ao carrinho', async () => { 
        const user = userEvent.setup()

        render(<ProductCard
            product={productMock}
            addToCart={addToCartMock}
        />)

        const button = screen.getByRole('button', {
            name: /buy/i
        })

        await user.click(button)

        expect(addToCartMock).toBeCalled()
    })
})
