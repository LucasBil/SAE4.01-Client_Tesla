import axios from 'axios';

const api = axios.create({
    baseURL: "https://api-tesla.azurewebsites.net/api"
});

export default api;