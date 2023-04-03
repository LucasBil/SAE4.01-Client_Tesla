import axios from "axios";
import ControllerManager from "./ControllerManager";

class AccesssoiresController extends ControllerManager {
    constructor() {
        super();
        this.name = "accessoires";
    }

    GetByName(name) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByNom/${name}`);
    }

}

export default new AccesssoiresController();