<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  Navbar from './components/Navbar.vue'
import FooterView from './components/Footer.vue';

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
  <RouterView />
  <FooterView/>
</template>