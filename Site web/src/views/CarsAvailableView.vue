<script setup>
    import { request, controller } from '../stores';
    import { onMounted, ref } from "vue";
    import saves from '../stores/saves.js';
    import IconFilter from '../components/icons/IconFilter.vue';
    import Card from '../components/Card.vue';

    let models = ref([]);
    let maxPrice = ref(0);
    let priceLimits = ref([1000000, 0]);
    let motorisations = ref();
    let options = ref([]);
    let filters = ref([]);
    
    request().access();
    onMounted(async () => {

        controller().ModelesController.GetAll()
        .then((response) => {
            models.value = response.data
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        })

        controller().VehiculeDemonstrationsController.GetAll()
        .then((response) => {
            motorisations.value = response.data;
            Promise.all(motorisations.value.map((moto) =>{
                if (moto.motosVehiculeNavigation.prix < priceLimits.value[0]){
                    priceLimits.value[0] = moto.motosVehiculeNavigation.prix;
                }
                if (moto.motosVehiculeNavigation.prix > priceLimits.value[1]){
                    priceLimits.value[1] = moto.motosVehiculeNavigation.prix;
                }
            }))  
            maxPrice.value = priceLimits.value[1]
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
        });

        controller().TypeOptionsController.GetAll()
        .then((response) => {
            options.value = response.data;
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
        });
    });

    function filtre_model() {
        let filtre = []
        models.value.forEach(mod => {
             mod.nomModele 
        })

    }
    
    function Test(msg)
    {
        console.log(msg);
    }
</script>

<template>
    <input type="checkbox" @click="Test(motorisations)"/>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn gap-2 btn-outline drawer-button p-2 z-10 absolute m-3">
                <IconFilter class="h-full"/> Filtrer
            </label>
            <div class="md:grid md:grid-cols-3 lg:grid-cols-2">
                <Card class="m-3" v-for="moto in motorisations" :id="moto.idVehiculeDemo" :title="moto.motosVehiculeNavigation.nomMotorisation" :resume="moto.motosVehiculeNavigation.description" :_img="moto.motosVehiculeNavigation.motorisationToOPM[0].photoOPM.url[0]" />
            </div>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->
                <!-- v-for Model -->
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Model S</span> 
                        <input type="checkbox" class="toggle"/>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Model 3</span> 
                        <input type="checkbox" class="toggle"/>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Model X</span> 
                        <input type="checkbox" class="toggle"/>
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Model Y</span> 
                        <input type="checkbox" class="toggle"/>
                    </label>
                </div>
                
                <div class="divider"></div>
                <h1 class="font-bold mb-3">Couleur Intérieure :</h1>
                <li>
                    <select v-if="options.length != 0" class="select select-bordered w-full p-2" name="" id="">
                        <option value="" selected>Aucune</option>
                        <!-- v-for Color In -->
                        <option v-for="colorIn in options[1].optionsNavigation" :value="colorIn.idOption">{{ colorIn.libelleOption }}</option>
                    </select>
                </li>
                <div class="divider"></div>
                <h1 class="font-bold mb-3">Couleur Extérieure :</h1>
                <button @click="Test(options)">Test</button>
                <li>
                    <select v-if="options.length != 0" class="select select-bordered w-full p-2">
                        <option value="" selected>Aucune</option>
                        <!-- v-for Color Out -->
                        <option v-for="colorOut in options[0].optionsNavigation" :value="colorOut.idOption">{{ colorOut.libelleOption }}</option>
                    </select>
                </li>

                <div class="divider"></div>
                <h1 class="font-bold mb-3">Prix max :</h1>
                <input type="number" :min="priceLimits[0]" :max="priceLimits[1]" v-model="maxPrice" placeholder="75000" class="input input-bordered w-full mb-2" />
                <input type="range" :min="priceLimits[0]" :max="priceLimits[1]" v-model="maxPrice" class="range" />
            </ul>
        </div>
    </div>
</template>