<script setup>
    import CursorBlendMix from '../components/CursorBlendMix.vue';
    import ThemeSelector from '../components/ThemeSelector.vue';
</script>

<template>
    <CursorBlendMix :size="300"/>
    <div class="relative bg-base-300 rounded-3xl p-6 m-6 left-1/4 w-1/2">
        <ThemeSelector :themes="['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter']"/>
    </div>
</template>