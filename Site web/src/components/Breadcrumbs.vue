<script setup>
    import { RouterLink, RouterView } from 'vue-router'
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
                <a v-if="key == _items.length-1">{{ item.title }}</a>
                <RouterLink :to="{ path:item.href}" v-else class="font-bold">{{ item.title }}</RouterLink>
            </li>
        </ul>
    </div>
</template>