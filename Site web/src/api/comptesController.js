import axios from "axios";
import ControllerManager from "./ControllerManager";

class ComptesController extends ControllerManager {
    constructor() {
        super();
        this.name = "comptes";
    }

    GetAll(token) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}`, {headers : {"Authorization" : `Bearer ${token}`}});  
    }

    Put(id, data, token) {
        return axios.put(`${ControllerManager.baseURL}/${this.name}/${id}`, data, {headers : {"Authorization" : `Bearer ${token}`}});
    }

    Delete(id, token) {
        return axios.delete(`${ControllerManager.baseURL}/${this.name}/${id}`, {headers : {"Authorization" : `Bearer ${token}`}});
    }

    GetByEmail(email) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByEmail/${email}`);
    }

    GetIdDepartement(idDep, token) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdDepartement/${idDep}`, {headers : {"Authorization" : `Bearer ${token}`}});
    }

    GetByIdCB(idCB,token) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdCB/${idCB}`, {headers : {"Authorization" : `Bearer ${token}`}});
    }

    GetByIdSepa(idSepa, token) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdSepa/${idSepa}`, {headers : {"Authorization" : `Bearer ${token}`}});
    }

    GetToken(user)
    {
        return axios.post(`${ControllerManager.baseURL}/login`, user)
    }
}

export default new ComptesController();