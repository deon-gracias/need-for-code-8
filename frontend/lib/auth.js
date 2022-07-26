import axios from 'axios';

const getToken = () => {
    try {
        return localStorage.getItem('e-commerce')
    } catch (err) {
        return null
    }
}

const putToken = (token) => localStorage.setItem('e-commerce', token)

const logout = () => localStorage.removeItem('e-commerce')

const getUser = () => {
    const token = getToken();
    let user = null;
    if (!token) return null;

    axios
        .get("http://localhost:5000/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            user = res.data;
            console.log("User", user);
        })
        .catch((err) => {
            console.log("Get User Error", err.message);
        });

    console.log("User", user);
    return user;
}

const signUp = (username, email, password) => {
    axios.post('http://localhost:5000/users/signup', {
        name: username,
        email: email,
        password: password
    }).then((res) => {
        putToken(res.data.token);
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

const signIn = (email, password) => {
    axios.post('http://localhost:5000/users/signin', {
        email: email,
        password: password
    }).then((res) => {
        putToken(res.data.token);
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

export { getToken, putToken, getUser, signIn, signUp, logout }