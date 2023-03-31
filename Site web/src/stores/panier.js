import { defineStore } from 'pinia'
import { ref } from "vue";

const panier = defineStore( 'panier', {
    state: () => {
        return {
            panier: ref(localStorage.panier)
        }
    },
    actions: {
        // Compte
        addPanier(article) {
            if(!this.panier)
            {
                this.panier = JSON.stringify([]);
                localStorage.panier = JSON.stringify([]);
            }
            console.log(JSON.parse(this.panier));
            this.panier = JSON.stringify(JSON.parse(this.panier).push(JSON.stringify(article)));
            localStorage.panier = JSON.stringify(JSON.parse(localStorage.panier).push(JSON.stringify(article)));
        },
        addMultiplePanier(article, number) {
            for ( i in number) {
                this.panier.push(JSON.stringify(article));
                localStorage.panier.push(JSON.stringify(article));
            }
        },
        getJsonPanier() {
            if(!this.panier) 
                return [];
            else
                return JSON.parse(this.panier);
        },
    },
})
export { panier }