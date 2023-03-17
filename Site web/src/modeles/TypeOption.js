import Option from './Option.js';

class TypeOption {
    idType;
    nomType;
    obligatoire;

    // Navigation
    optionsNavigation;

    set idType(idType) { this.idType = idType; }
    set nomType(nomType) { this.nomType = nomType; }
    set obligatoire(obligatoire) { this.obligatoire = obligatoire; }
    set optionsNavigation(optionsNavigation) { this.optionsNavigation = optionsNavigation; }

    get idType() { return this.idType; }
    get nomType() { return this.nomType; }
    get obligatoire() { return this.obligatoire; }
    get optionsNavigation() { return this.optionsNavigation; }

    constructor(idType, nomType, obligatoire, optionsNavigation) {
        this.idType = idType;
        this.nomType = nomType;
        this.obligatoire = obligatoire;
        this.optionsNavigation = optionsNavigation;
    }

    static fromJson(json) {
        if (json == null)
            return null;
        else
            return new TypeOption(json.idType, json.nomType, json.obligatoire, Option.fromJson(json.optionsNavigation));
    }

    static fromJsonArray(jsonArray) {
        if (jsonArray == null)
            return null;
        else
            return jsonArray.map(json => TypeOption.fromJson(json));
    }

}

export default TypeOption;