<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    import { onMounted, ref } from "vue";

    // Stores
    import { request , controller } from '../stores';
    import saves from '../stores/saves';
    import pdf from '../stores/pdf';

    // Modeles
    //import Accessoire from '../Accessoires';

    // Composants
    import Carousel from '../components/Carousel.vue';
    import BreadCrumbs from '../components/Breadcrumbs.vue';
    import { createPinia } from 'pinia';

    let accessoire = ref({})

    const route = useRoute();
    const idMersh = route.params.idMersh;

    request().access();
    onMounted(async() =>{
        // Get accessoire
        controller().AccessoiresController.GetById(idMersh)
        .then((response) => {
            accessoire.value = response.data;
            request().success();
        })
        .catch((error) => {
            //request().error(error);
            //request().debug();
        })
    })

    function Test(msg){
        console.log(msg)
    }

</script>

<template>
    <input type="button" value="Press it !!!" @click="Test(accessoire)">
    <div class="grid grid-cols-2">
        <div class="flex flex-col h-[60vh] p-3">
            <Carousel 
            :_imgs="[
                {
                    title :'',
                    link : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/VVS_100th_IMG_0691_%287727464290%29_%28cropped%29.jpg/1280px-VVS_100th_IMG_0691_%287727464290%29_%28cropped%29.jpg'
                }
            ]"
            :hiden="{
                title: true,
                number:true
            }"/>
        </div>
        <div class="flex flex-col gap-2">
            <h1 class="flex flex-col text-xl font-bold underline">{{ accessoire.nomAccessoire }}</h1>
            <p>{{ accessoire.description }}</p>
        </div>
    </div>

</template>