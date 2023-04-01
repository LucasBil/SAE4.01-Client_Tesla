import axios from "axios";
import ControllerManager from "./ControllerManager";

class PhotosController extends ControllerManager {
    constructor() {
        super();
        this.name = "photos";
    }

    GetByName(name) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByName/${name}`);
    }

    GetByIdMotorisationANDOption(id_motorisation, id_option) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdMotoAndIdOpt/${id_motorisation}/${id_option}`);
    }

    GetByIdVariantes(id_variantes) {
        return axios.get(`${ControllerManager.baseURL}/${this.name}/ByIdVariante/${id_variantes}`)
    }
}

export default new PhotosController();