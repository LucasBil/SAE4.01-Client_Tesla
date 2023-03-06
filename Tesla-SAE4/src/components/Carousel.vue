<script setup>
    defineProps({
        _imgs : {
            type: Array,
            default: () => [
                'https://static.tvtropes.org/pmwiki/pub/images/konosuba_aqua_crying.png',
                'https://img1.ak.crunchyroll.com/i/spire1/d5ad9e0a13330935dd0905b2904b00041588258124_full.jpg',
                'https://i.pinimg.com/originals/99/31/11/993111212ef23cf2caa30f3ff2ed95ee.png'
            ]
        },
        hiden: {
            type: Array,
            default: {
                'array': false,
                'number': false
            }
        }
    })
</script>

<template>
    <div class="carousel w-full h-full">
        <div v-for="link,index in _imgs" :id="'slide'+index" class="carousel-item relative w-full">
            <img :src="link" class="w-full h-full object-cover" />
            <div v-if="!hiden.array" class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a :href="'#slide'+(index+_imgs.length-1)%_imgs.length" class="btn btn-circle">❮</a> 
                <a :href="'#slide'+(index+1)%_imgs.length" class="btn btn-circle">❯</a>
            </div>
        </div>
    </div>
    <div v-if="!hiden.number" class="flex justify-center w-full py-2 gap-2">
        <a v-for="index in _imgs.length" :href="'#slide'+(index-1)" class="btn btn-xs">{{ index }}</a> 
    </div>
</template>