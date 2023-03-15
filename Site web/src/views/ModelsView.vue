<script setup>
    // Axios import
    import { request, controller } from '../stores';

    import { onMounted, ref } from "vue";

    import Carousel from '../components/Carousel.vue';

    // Variable
    let modeles = ref([{}]);
    let carousel = ref([]);
    request().access();

    // Method
    onMounted(async () => {
        controller().ModelesController.GetAll()
        .then((response) => {
            modeles.value = response.data;
            modeles.value.forEach(model => {
                carousel.value.push({
                    title: model.nomModele,
                    link: `http://${model.photo.url[0]}`
                });
            });
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    });
</script>

<template>
    <div v-if="request().requestState" class="h-[calc(110vh-288px)]">
        <Carousel :_imgs="carousel" _view="cars"/>
    </div>
</template>