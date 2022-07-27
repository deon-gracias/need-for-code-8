import { Container, Grid, Group, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getCart } from "../../lib/cart";
import ProductCard from "../Products/Product";
import CartItem from "./CartItem";

export default function Cart() {
    const [cart, setCart] = useState([])

    async function renderCart() {
        const res = await getCart()
        if (res.data)
            setCart(res.data)
        console.log(cart)
    }

    useEffect(() => {
        renderCart()
        console.log(cart)
    }, [])

    return <Container>
        <Title mb="lg">Cart</Title>
        <Grid>
            {/* {cart.map((e) =>
                <Grid.Col lg={3} md={4} sm={6} key={e.productId}>
                    <CartItem name={e.name} />
                </Grid.Col>)} */}
        </Grid>
    </Container>
}