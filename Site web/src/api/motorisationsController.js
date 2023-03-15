import axios from "axios";
import ControllerManager from "./ControllerManager";

class MotorisationsController extends ControllerManager {
    constructor() {
        super();
        this.name = "motorisations";
    }

    GetByName(name) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByName/${name}`);
    }

    GetByIdModel(id) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdModele/${id}`);
    }
}

export default new MotorisationsController();