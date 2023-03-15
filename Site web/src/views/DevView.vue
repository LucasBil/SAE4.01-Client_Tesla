<script setup>
import { onMounted, ref } from "vue";
import {request, controller } from '../stores';

request().access();
onMounted(async () => {
    controller().ModelesController.GetAll()
    .then((response) => {
        console.log(response.data);
        request().success(response);
    })
    .catch((error) => {
        request().error(error);
    });
});

</script>

<template>
</template>