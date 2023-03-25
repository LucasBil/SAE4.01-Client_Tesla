<script setup>
import { RouterLink, RouterView } from 'vue-router'

// Stores
import { request } from './stores'
import { compte } from './stores/compte.js'

// Composants
import IconTesla from './components/icons/IconTesla.vue'
import Menu from './components/Menu.vue';
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
  <!-- Navbar -->
  <header class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
          <Menu class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" :menu="_menu" :vertical="true"/>
      </div>
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">
          <IconTesla class="h-full w-full" />
      </RouterLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <Menu :menu="_menu" :vertical="false"/>
    </div>

    <div class="navbar-end">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm indicator-item">{{ compte().panier.length }}</span>
        </div>
      </label>
    
      <!-- Dropdown menu Connection -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost">{{ compte().menu().name }}</label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li v-for="item in compte().menu().links">
                  <RouterLink v-if="item.link" :to="{path:item.link}" class="justify-between">
                      {{ item.name }}
                      <span v-if="item.badge" class="badge">{{ item.badge }}</span>
                  </RouterLink>
                  <span @click="(item.event == 'logout')?compte().logout():null" v-else class="justify-between" :class="(item.hidden)?'hidden':''">
                      {{ item.name }}
                      <span v-if="item.badge" class="badge">{{ item.badge }}</span>
                  </span>
              </li>
          </ul>
        </div>
      </div>
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