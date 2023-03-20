import axios from "axios";
import ControllerManager from "./ControllerManager";

class TypeOptionsController extends ControllerManager {
    constructor() {
        super();
        this.name = "typeoptions";
    }

    GetByName(name) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByName/${name}`);
    }

    GetByIdMotorisation(id){
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdMotorisation/${id}`);
    }
}

export default new TypeOptionsController();