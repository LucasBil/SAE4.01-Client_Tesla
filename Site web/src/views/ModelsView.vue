<script setup>
    // Axios import
    import store from '../stores';

    import { onMounted, ref } from "vue";
    import api from '../api';

    import Carousel from '../components/Carousel.vue';

    // Variable
    let modeles = ref([{}]);
    let carousel = ref([]);
    store().requestStatus = false;

    // Method
    onMounted(async () => {
        api.ModelesController.GetAll()
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
    <div v-if="store().requestStatus" class="h-[calc(110vh-288px)]">
        <Carousel :_imgs="carousel" _view="cars"/>
    </div>
</template>