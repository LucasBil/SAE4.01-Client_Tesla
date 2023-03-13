<script setup>
  // Axios import
  import api from '../api';
  import { onMounted, ref } from "vue";

  // Composant import
  import Carousel from '../components/Carousel.vue';

  // Variable
  let memes = ref([{}]);
  let _imgMemes = ref([]);

  var status_request = ref(false);

  // Method
  onMounted(async () => {
    api.getAllMemes()
    .then((response) => {
        memes.value = response.data['data']['memes'];
        _imgMemes.value = memes.value.map((meme) => {
            return {
                title: meme.name,
                link: meme.url
            }
        });
        status_request.value = true;
    })
    .catch((error) => {
        console.log(error);
    });
  });
</script>

<template v-if="status_request">
  <div class="w-full h-[calc(100vh-64px)] bg-[url(../assets/img/teslaHomePage.jpg)] text-base-100 bg-cover flex justify-center align-middle items-center">
    <div class="border-8 gap-6 flex flex-col font-semibold justify-center items-center border-base-100 p-3 w-[85%] h-1/2">
      <h1 class="text-4xl">Profiter de l'expérience Tesla</h1>
      <p class="text-5xl text-center">L' <span class="text-6xl">avenir</span> et l'ingéniosité dans une <span class="text-6xl">voiture</span></p>
    </div>
  </div>
</template>