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
}

export default new TypeOptionsController();