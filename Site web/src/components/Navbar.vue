<script setup>
    import IconTesla from './icons/IconTesla.vue'
    import Menu from './Menu.vue';
    import { RouterLink, RouterView } from 'vue-router'
    
    defineProps({
        nav_content: {
            type: Array,
            default: [
                {
                    'name': 'Home',
                    'link': '/'
                },
                {
                    'name': 'About',
                    'link': '/about'
                }
            ]
        },
        profil: {
            type: Object,
            default: {
                'Login' : [
                    {
                        'name': 'Profile',
                        'link': '/profile',
                        'badge': 'New'
                    },
                    {
                        'name': 'Settings'
                    },
                    {
                        'name': 'Logout'
                    }
                ]
            }
        }
    }
    )
</script>

<template>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
            <Menu class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52" :menu="nav_content" :vertical="true"/>
        </div>
        <RouterLink to="/" class="btn btn-ghost normal-case text-xl">
            <IconTesla class="h-full w-full" />
        </RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <Menu :menu="nav_content" :vertical="false"/>
      </div>
      <div class="navbar-end">
    
        <label tabindex="0" class="btn btn-ghost btn-circle">
        <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm indicator-item">0</span>
        </div>
        </label>
    
        <!-- Dropdown menu Connection -->
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost">{{ Object.keys(profil)[0] }}</label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li v-for="item in profil[Object.keys(profil)[0]]">
                    <RouterLink v-if="item.link" :to="{path:item.link}" class="justify-between">
                        {{ item.name }}
                        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
                    </RouterLink>
                    <span v-else class="justify-between">
                        {{ item.name }}
                        <span v-if="item.badge" class="badge">{{ item.badge }}</span>
                    </span>
                </li>
            </ul>
        </div>
    
      </div>
    </div>
    </template>