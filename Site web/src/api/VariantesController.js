import axios from "axios";
import ControllerManager from "./ControllerManager";

class VariantesController extends ControllerManager {
    constructor () {
        super();
        this.name = "variantes";
    }
}

export default new VariantesController();