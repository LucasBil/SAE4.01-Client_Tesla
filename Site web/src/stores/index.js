import api from '../api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const controller = defineStore( 'controller', () => {
    const AccessoiresController = api.AccessoiresController
    const ModelesController = api.ModelesController;
    const MotorisationsController = api.MotorisationsController;
    const OptionsController = api.OptionsController;
    const CaracteristiquesController = api.CaracteristiquesController;
    const PhotosController = api.PhotosController;
    const TypeOptionsController = api.TypeOptionsController;
    const ComptesController = api.ComptesController;
    const VehiculeDemonstrationsController = api.VehiculeDemonstrationsController;
    const VariantesController = api.VariantesController;
    return { AccessoiresController, ModelesController, MotorisationsController, OptionsController, CaracteristiquesController, PhotosController, TypeOptionsController, 
        ComptesController, VehiculeDemonstrationsController, VariantesController }}
)

const request = defineStore( 'request', {

    state: () => {
        return {
            requestState: true, // StatusState de la requête | false = requête en cours | true = requête terminée
            requestCode: '', // Code de la requête | 200 OK | 404 Not Found | 500 Internal Server Error
            requestError: false, // Erreur de la requête | false = pas d'erreur | true = erreur
            typeRequest: '', // Type de la requête | GET | POST | PUT | DELETE
            toastinfo: ref([]), // Toast info
        }
    },
    actions: {
        success(response) { // Requete terminée avec succès
            this.requestState = true;
            this.typeRequest = response.config.method;
            this.requestCode = `${response.status} ${response.statusText}`;
        },
        access(){ // Requete en cours | Clear les données
            this.requestState = false;
            this.requestError = false;
            this.requestCode = '';
            this.typeRequest = '';
        },
        pass() {
            this.requestState = true;
        },
        error(error) { // Requete terminée avec erreur
            this.requestState = true;
            this.requestError = true;
            this.typeRequest = 'ERROR CODE';
            this.requestCode = 'ERROR CODE';
            if(error.config)
                this.typeRequest = error.config.method;
            if(error.response)
                this.requestCode = `${error.response.status} ${error.response.statusText}`;
            // Add toast
            let index = this.toastinfo.length;
            this.toastinfo.push({id: index, type: `alert-error`, message: `${this.requestCode}`});
        },
        addAlert( type, message ) {
            let id = this.toastinfo.length;
            this.toastinfo.push({id, type, message });
        },
        removeAlert( alert ) {
            let index = this.toastinfo.indexOf(this.toastinfo.find(a => a.id == alert.id)); 
            this.toastinfo.splice(index, 1);
        },
        debug(){ // Debug
            console.log(`RequestState : ${this.requestState}`);
            console.log(`Error : ${this.requestError}`);
            console.log(`Type of request : ${this.typeRequest}`);
            console.log(`Request code result : ${this.requestCode}`);
        }
    },
});

export {request,controller};