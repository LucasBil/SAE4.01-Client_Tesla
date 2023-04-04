<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    import { onMounted, ref } from "vue";
    import router from '../router';
    
    // Stores
    import { request , controller } from '../stores';
    import saves from '../stores/saves';
    import pdf from '../stores/pdf';

    import Card from '../components/Card.vue';

    let accessoires = ref([]);
    let photos = ref({});
    let search = ref("");

    request().access();
    onMounted(async() =>{
        // Get variante
        controller().AccessoiresController.GetAll()
        .then((response) => {
            accessoires.value = response.data;
            Promise.all(accessoires.value.map(v => {

                const promisePH = controller().PhotosController.GetByIdAccessoire(v.idAccessoire)
                .then((response) => {
                    photos.value[v.idAccessoire] = response.data.url[0]
                })
                .catch((error) => {
                    request().error(error);
                    request().debug();
                });

                return promisePH;
            })).then(() =>{
                request().pass();
            })
                
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        })
    })
    
    function Filtre() {
        let filtre = []
        if(search != "")
        {
            for (const [key,accessoire] of accessoires.value.entries()) {
                if(accessoire.nomAccessoire.toLowerCase().includes(search.value.toLowerCase())){
                    filtre.push(accessoire)
                }
            }; 
            return filtre
        }
        else
        {
            return accessoires
        }
    }

    function Test(msg) {
        console.log(msg);
    }

</script>


<template>

    <main>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 m-6 gap-4">
            <Card :_img="photos[accessoire.idAccessoire]" @learn-more="router.push(`mersh${$event}`);" :id="accessoire.idAccessoire" :title="accessoire.nomAccessoire" :resume="accessoire.description" v-for="accessoire in Filtre()"/>
        </div>
    </main>

    <div class="form-control">
        <div class="input-group ">
            <input v-model="search" type="text" placeholder="Search…" class="input input-bordered p-3 rounded-lg border-2 fixed bottom-5 left-[5vw] h-[6vh] w-[85vw]" />
            <button class="btn btn-square border-solid p-3 ml-[85vw] rounded-lg border-2 fixed bottom-5 left-[5vw] h-[6vh] w-[5vw]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>
    </div>

</template>