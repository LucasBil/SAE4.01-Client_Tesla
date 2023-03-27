import axios from "axios";
import ControllerManager from "./ControllerManager";

class ComptesController extends ControllerManager {
    constructor() {
        super();
        this.name = "comptes";
    }

    GetByEmail(email) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByEmail/${email}`);
    }

    GetIdDepartement(idDep) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdDepartement/${idDep}`);
    }

    GetByIdCB(idCB) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdCB/${idCB}`, {headers : {"Authorization" : `Bearer ${ControllerManager.token}`}});
    }

    GetByIdSepa(idSepa) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdSepa/${idSepa}`);
    }
}

export default new ComptesController();