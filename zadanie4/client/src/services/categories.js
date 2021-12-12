import axios from 'axios';

const getBasePath = () => {
    return 'http://localhost:5000';
}

export const getCategories = async () => {

    return await axios.get(
        `${getBasePath()}/categories`)
        .then(function (response) {

            return response.data;
        }).catch(function (error) {

            return error.response.data;
        });

}