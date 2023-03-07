<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    
    const route = useRoute();
    const model = route.params.model;

    console.log(model)
</script>

<template>
    <h1>CarsView</h1>
    <p>{{ model }}</p>
</template>