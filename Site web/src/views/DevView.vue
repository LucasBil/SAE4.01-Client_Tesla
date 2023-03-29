<script setup>
import { onMounted, ref } from "vue";
import {request, controller } from '../stores';
import { compte } from '../stores/compte.js'


console.log(compte().token);
request().access();
onMounted(async () => {
    controller().ComptesController.GetByIdCB(compte().getJsoncompte().idCompte,compte().token)
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