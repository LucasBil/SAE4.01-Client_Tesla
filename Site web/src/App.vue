<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  Navbar from './components/Navbar.vue'
import FooterView from './components/Footer.vue';
</script>

<template>
  <header>
  <Navbar 
  :nav_content="
  [
    {
        'name': 'Voitures',
        'link': '/',
        'submenu':[
            {
                'name':'Configurable',
                'link':'/models'
            },
            {
                'name':'Disponible',
                'link':'/carsavailable'
            }
        ]
    },
    {
        'name': 'Acessoires',
        'link': '/mershs'
    },
    {
        'name': 'Theme',
        'link': '/theme'
    }
  ]"
  
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