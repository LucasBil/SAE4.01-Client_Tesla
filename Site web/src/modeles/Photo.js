class Photo {
    idPhoto;
    nomCouleur;
    codeHexa;
    url;

    // Navigation properties
    photoToOPM;
    
    get idPhoto() { return this.idPhoto; }
    get nomCouleur() { return this.nomCouleur; }
    get codeHexa() { return this.codeHexa; }
    get photoToOPM() { return this.photoToOPM; }
    get url() { return this.url; }

    set idPhoto(idPhoto) { this.idPhoto = idPhoto; }
    set nomCouleur(nomCouleur) { this.nomCouleur = nomCouleur; }
    set codeHexa(codeHexa) { this.codeHexa = codeHexa; }
    set photoToOPM(photoToOPM) { this.photoToOPM = photoToOPM; }
    set url(url) { this.url = url; }

    constructor(idPhoto, nomCouleur, codeHexa, photoToOPM, url) {
        this.idPhoto = idPhoto;
        this.nomCouleur = nomCouleur;
        this.codeHexa = codeHexa;
        this.photoToOPM = photoToOPM;
        this.url = url;
    }

    static fromJson(json) {
        return new Photo(json.idPhoto, json.nomCouleur, json.codeHexa, json.photoToOPM, json.url);
    }

    static fromJsonArray(jsonArray) {
        if (jsonArray == null)
            return null;
        else
            return jsonArray.map(json => Photo.fromJson(json));
    }
}

export default Photo;