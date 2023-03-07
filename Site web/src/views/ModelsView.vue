<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Carousel from '../components/Carousel.vue';

    let models = [
        {
            title: 'Modele S',
            link: 'https://static.tvtropes.org/pmwiki/pub/images/konosuba_aqua_crying.png'
        },
        {
            title: 'Modele X',
            link: 'https://img1.ak.crunchyroll.com/i/spire1/d5ad9e0a13330935dd0905b2904b00041588258124_full.jpg'
        },
        {
            title: 'Modele 3',
            link: 'https://i.pinimg.com/originals/99/31/11/993111212ef23cf2caa30f3ff2ed95ee.png'
        },
        {
            title: 'Modele Y',
            link: 'https://img1.ak.crunchyroll.com/i/spire3/fea3b0a161b8b4a3ff3312e96a9aeb841588257846_full.jpg'
        }
    ]
</script>

<template>
    <div class="grid h-[calc(110vh-288px)]">
        <Carousel :_imgs="models" _link="cars"/>
    </div>
    <RouterLink :to="{name:'cars', params: { id: 1 }}">Cars</RouterLink>
</template>