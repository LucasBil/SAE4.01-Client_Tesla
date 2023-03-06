<script setup>
    import Card from '../components/Card.vue';
</script>
<template>
    <main>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 m-6 gap-4">
            <Card class="" v-for="i in 5"/>
        </div>
    </main>
</template>