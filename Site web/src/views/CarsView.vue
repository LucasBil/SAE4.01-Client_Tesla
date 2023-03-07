<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    
    import Carousel from '../components/Carousel.vue';
    import RadioButton from '../components/RadioButton.vue';

    const route = useRoute();
    const title = route.params.title;

    console.log(title)
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3">
        <Carousel class="p-3 col-span-2" />
        <div class="flex gap-3 shadow-xl border-2 border-solid border-base-200 rounded-xl m-3 p-3 flex-col align-middle justify-center items-center" >
            <h1>Motorisation : <span class="font-bold">{{ title }}</span></h1>
            <div class="divider mx-3"></div>
            <h2>Couleurs extérieures :</h2>
            <RadioButton class="flex flex-col w-[75%] justify-center align-middle"  :_radios="[{
                title: 'Blanc Nacré Multicouches De série',
                color:'bg-white',
                checked:true
            },
            {
                title: 'Noir Uni 1800€',
                color: 'bg-black',
                checked:false
            },
            {
                title: 'Gris Nuit Métallisé 2200€',
                color: 'bg-gray-900',
                checked:false
            },
            {
                title: 'Bleu Outremer Métallisé 2200€',
                color: 'bg-blue-900',
                checked:false
            },{
                title: 'Rouge Multicouches 2200€',
                color: 'bg-red-900',
                checked:false
            },
            ]"/>
            <div class="divider mx-3"></div>
            <h2>Couleurs intérieures :</h2>
            <RadioButton class="flex flex-col w-[75%] justify-center align-middle"  :_radios="[{
                title: 'Blanc Nacré Multicouches De série',
                color:'bg-white',
                checked:true
            },
            {
                title: 'Noir Uni 1800€',
                color: 'bg-black',
                checked:false
            },
            {
                title: 'Gris Nuit Métallisé 2200€',
                color: 'bg-gray-900',
                checked:false
            },
            {
                title: 'Bleu Outremer Métallisé 2200€',
                color: 'bg-blue-900',
                checked:false
            },{
                title: 'Rouge Multicouches 2200€',
                color: 'bg-red-900',
                checked:false
            },
            ]"/>
            <div class="divider mx-3"></div>
            <h2>Jantes</h2>
            <select class="select select-bordered w-[75%]">
                <option selected value="personnel">Jantes Tempest 19" De série</option>
                <option value="proffessionnel">Jantes Arachnid 21" 4900 €</option>
            </select>
        </div>
    </div>
    <div class="h-screen"></div>
    <div class="fixed bottom-0 m-3 p-3 w-[calc(100vw-24px)] bg-base-300">
        <span class="flex justify-center">Prix Total : {{ title }}</span> 
    </div>
</template>