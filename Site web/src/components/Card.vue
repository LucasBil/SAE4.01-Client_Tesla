<script setup>
    defineProps({
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
            default: 'Card title'
        },
        resume: {
            type: String,
            required: true,
            default: 'Lorem Poscriptum ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec lacinia nisl nisl nec nisl.'
        },
        _button: {
            type: String,
            default: 'En Savoir Plus'
        },
        _img: {
            type: String,
            required: true,
            default: 'https://cdn-s-www.lejsl.com/images/75470FF1-1B19-498F-A027-CB1B16054B35/NW_detail_M/le-logo-tesla-evoque-une-coupe-de-moteu-electrique-1651236118.jpg'
        },
        _badge:{
            type: String
        }
    })

    const emit = defineEmits(['learn-more']);

</script>

<template>
    <div class="card lg:card-side bg-base-100 shadow-xl">
        <span v-if="_badge" class=" absolute right-0 m-3 p-4 badge badge-lg">{{_badge}}</span>
        <figure class="w-[50%]">
            <img class="object-cover h-full" :src="`http://${_img}`" alt="Album"/>
        </figure>
        <div class="card-body w-[100%]">
            <h2 class="card-title">{{ title }}</h2>
            <p class="block textarea-info overflow-y-auto text-ellipsis h-24 leading-6">{{ resume }}</p>
            <div class="card-actions justify-end">
                <button @click="emit('learn-more', id);" class="btn btn-primary">{{ _button }}</button>
            </div>
        </div>
    </div>
</template>