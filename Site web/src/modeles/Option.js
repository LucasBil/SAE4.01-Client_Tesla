import Motorisation from "./Motorisation";
import TypeOption from "./TypeOption";

class Option {
    idOption;
    idType;

    libelleOption;
    description;
    coutAdditionnel;
    detailsFonctionnalite;

    // Navigation properties
    optionToOPM;
    motorisationNavigation;
    typeOptionNavigation;
    vehiculesDemoNavigation;

    set idOption(idOption) { this.idOption = idOption; }
    set idType(idType) { this.idType = idType; }
    set libelleOption(libelleOption) { this.libelleOption = libelleOption; }
    set description(description) { this.description = description; }
    set coutAdditionnel(coutAdditionnel) { this.coutAdditionnel = coutAdditionnel; }
    set detailsFonctionnalite(detailsFonctionnalite) { this.detailsFonctionnalite = detailsFonctionnalite; }
    set optionToOPM(optionToOPM) { this.optionToOPM = optionToOPM; }
    set motorisationNavigation(motorisationNavigation) { this.motorisationNavigation = motorisationNavigation; }
    set typeOptionNavigation(typeOptionNavigation) { this.typeOptionNavigation = typeOptionNavigation; }
    set vehiculesDemoNavigation(vehiculesDemoNavigation) { this.vehiculesDemoNavigation = vehiculesDemoNavigation; }

    get idOption() { return this.idOption; }
    get idType() { return this.idType; }
    get libelleOption() { return this.libelleOption; }
    get description() { return this.description; }
    get coutAdditionnel() { return this.coutAdditionnel; }
    get detailsFonctionnalite() { return this.detailsFonctionnalite; }
    get optionToOPM() { return this.optionToOPM; }
    get motorisationNavigation() { return this.motorisationNavigation; }
    get typeOptionNavigation() { return this.typeOptionNavigation; }
    get vehiculesDemoNavigation() { return this.vehiculesDemoNavigation; }


    constructor(idOption, idType, libelleOption, description, coutAdditionnel, detailsFonctionnalite, optionToOPM, motorisationNavigation, typeOptionNavigation, vehiculesDemoNavigation) {
        this.idOption = idOption;
        this.idType = idType;
        this.libelleOption = libelleOption;
        this.description = description;
        this.coutAdditionnel = coutAdditionnel;
        this.detailsFonctionnalite = detailsFonctionnalite;
        this.optionToOPM = optionToOPM;
        this.motorisationNavigation = motorisationNavigation;
        this.typeOptionNavigation = typeOptionNavigation;
        this.vehiculesDemoNavigation = vehiculesDemoNavigation;
    }

    static fromJson(json) {
        return new Option(json.idOption, json.idType, json.libelleOption, json.description, json.coutAdditionnel, json.detailsFonctionnalite, json.optionToOPM, Motorisation.fromJson(json.motorisationNavigation), TypeOption.fromJson(json.typeOptionNavigation), json.vehiculesDemoNavigation);
    }

    static fromJsonArray(jsonArray) {
        if (jsonArray == null)
            return null;
        else
            return jsonArray.map(json => Option.fromJson(json));
    }
}

export default Option;