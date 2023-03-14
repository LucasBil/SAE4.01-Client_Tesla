import api from './index.js';

const getAll = () => api.get("/caracteristiques");
const getById = (id) => api.get(`/caracteristiques/ById/${id}`);
const getByName = (name) => api.get(`/caracteristiques/ByName/${name}`);
const getByIdMotorisation = (id) => api.get(`/caracteristiques/ByIdMotorisation/${id}`);

const post = (modele) => api.post("/caracteristiques", modele);

const put = (modele) => api.put("/caracteristiques", modele);

const remove = (id) => api.delete(`/caracteristiques/${id}`);

const caracteristiquesController = {
    getAll,
    getById,
    getByIdMotorisation,
    getByName,
    post,
    put,
    remove
};

export default caracteristiquesController;