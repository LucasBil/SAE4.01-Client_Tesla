import axios from "axios";
import ControllerManager from "./ControllerManager";

class CaracteristiquesController extends ControllerManager {
    constructor() {
        super();
        this.name = "caracteristiques";
    }

    GetByName(name) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByName/${name}`);
    }

    GetByIdMotorisation(id) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdMotorisation/${id}`);
    }
}

export default new CaracteristiquesController();