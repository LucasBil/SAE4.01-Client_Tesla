import axios from "axios";
import ControllerManager from "./ControllerManager";

class MotorisationsController extends ControllerManager {
    constructor() {
        super();
        this.name = "options";
    }

    GetByLibelle(libelle) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByLibelle/${libelle}`);
    }

    GetByIdMotorisation(id) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdMotorisation/${id}`);
    }
}

export default new MotorisationsController();