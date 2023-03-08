<script setup>
    defineProps({
        _items: {
            type: Array,
            required: true
        }
    })
</script>

<template>
    <div class="text-sm breadcrumbs">
        <ul>
            <li v-for="item,key in _items">
                <a :href="item.href" v-if="key == _items.length-1">{{ item.title }}</a>
                <a :href="item.href" v-else class="font-bold">{{ item.title }}</a>
            </li>
        </ul>
    </div>
</template>