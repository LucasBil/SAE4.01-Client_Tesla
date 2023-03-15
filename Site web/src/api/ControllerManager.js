import axios from 'axios';

class ControllerManager {
    static baseURL = "https://api-tesla.azurewebsites.net/api";
    name; // Voir l'accès à la propriété name dans le constructeur public/private

    constructor() {}

    set name(value) {
        this.name = value;
    }

    get name() {
        return this.name;
    }

    GetAll() {
        return axios.get(`${ControllerManager.baseURL}/${this.name}`);  
    }

    GetById(id) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ById/${id}`);
    }

    Post(data) {
        return axios.post(`${ControllerManager.baseURL}/${this.name}`, data);
    }

    Put(id, data) {
        return axios.put(`${ControllerManager.baseURL}/${this.name}/${id}`, data);
    }

    Delete(id) {
        return axios.delete(`${ControllerManager.baseURL}/${this.name}/${id}`);
    }
}

export default ControllerManager;