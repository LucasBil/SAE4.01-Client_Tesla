import axios from "axios";
import ControllerManager from "./ControllerManager";

class ComptesController extends ControllerManager {
    static token = "";
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
        console.log(ComptesController.token);
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdCB/${idCB}`, {headers : {"Authorization" : `Bearer ${ComptesController.token}`}});
    }

    GetByIdSepa(idSepa) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdSepa/${idSepa}`);
    }

    GetToken(user)
    {
        axios.post(`${ControllerManager.baseURL}/login`, user)
        .then((response) => {
            ControllerManager.token = response.data.token;
            console.log(ControllerManager.token);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export default new ComptesController();