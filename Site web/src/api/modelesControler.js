import api from './index.js';

const getAll = () => api.get("/modeles");
const getById = (id) => api.get(`/modeles/ById/${id}`);
const getByName = (name) => api.get(`/modeles/ByName/${name}`);

const post = (modele) => api.post("/modeles", modele);

const put = (modele) => api.put("/modeles", modele);

const remove = (id) => api.delete(`/modeles/${id}`);

const modelesControler = {
    getAll,
    getById,
    getByName,
    post,
    put,
    remove
};

export default modelesControler;