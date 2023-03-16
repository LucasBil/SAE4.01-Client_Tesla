<script setup>
    import { onMounted, ref } from "vue";

    defineProps({
        themes: {
            type: Array,
            default: ['dark', 'light']
        }
    });

    let themeactiv = (localStorage.activTheme)?ref(capitalizeFirstLetter(localStorage.activTheme)):ref('');

    onMounted(async () => {
        if (localStorage.activTheme)
        {
            ChangeTheme(localStorage.activTheme);
        }
    });

    function ChangeTheme(theme) {
        localStorage.activTheme = theme;
        document.querySelector('html').attributes['data-theme'].value = theme;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text">Choisissez un magnifique theme</span>
        </label>
        <select @change="ChangeTheme($event.target.value)" class="select select-bordered">
            <option disabled selected>{{ `${themeactiv} (ancien/défault)` }}</option>
            <option v-for="theme in themes" :value="theme">{{ capitalizeFirstLetter(theme)}}</option>
        </select>
    </div>
</template>