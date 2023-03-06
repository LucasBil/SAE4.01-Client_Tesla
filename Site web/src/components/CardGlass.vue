<script setup>
    defineProps({
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
            required: true,
            default: 'Learn more'
        },
        _img: {
            type: String,
            required: true,
            default: 'https://img1.ak.crunchyroll.com/i/spire1/d5ad9e0a13330935dd0905b2904b00041588258124_full.jpg'
        },
    })
</script>

<template>
    <div class="card w-96 glass">
        <figure><img class="object-cover h-full" :src="_img" alt="car!"/></figure>
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <p>{{ resume }}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">{{ _button }}</button>
            </div>
        </div>
    </div>
</template>