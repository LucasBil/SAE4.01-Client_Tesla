<script setup>
    // Axios import
    import modelesController from '../api/modelesController.js';
    import { onMounted, ref } from "vue";

    import Carousel from '../components/Carousel.vue';

    // Variable
    let modeles = ref([{}]);
    var status_request = ref(false);

    let carousel = ref([]);

    // Method
    onMounted(async () => {
        modelesController.getAll()
        .then((response) => {
            modeles.value = response.data;
            modeles.value.forEach(model => {
                console.log(model.photo.url[0]);
                carousel.value.push({
                    title: model.nomModele,
                    link: `http://${model.photo.url[0]}`
                });
            });
            status_request.value = true;
        })
        .catch((error) => {
            console.log(error);
        });
    });
</script>

<template v-if="status_request">
    <div class="h-[calc(110vh-288px)]">
        <Carousel :_imgs="carousel" _view="cars"/>
    </div>
</template>