<script setup>
    import { request, controller } from '../stores';
    import { onMounted, ref } from "vue";
    import saves from '../stores/saves.js';
    import IconFilter from '../components/icons/IconFilter.vue';
    import Card from '../components/Card.vue';

    let models = ref([]);
    let maxPrice = ref(0);
    let priceLimits = ref([1000000, 0]);

    let motorisations = ref([]);
    let motorisationview = [];

    let options = ref([]);

    let filters = {};
    let aFilter = {};
    
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

        controller().TypeOptionsController.GetAll()
        .then((response) => {
            options.value = response.data;
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
        });

        controller().VehiculeDemonstrationsController.GetAll()
        .then((response) => {
            motorisations.value = response.data;

            Promise.all(motorisations.value.map((moto) =>{
                Juste_Price(moto);
                Initfiltre(moto);
            }))  
            maxPrice.value = priceLimits.value[1]
            request().success(response);
        })
        .catch((error) => {
            console.log(error);
            request().error(error);
        });

    });

    function Juste_Price(moto) {
        if (moto.motosVehiculeNavigation.prix < priceLimits.value[0]){
                    priceLimits.value[0] = moto.motosVehiculeNavigation.prix;
                }
        if (moto.motosVehiculeNavigation.prix > priceLimits.value[1]){
            priceLimits.value[1] = moto.motosVehiculeNavigation.prix;
        }
    }

    function Initfiltre(moto) {
        filters[moto.idVehiculeDemo] =
                [moto.motosVehiculeNavigation.idModele,
                moto.optionsVehiculeNavigation[0].idType,
                moto.optionsVehiculeNavigation[moto.optionsVehiculeNavigation.length-1].idType,
                moto.motosVehiculeNavigation.prix]
    }

    function ActifFiltre(key, value) {
        if (aFilter[key] == undefined)
        {
            aFilter[key] = value;
        }
        else{
            aFilter.delete(key);
        }
        console.log(aFilter);    
    }

    function Filtre() 
    {
        motorisationview = [];
        motorisations.value.forEach(element => {
            // if(filters[element.idVehiculeDemo][0]){
            //     if(filters[element.idVehiculeDemo][1]){
            //         if(filters[element.idVehiculeDemo][2]){
            //             if (filters[element.idVehiculeDemo][3] <= maxPrice.value){
            //                 motorisationview.push(element);
            //             }
            //         }
            //     }
            // }
            if (filters[element.idVehiculeDemo][3] <= maxPrice.value)
            {
                motorisationview.push(element);
            }
        });
        if (motorisationview == []){
            return motorisations
        }
        return motorisationview
    }
    
    function Test(msg, msg2)
    {
        console.log(msg, msg2);
    }
</script>

<template>
    <input type="checkbox" @click="Test()"/>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn gap-2 btn-outline drawer-button p-2 z-10 absolute m-3">
                <IconFilter class="h-full"/> Filtrer
            </label>
            <div class="md:grid md:grid-cols-3 lg:grid-cols-2">
                <Card :_button="moto.motosVehiculeNavigation.prix" class="m-3" v-for="moto in Filtre()" :id="moto.idVehiculeDemo" :title="moto.motosVehiculeNavigation.nomMotorisation" :resume="moto.motosVehiculeNavigation.description" :_img="moto.motosVehiculeNavigation.motorisationToOPM[0].photoOPM.url[0]" />
            </div>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->
                <!-- v-for Model -->
                <div v-for="model in models">
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">{{model.nomModele}}</span> 
                            <input @change="ActifFiltre(model.nomModele, model.idModele)" type="checkbox" class="toggle"/>
                        </label>
                    </div>
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