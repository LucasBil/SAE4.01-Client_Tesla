<script setup>
    import { onMounted, ref } from "vue";

    // Stores
    import { request, controller } from '../stores';
    import saves from '../stores/saves.js';

    // Composants
    import Carousel from '../components/Carousel.vue';

    // Variable
    let carousel = ref([]);
    
    // Method
    if (saves().findValue('MotorisationCarousel')){
        carousel.value = saves().findValue('MotorisationCarousel').value
    }
    else
    {
        request().access();
        onMounted(async () => {
            controller().ModelesController.GetAll()
            .then((response) => {
                console.log(response.data);
                response.data.forEach(model => {
                    carousel.value.push({
                        title: model.nomModele,
                        link: `http://${model.photo.urlModel[0]}`
                    });
                });
                saves().save('MotorisationCarousel', carousel.value);
                request().success(response);
            })
            .catch((error) => {
                request().error(error);
                request().debug();
            });
        });
    }

</script>

<template>
    <div v-if="request().requestState" class="h-[calc(110vh-288px)]">
        <Carousel :_imgs="carousel" _view="cars"/>
    </div>
</template>