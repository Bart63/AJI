import axios from 'axios';

const getBasePath = () => {
    return 'http://localhost:5000';
}

export const createProduct = async product => {
    
    return await axios.post(
        `${getBasePath()}/products`, product)
        .then(function(response) {
            
            return response.data;
        })
        .catch(function(error) {
            
            return error.response.data;   
          });

}

