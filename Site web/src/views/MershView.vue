<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';

    const route = useRoute();
    const idMersh = route.params.idMersh;
</script>

<template>
    <h1>Mersh View</h1>
</template>