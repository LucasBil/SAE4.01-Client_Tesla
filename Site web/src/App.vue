<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, ref } from "vue";

// Stores
import { request } from './stores'

// Composants
import  Navbar from './components/Navbar.vue'
import FooterView from './components/Footer.vue';
import WaitingScreen from './components/WaitingScreen.vue';

// Data
let _menu = [
          { name: 'Voitures', submenu: [
            { name: 'Configurable', link: '/models'},
            { name: 'Disponible', link: '/carsavailable' }
          ]},
          { name: 'Acessoires', link: '/mershs'},
          { name:'Theme', link: '/theme'},
        ]
</script>

<template>
  <header>
  <Navbar 
  :nav_content="_menu"
  
  :profil="
  {
    'Compte' : [
        {
            'name': 'Profile',
            'link': '/profile'
        },
        {
            'name': 'Login',
            'link': '/login'
        },
        {
            'name': 'Create Account',
            'link': '/createaccount'
        },
        {
            'name': 'Logout'
        }
    ]
  }
  " />
  </header>
  <main>
    <RouterView />
  </main>
  <WaitingScreen v-if="!request().requestState && !request().requestError"/>
  <div v-if="request().requestError" class="toast toast-end">
    <div class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error {{ request().requestCode }} !</span>
      </div>
    </div>
  </div>
  <FooterView/>
</template>