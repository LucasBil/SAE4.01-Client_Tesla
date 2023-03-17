import Motorisation from './Motorisation.js';

class Caracteristique {
    #idCaracteristique;

    #nomCaracteristique;
    #description;
    #unite;

    // Navigation properties
    #motorisationNavigation;

    set idCaracteristique(idCaracteristique) { this.#idCaracteristique = idCaracteristique; }
    set nomCaracteristique(nomCaracteristique) { this.#nomCaracteristique = nomCaracteristique; }
    set description(description) { this.#description = description; }
    set unite(unite) { this.#unite = unite; }
    set motorisationNavigation(motorisationNavigation) { this.#motorisationNavigation = motorisationNavigation; }

    get idCaracteristique() { return this.#idCaracteristique; }
    get nomCaracteristique() { return this.#nomCaracteristique; }
    get description() { return this.#description; }
    get unite() { return this.#unite; }
    get motorisationNavigation() { return this.#motorisationNavigation; }

    constructor(idCaracteristique, nomCaracteristique, description, unite, motorisationNavigation) {
        this.#idCaracteristique = idCaracteristique;
        this.#nomCaracteristique = nomCaracteristique;
        this.#description = description;
        this.#unite = unite;
        this.#motorisationNavigation = motorisationNavigation;
    }

    static fromJson(json) {
        if(json == null)
            return null;
        else
            return new Caracteristique(json.idCaracteristique, json.nomCaracteristique, json.description, json.unite, Motorisation.fromJson(json.motorisationNavigation));
    }

    static fromJsonArray(jsonArray) {
        if(jsonArray == null)
            return null;
        else
            return jsonArray.map(json => Caracteristique.fromJson(json));
    }
}

export default Caracteristique;