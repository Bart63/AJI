import axios from 'axios';

const getBasePath = () => {
    return 'http://localhost:5000';
}

export const createOrder = async order => {
    
    return await axios.post(
        `${getBasePath()}/orders`, order)
        .then(function(response) {
            
            return response.data;
        })
        .catch(function(error) {
            
            return error.response.data;   
          });

}