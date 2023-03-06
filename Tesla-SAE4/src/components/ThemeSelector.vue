<script setup>
    defineProps({
        themes: {
            type: Array,
            default: ['dark', 'light']
        }
    });
    let activTheme = document.querySelector('html').attributes['data-theme'].value;
</script>

<template>
    <div class="form-control">
        <label v-for="theme in themes" class="label cursor-pointer">
            <span class="label-text">{{ theme.charAt(0).toUpperCase()+theme.slice(1)}}</span> 
            <input v-if="activTheme == theme" :data-set-theme="theme" data-act-class="ACTIVECLASS" type="radio" name="radio-10" class="radio radio-accent" checked />
            <input v-else :data-set-theme="theme" data-act-class="ACTIVECLASS" type="radio" name="radio-10" class="radio radio-accent"/>
        </label>
    </div>
</template>