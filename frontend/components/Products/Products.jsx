import { Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react"
import { getProducts } from "../../lib/products";
import Product from "./Product";

export default function Products() {
    const [products, setProducts] = useState([])

    async function renderProducts() {
        setProducts(await getProducts());
        console.log(products)
        return products
    }

    useEffect(() => {
        renderProducts()
    }, [])

    return <Grid>
        {products.length < 1 ?
            <Text>No Products Found</Text> :
            products.map((product) => <Grid.Col sm={6} md={6} lg={3}>
                <Product name={product.name} id={product._id} />
            </Grid.Col>)}
    </Grid>
}