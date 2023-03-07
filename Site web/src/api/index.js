import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.imgflip.com"
});

const getAllMemes = () => api.get("/get_memes");

const apis = {
    getAllMemes
};

export default apis;