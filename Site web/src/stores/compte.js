import { defineStore } from 'pinia'
import { onMounted, ref } from "vue";
import { useLocalStorage, useStorage } from '@vueuse/core'
import router from '../router';

const compte = defineStore( 'compte', {
    state: () => {
        return {
            compte: ref(localStorage.compte),
            token : ref(localStorage.token),
        }
    },
    actions: {
        // Compte
        login(compte, token) {
            this.compte = JSON.stringify(compte);
            this.token = token;
            localStorage.token = token;
            localStorage.compte = JSON.stringify(compte);
            router.push('/');
        },
        editCompte(compte) {
            localStorage.compte = JSON.stringify(compte);
            this.compte = compte;
            router.go(0);
        },
        logout() {
            this.compte = null;
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('compte');
            router.push('/');
        },
        menu() {
            return {
                'name': (this.compte)? JSON.parse(this.compte).nomCompte : 'Compte',
                'links' : [
                    (this.compte)?{
                        'name': 'Profile',
                        'link': '/profile'
                    }:{'hidden': 'true'},
                    (!this.compte)?{
                        'name': 'Connection',
                        'link': '/login'
                    }:{'hidden': 'true'},
                    (!this.compte)?{
                        'name': 'Créer un Compte',
                        'link': '/createaccount'
                    }:{'hidden': 'true'},
                    (this.compte)?{
                        'name': 'Logout',
                        'event' : 'logout'
                    }:{'hidden': 'true'},
                ]
              }
        },
        getJsoncompte() {
            let response = JSON.parse(this.compte);
            return response;
        },
    },
})
export { compte }