<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    
    const route = useRoute();
    const id = route.params.id;

    console.log(id)
</script>

<template>
    <h1>CarsView</h1>
    <p>{{ id }}</p>
</template>