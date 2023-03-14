import api from './index.js';

const getAll = () => api.get("/options");
const getById = (id) => api.get(`/options/ById/${id}`);
const getByLibelle = (libelle) => api.get(`/options/ByLibelle/${libelle}`);
const getByIdMotorisation = (id) => api.get(`/options/ByIdMotorisation/${id}`);

const post = (modele) => api.post("/options", modele);

const put = (modele) => api.put("/options", modele);

const remove = (id) => api.delete(`/options/${id}`);

const optionsController = {
    getAll,
    getById,
    getByIdMotorisation,
    getByLibelle,
    post,
    put,
    remove
};

export default optionsController;