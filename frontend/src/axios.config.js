import axios from 'axios';
import Cookies from 'js-cookie';


const csrftoken = Cookies.get('csrfttoken');
console.log('este es mi token:' + csrftoken)
const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

instance.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error);
        return Promise.reject(error);
    }   
);

export default instance;