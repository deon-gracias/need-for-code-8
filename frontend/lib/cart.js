import axios from "axios"
import { getToken } from "./auth"

const addToCart = async (productId, quantity = 1) => {
    const token = getToken()

    if (!token) return;

    console.log(productId, quantity, token)

    axios.post("http://localhost:5000/carts", { quantity, productId }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        let cart = res.data
        console.log(cart)
    })
}

const getCart = async () => {
    const token = getToken()

    if (!token) return;

    return await axios.get("http://localhost:5000/carts", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export { addToCart, getCart }