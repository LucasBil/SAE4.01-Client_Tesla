<script setup>
    // Axios import
    import modelesController from '../api/modelesController.js';
    import store from '../stores';
    import { onMounted, ref } from "vue";

    import Carousel from '../components/Carousel.vue';

    // Variable
    let modeles = ref([{}]);
    let carousel = ref([]);

    // Method
    onMounted(async () => {
        store().requestStatus = false;
        modelesController.getAll()
        .then((response) => {
            modeles.value = response.data;
            modeles.value.forEach(model => {
                carousel.value.push({
                    title: model.nomModele,
                    link: `http://${model.photo.url[0]}`
                });
            });
            store().requestStatus = true;
        })
        .catch((error) => {
            console.log(error);
        });
    });
</script>

<template>
    <div class="h-[calc(110vh-288px)]">
        <Carousel :_imgs="carousel" _view="cars"/>
    </div>
</template>