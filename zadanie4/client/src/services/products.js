import axios from 'axios';

const getBasePath = () => {
    return 'http://localhost:5000';
}

export const createProduct = async product => {
    return await axios.post(
        `${getBasePath()}/products`, product)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const updateProduct = async product => {
    return await axios.put(
        `${getBasePath()}/products/${product._id}`, product)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const getProducts = async () => {
    const { data: products } = await axios.get(
        `${getBasePath()}/products`);
    return products;
}

