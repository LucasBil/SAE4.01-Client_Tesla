<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    import { onMounted, ref } from "vue";

    // Stores
    import { request , controller } from '../stores';
    import saves from '../stores/saves';
    import {store_panier} from '../stores/panier'


    // Composants
    import Carousel from '../components/Carousel.vue';

    let accessoire = ref({});
    let carrousel = ref([]);

    const route = useRoute();
    const idMersh = route.params.idMersh;

    request().access();
    onMounted(async() =>{
        // Get accessoire
        controller().AccessoiresController.GetById(idMersh)
        .then((response) => {
            accessoire.value = response.data;

            controller().PhotosController.GetByIdVariantes(accessoire.value.variantesNavigation[0].idVariante)
            .then((response) => {
                response.data.url.forEach(element => {
                    carrousel.value.push({
                        title:"",
                        link: `http://${element}`
                    })
                });
                
                request().success(response);
            }) 
            .catch((error) => {
                request().error(error);
                request().debug();
            })
        })
        .catch((error) => {
            request().error(error);
            request().debug();
            console.log(error)
        })
    })

</script>

<template>
    <div class="grid grid-cols-2">
        <div class="flex flex-col h-[60vh] p-3">
            <Carousel 
            :_imgs="carrousel"
            :hiden="{
                title: true,
                number:true
            }"/>
        </div>
        <div class="flex flex-col gap-2">
            <h1 class="flex flex-col text-xl font-bold underline">{{ accessoire.nomAccessoire }}</h1>
            <p>{{ accessoire.description }}</p>
            <div class="p-3">
                <p class="flex flex-col text-xl font-bold underline">Prix: {{ accessoire.prix }} $</p>
            </div>
        </div>
    </div>
    <div class="w-full p-3">
        <button class="btn w-full" @click="store_panier().addPanier(accessoire)">Commander</button>
    </div>

</template>