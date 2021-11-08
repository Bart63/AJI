import axios from 'axios';

const getBasePath = () => {
    return 'http://localhost:5000';
}

export const createProduct = async product => {
    
    
    await axios.post(
        `${getBasePath()}/products`, product)
        .then(function(response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function(error) {
            console.log(error.response.data);
            return error.response.data;   
          });

}

