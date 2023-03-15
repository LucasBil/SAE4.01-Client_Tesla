import axios from "axios";
import ControllerManager from "./ControllerManager";

class ModelesController extends ControllerManager {
    constructor() {
        super();
        this.name = "modeles";
    }

    GetByName(name) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByName/${name}`);
    }
}

export default new ModelesController();