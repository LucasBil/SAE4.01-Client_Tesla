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
    let quantite = ref(1);

    const route = useRoute();
    const idMersh = route.params.idMersh;

    request().access();
    onMounted(async() =>{
        // Get accessoire
        
        controller().AccessoiresController.GetById(idMersh)
        .then((response) => {
            accessoire.value = response.data;
            console.log(accessoire.value)

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

    function TotalPrice(){
        return accessoire.value.prix * quantite.value;
    }

</script>

<template>
    <main class="w-full flex flex-col justify-center items-center gap-2">
        <h1 class="flex flex-col text-xl font-bold underline m-2">{{ accessoire.nomAccessoire }}</h1>
        <div class="grid grid-cols-2">
            <div class="flex flex-col h-[60vh] p-3">
                <Carousel 
                :_imgs="carrousel"
                :hiden="{
                    title: true,
                    number:true
                }"/>
            </div>
            <div class="flex flex-col h-[60vh] overflow-y-auto gap-2">
                <p>{{ accessoire.description }}</p>
            </div>
            <div class="p-3 col-span-2 flex flex-col justify-center items-center">
                <!-- Variantes -->
                <!-- <div>
                    <button>Hop</button>
                </div> -->
                <div class="flex w-full items-center gap-2 m-2">
                    <div class="flex justify-center grow items-center gap-2">
                        <span class="w-20">Quantite :</span>
                        <input type="number" :class="(quantite<=0)?'input-error':''" v-model="quantite" placeholder="0" min="1" class="input input-bordered grow w-20" />
                    </div>
                    <p class="flex flex-col text-xl font-bold underline">Prix: {{ Intl.NumberFormat('fr-FR', {  style: 'currency', currency: 'EUR' }).format(TotalPrice()) }}</p>
                </div>
            </div>
        </div>
        <div class="w-full p-3">
            <button class="btn w-full" @click="(quantite>0)?store_panier().addPanier({
                article : {
                    accessoire : accessoire
                },
                quantite : quantite,
                prix : TotalPrice()
                }):''">Commander</button>
        </div>
    </main>
</template>