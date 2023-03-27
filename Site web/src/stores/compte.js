import { defineStore } from 'pinia'
import { onMounted, ref } from "vue";
import router from '../router';

const compte = defineStore( 'compte', {
    state: () => {
        return {
            compte: ref(null),
            panier: ref([]),
        }
    },
    actions: {
        // Compte
        login(compte) {
            localStorage.compte = JSON.stringify(compte);
            this.compte = compte;
            router.push('/');
        },
        editCompte(compte) {
            localStorage.compte = JSON.stringify(compte);
            this.compte = compte;
            router.go(0);
        },
        logout() {
            localStorage.removeItem('compte');
            this.compte = null;
            router.push('/');
        },
        menu() {
            return {
                'name': (localStorage.compte)?JSON.parse(localStorage.compte).nomCompte : 'Compte',
                'links' : [
                    (localStorage.compte)?{
                        'name': 'Profile',
                        'link': '/profile'
                    }:{'hidden': 'true'},
                    (!localStorage.compte)?{
                        'name': 'Connection',
                        'link': '/login'
                    }:{'hidden': 'true'},
                    (!localStorage.compte)?{
                        'name': 'Créer un Compte',
                        'link': '/createaccount'
                    }:{'hidden': 'true'},
                    (localStorage.compte)?{
                        'name': 'Logout',
                        'event' : 'logout'
                    }:{'hidden': 'true'},
                ]
              }
        },
        getJsoncompte() {
            let response = JSON.parse(localStorage.compte);
            return response;
        },

        // Panier
        addPanier(produit) {
            let panier = this.getPanier();
            if(panier == null) {
                panier = [];
            }
            panier.push(produit);
            localStorage.panier = JSON.stringify(panier);
            this.panier = panier;
        },
        removePanier(produit) {
            let panier = this.getPanier();
            if(panier == null) {
                panier = [];
            }
            panier = panier.filter(function(value, index, arr){
                return value.id != produit.id;
            });
            localStorage.panier = JSON.stringify(panier);
            this.panier = panier;
        },
        getPanier() {
            let response = JSON.parse(localStorage.panier);
            return response;
        },
    },
})
export { compte }