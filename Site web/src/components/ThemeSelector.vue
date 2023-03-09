<script setup>
    defineProps({
        themes: {
            type: Array,
            default: ['dark', 'light']
        }
    });
    
    let activTheme = document.querySelector('html').attributes['data-theme'].value;

    function ChangeTheme(theme) {
        console.log(activTheme);
        document.querySelector('html').attributes['data-theme'].value = theme;
    }

</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text">Choisissez un magnifique theme</span>
        </label>
        <select v-model="activTheme" @change="ChangeTheme($event.target.value)" class="select select-bordered">
            <option disabled selected>{{ activTheme.charAt(0).toUpperCase()+activTheme.slice(1) }} (ancien/défault)</option>
            <option v-for="theme in themes" :value="theme">{{ theme.charAt(0).toUpperCase()+theme.slice(1)}}</option>
        </select>
    </div>
</template>