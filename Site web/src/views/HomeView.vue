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
  <div class="p-6 w-[500px] h-[500px]">
    <Carousel :_imgs="_imgMemes" :hiden="{'number': true}"/>
  </div>
</template>
