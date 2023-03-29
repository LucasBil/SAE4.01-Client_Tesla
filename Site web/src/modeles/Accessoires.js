

class Accessoire {
    idAccessoire;

    nomAccessoire;
    prix;
    description;

    //Navigation properties

    set idAccessoire(idAccessoire) { this.idAccessoire = idAccessoire; }
    set nomAccessoire(nomAccessoire) { this.nomAccessoire = nomAccessoire; }
    set description(description) { this.description = description; }
    set prix(prix) { this.prix = prix; }

    get idAccessoire() { return this.idAccessoire; }
    get nomAccessoire() { return this.nomAccessoire; }
    get description() { return this.description; }
    get prix() { return this.prix; }

    constructor(idAccessoires, nomAccessoires, description, prix) {
        this.idAccessoires = idAccessoires;
        this.nomAccessoires = nomAccessoires;
        this.description = description;
        this.prix = prix;
    }

    
    static fromJson(json) {
        if(json == null)
            return null;
        else
            return new Accessoires(json.idAccessoires, json.nomAccessoires, json.description, json.prix);
    }

    static fromJsonArray(jsonArray) {
        if(jsonArray == null)
            return null;
        else
            return jsonArray.map(json => Accessoires.fromJson(json));
    }

}