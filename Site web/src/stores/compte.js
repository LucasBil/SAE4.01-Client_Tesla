import { defineStore } from 'pinia'
import { onMounted, ref } from "vue";
import router from '../router';

const compte = defineStore( 'compte', {
    state: () => {
        return {
            compte: ref(null),
        }
    },
    actions: {
        login(compte) {
            localStorage.compte = JSON.stringify(compte);
            this.compte = compte;
            router.push('/');
        },
        logout() {
            localStorage.removeItem('compte');
            this.compte = null;
            router.push('/');
        },
        menu() {
            console.log('menu');
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
        }
    },
})

export { compte }