<script setup>
    import { onMounted, ref } from "vue";

    // Stores
    import { request, controller } from '../stores';
    import saves from '../stores/saves.js';

    // Modeles
    import Modeles from '../modeles';

    // Composants
    import Carousel from '../components/Carousel.vue';

    // Variable
    let modeles = ref();
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
                modeles = Modeles.Modele.fromJsonArray(response.data);
                modeles.forEach(model => {
                    carousel.value.push( model.CarouselItem());
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