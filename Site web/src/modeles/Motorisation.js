import Modele from './Modele.js';
import Option from './Option.js';

class Motorisation {
    idMotorisation;
    idModele;

    nomMotorisation;
    description;
    prix;
    classeEnergetique;

    // Navigation properties
    motorisationToOPM;
    modeleNavigation;
    optionsNavigation;
    vehiculesDemoNavigation;

    set idMotorisation(idMotorisation) { this.idMotorisation = idMotorisation; }
    set idModele(idModele) { this.idModele = idModele; }
    set nomMotorisation(nomMotorisation) { this.nomMotorisation = nomMotorisation; }
    set description(description) { this.description = description; }
    set prix(prix) { this.prix = prix; }
    set classeEnergetique(classeEnergetique) { this.classeEnergetique = classeEnergetique; }
    set motorisationToOPM(motorisationToOPM) { this.motorisationToOPM = motorisationToOPM; }
    set modeleNavigation(modeleNavigation) { this.modeleNavigation = modeleNavigation; }
    set optionsNavigation(optionsNavigation) { this.optionsNavigation = optionsNavigation; }
    set vehiculesDemoNavigation(vehiculesDemoNavigation) { this.vehiculesDemoNavigation = vehiculesDemoNavigation; }

    get idMotorisation() { return this.idMotorisation; }
    get idModele() { return this.idModele; }
    get nomMotorisation() { return this.nomMotorisation; }
    get description() { return this.description; }
    get prix() { return this.prix; }
    get classeEnergetique() { return this.classeEnergetique; }
    get motorisationToOPM() { return this.motorisationToOPM; }
    get modeleNavigation() { return this.modeleNavigation; }
    get optionsNavigation() { return this.optionsNavigation; }
    get vehiculesDemoNavigation() { return this.vehiculesDemoNavigation; }

    constructor(idMotorisation, idModele, nomMotorisation, description, prix, classeEnergetique, motorisationToOPM, modeleNavigation, optionsNavigation, vehiculesDemoNavigation) {
        this.idMotorisation = idMotorisation;
        this.idModele = idModele;
        this.nomMotorisation = nomMotorisation;
        this.description = description;
        this.prix = prix;
        this.classeEnergetique = classeEnergetique;
        this.motorisationToOPM = motorisationToOPM;
        this.modeleNavigation = modeleNavigation;
        this.optionsNavigation = optionsNavigation;
        this.vehiculesDemoNavigation = vehiculesDemoNavigation;
    }

    static fromJson(json) {
        if (json == null)
            return null;
        else
            return new Motorisation(json.idMotorisation, json.idModele, json.nomMotorisation, json.description, json.prix, json.classeEnergetique, json.motorisationToOPM, Modele.fromJson(json.modeleNavigation), Option.fromJson(json.optionsNavigation), json.vehiculesDemoNavigation);
    }

    static fromJsonArray(jsonArray) {
        if (jsonArray == null)
            return null;
        else
            return jsonArray.map(json => Motorisation.fromJson(json));
    }
}

export default Motorisation;