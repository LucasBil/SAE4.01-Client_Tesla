import { defineStore } from 'pinia'
import { useLocalStorage, useStorage } from '@vueuse/core'

const store_panier = defineStore( 'store-panier', {
    state: () => {
        return {
            _panier: useStorage('panier', []),
        }
    },
    getters: {
        panier: (state) => state._panier,
        nbArticle: (state) => state._panier.length,
        total: (state) => {
            let total = 0;
            state._panier.forEach(article => {
                total += article.prix * article.quantite;
            });
            return Intl.NumberFormat('fr-FR', {  style: 'currency', currency: 'EUR' }).format(total);
        }
    },
    actions: {
        addPanier(article) {
            this._panier.push(article);
        },
        removePanier(article) {
            this._panier.splice(this._panier.indexOf(article), 1);
        }
    },
})
export { store_panier }