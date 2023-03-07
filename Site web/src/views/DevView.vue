<script setup>
    import InputForm from '../components/InputForm.vue';
</script>

<template>
    <InputForm _label="password" :_confirm="true" :_input="{
        type:'text',
        pattern:'^[0-9]{0,9}$',
        placeholder:'password',
        required: true
    }"/>
    <button >test</button>
</template>