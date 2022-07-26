import axios from 'axios';

const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/products")

    return res.status === 200 ? res.data : null;
}

export { getProducts };