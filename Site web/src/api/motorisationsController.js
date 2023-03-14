import api from './index.js';

const getAll = () => api.get("/motorisations");
const getById = (id) => api.get(`/motorisations/ById/${id}`);
const getByName = (name) => api.get(`/motorisations/ByName/${name}`);
const getByIdModel = (id) => api.get(`/motorisations/ByIdModele/${id}`);

const post = (modele) => api.post("/motorisations", modele);

const put = (modele) => api.put("/motorisations", modele);

const remove = (id) => api.delete(`/motorisations/${id}`);

const motorisationsController = {
    getAll,
    getById,
    getByIdModel,
    getByName,
    post,
    put,
    remove
};

export default motorisationsController;