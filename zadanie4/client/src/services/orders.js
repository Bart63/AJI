import axios from 'axios';
const getBasePath = () => {
    return 'http://localhost:5000';
}
export const getOrdersWithStatus = async statusId => {
    return await axios.get(
        `${getBasePath()}/orders/status/${statusId}`
    ).then(function (response) {

        return response.data;
    }).catch(function (error) {

        return error.response.data;
    });
}

export const updateOrder = async order => {
    return await axios.put(
        `${getBasePath()}/orders/${order._id}`, order)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}