import { defineStore } from 'pinia'
import { useStorage, StorageSerializers } from '@vueuse/core'
import router from '../router';

const store_compte = defineStore( 'store-compte', {
    state: () => {
        return {
            _compte: useStorage('compte', null, localStorage, {serializer: StorageSerializers.object}),
            _token: useStorage('token', null),
        }
    },
    getters: {
        compte: (state) => state._compte,
        name: (state) => {
            if(!state._compte) 
                return 'Compte';
            else
                return state._compte.nomCompte
        },
        token: (state) => state._token,
    },
    actions: {
        // Compte
        login(compte, token) {
            console.log(compte);
            this._compte = compte;
            this._token = token;
            router.push('/');
        },
        editCompte(compte) {
            this._compte = compte;
            router.go(0);
        },
        logout() {
            this._compte = null;
            this._token = null;
            router.push('/');
        },
        menu() {
            return {
                'name': this.name,
                'links' : [
                    (this._compte)?{
                        'name': 'Profile',
                        'link': '/profile'
                    }:{'hidden': 'true'},
                    (!this._compte)?{
                        'name': 'Connection',
                        'link': '/login'
                    }:{'hidden': 'true'},
                    (!this._compte)?{
                        'name': 'Créer un Compte',
                        'link': '/createaccount'
                    }:{'hidden': 'true'},
                    (this._compte)?{
                        'name': 'Logout',
                        'event' : 'logout'
                    }:{'hidden': 'true'},
                ]
              }
        }
    },
})
export { store_compte }