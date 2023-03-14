<script setup>
    import IconSpinning from './icons/IconSpinning.vue';
</script>

<template>
    <div class="overflow-hidden">
        <div class="min-h-screen w-screen flex flex-col gap-6 justify-center items-center">
            <img class="w-1/4" src="../assets/logo.svg" alt="Logo Tesla">
            <div class="text-2xl font-bold flex justify-center align-middle items-center gap-3">
                <h1 >Waiting</h1>
                <IconSpinning class="motion-safe:animate-spin w-full"/>
            </div>
        </div>
    </div>
</template>