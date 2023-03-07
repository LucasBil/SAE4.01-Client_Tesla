<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import Carousel from '../components/Carousel.vue';

    let models = [
        {
            title: 'Modele S',
            link: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/f53054f4-30da-4a94-8aac-1aa6f662996d/bvlatuR/std/1200x628/Model-S-Social?quality=auto-medium&format=auto'
        },
        {
            title: 'Modele X',
            link: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/458cfaaf-de1e-47e0-867e-cb78c1993db3/bvlatuR/std/1200x628/Model-X-Social?quality=auto-medium&format=auto'
        },
        {
            title: 'Modele 3',
            link: 'https://www.tesla.com/sites/default/files/model3-new/social/model-3-hero-social.jpg'
        },
        {
            title: 'Modele Y',
            link: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/70dea471-18bf-47b7-80f4-7e339c37869e/bvlatuR/std/2880x1800/Model-Y-Main-Hero-Desktop-EMEA-LHD?quality=auto-medium&format=auto'
        }
    ]
</script>

<template>
    <div class="h-[calc(110vh-288px)]">
        <Carousel :_imgs="models" _view="cars"/>
    </div>
</template>