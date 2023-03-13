<script setup>
    import MenuVertical from './MenuVertical.vue';
    import MenuHorizontal from './MenuHorizontal.vue';

    defineProps({
        menu: {
            type: Array,
            required: true
        },
        vertical:{
            type: Boolean,
            default: false
        }
    })
</script>

<template>
    <MenuVertical v-if="vertical" :menu="menu"/>
    <MenuHorizontal v-else :menu="menu"/>
</template>