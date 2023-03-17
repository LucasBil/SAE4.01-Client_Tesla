class Modele {
    // Private
    idModele;
    nomModele;
    essayable;
    photo;

    get idModele() { return this.idModele; }
    get nomModele() { return this.nomModele; }
    get essayable() { return this.essayable; }
    get photo() { return this.photo; }

    set idModele(idModele) { this.idModele = idModele; }
    set nomModele(nomModele) { this.nomModele = nomModele; }
    set essayable(essayable) { this.essayable = essayable; }
    set photo(photo) { this.photo = photo; }

    constructor(idModele, nomModele, essayable, photo) {
        this.idModele = idModele;
        this.nomModele = nomModele;
        this.essayable = essayable;
        this.photo = photo;
    }

    static fromJson(json) {
        if(json == null)
            return null;
        else
            return new Modele(json.idModele, json.nomModele, json.essayable, json.photo);
    }

    static fromJsonArray(jsonArray) {
        if(jsonArray == null)
            return null;
        else
            return jsonArray.map(json => Modele.fromJson(json));
    }

    CarouselItem() {
        return { title: this.nomModele, link: `http://${this.photo.urlModel[0]}`}
    }

}

export default Modele;