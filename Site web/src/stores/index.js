import api from '../api'
import { defineStore } from 'pinia'

const controller = defineStore( 'controller', () => {
    const ModelesController = api.ModelesController;
    const MotorisationsController = api.MotorisationsController;
    const OptionsController = api.OptionsController;
    const CaracteristiquesController = api.CaracteristiquesController;
    const PhotosController = api.PhotosController;
    const TypeOptionsController = api.TypeOptionsController;
    const ComptesController = api.ComptesController;
    return { ModelesController, MotorisationsController, OptionsController, CaracteristiquesController, PhotosController, TypeOptionsController, ComptesController }}
)

const request = defineStore( 'request', {

    state: () => {
        return {
            requestState: true, // StatusState de la requête | false = requête en cours | true = requête terminée
            requestCode: '', // Code de la requête | 200 OK | 404 Not Found | 500 Internal Server Error
            requestError: false, // Erreur de la requête | false = pas d'erreur | true = erreur
            typeRequest: '', // Type de la requête | GET | POST | PUT | DELETE
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
        error(error) { // Requete terminée avec erreur
            this.requestState = true;
            this.requestError = true;
            this.typeRequest = error.config.method;
            this.requestCode = `${error.response.status} ${error.response.statusText}`;
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