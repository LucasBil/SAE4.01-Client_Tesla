<script setup>
    /*
    * This component is a recursive component, it means that it can call itself.
    * This is a very powerful feature of Vue 3, but it's also a bit tricky.
    * use the :_tabindex prop to set the tabindex of the first element of the submenu.
    * This is needed to make the submenu accessible with the keyboard.
    * The :_tabindex prop is not meant to be used by the developer, it's for internal use only.
    * The :_tabindex prop is used to set the tabindex of the first element of the submenu.
    * 
    * Example:
    * <Menu :menu="[
    *   { name: 'Home', link: '/' },
    *   { name: 'In addition', submenu: [
    *       { name: 'About', submenu:[
    *           { name: 'About', link: '/about' },
    *           { name: 'Contact', link: '/contact' }
    *       ]},
    *   { name: 'Contact', link: '/contact' }
    *   ]}
    * ]"/>
    */

    import { RouterLink, RouterView } from 'vue-router'
    import MenuVertical from './MenuVertical.vue'

    defineProps({
        menu: {
            type: Array,
            required: true
        },
        submenu: {
            type: Boolean,
            default: false
        },
        _tabindex:{ // don't use this prop, it's for internal use only
            type: Number,
            default: 0
        }
    })
</script>

<template>
    <ul class="menu shadow bg-base-100 rounded-box z-10 p-2">
        <li v-for="item in menu" :tabindex="(item.submenu)?_tabindex:null">
            <RouterLink :to="{path:item.link}" v-if="!item.submenu">{{ item.name }}</RouterLink>

            <a v-if="item.submenu">
                {{ item.name }}
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
            </a>
            <MenuVertical v-if="item.submenu" :menu="item.submenu" :submenu="true" :_tabindex="_tabindex+1"/>
        </li>
    </ul>
</template>