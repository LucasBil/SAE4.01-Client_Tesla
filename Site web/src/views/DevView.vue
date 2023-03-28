<script setup>
import { onMounted, ref } from "vue";
import {request, controller } from '../stores';
import { compte } from '../stores/compte.js'

import Modeles from '../modeles';

const objects = ref();
request().access();
onMounted(async () => {
    controller().ComptesController.GetByIdCB(compte().getJsoncompte().idCompte)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
});

</script>

<template>
</template>