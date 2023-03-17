<script setup>
import { onMounted, ref } from "vue";
import {request, controller } from '../stores';

import Modeles from '../modeles';

const objects = ref();

request().access();
onMounted(async () => {
    controller().ModelesController.GetAll()
    .then((response) => {
        console.log(response.data);
        objects.value = Modeles.Modele.fromJsonArray(response.data);
        console.log(objects.value[0].CarouselItem());
        request().success(response);
    })
    .catch((error) => {
        request().error(error);
    });
});

</script>

<template>
</template>