<script setup>
    import { request, controller } from '../stores';
    import { onMounted, ref } from "vue";
    import saves from '../stores/saves.js';
    import IconFilter from '../components/icons/IconFilter.vue';
    import Card from '../components/Card.vue';
    import { store_panier } from '../stores/panier';

 
    let maxPrice = ref(0);

    let priceLimits = ref([1000000, 0]);

    let vehiculesDemo = ref([]);
    let vehiDemoView = [];

    let models = ref([]);
    let typeOptions = ref([]);
    let options = ref([]);

    let filters = {};

    
    request().access();
    onMounted(async () => {

        controller().ModelesController.GetAll()
        .then((response) => {
            models.value = response.data
        })
        .catch((error) => {
            console.log(error);
            request().error(error);
            request().debug();
        })

        controller().TypeOptionsController.GetAll()
        .then((response) => {
            typeOptions.value = response.data
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        })



        controller().OptionsController.GetAll()
        .then((response) => {
            options.value = response.data;
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
            console.log(error);
        });

        controller().VehiculeDemonstrationsController.GetAll()
        .then((response) => {
            vehiculesDemo.value = response.data;

            Promise.all(vehiculesDemo.value.map((moto) =>{
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
                moto.optionsVehiculeNavigation[0].idOption,
                moto.optionsVehiculeNavigation[moto.optionsVehiculeNavigation.length-1].idOption,
                moto.motosVehiculeNavigation.prix]
    }

    function Filtre() 
    {
        vehiDemoView = [];
        vehiculesDemo.value.forEach(element => {
            if (filters[element.idVehiculeDemo][3] <= maxPrice.value)
            {
                vehiDemoView.push(element);
            }
        });
        if (vehiDemoView == []){
            return vehiculesDemo
        }
        return vehiDemoView
    }
    
</script>

<template>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn gap-2 btn-outline drawer-button p-2 z-10 absolute m-3">
                <IconFilter class="h-full"/> Filtrer
            </label>
            <div class="md:grid md:grid-cols-3 lg:grid-cols-2">
                <Card @learn-more="store_panier().addPanier({
                    article : {
                        motorisation: moto.motosVehiculeNavigation,
                        options : moto.optionsVehiculeNavigation
                    },
                    quantite : 1,
                    prix: moto.motosVehiculeNavigation.prix
                })" _button="Ajouter au panier" class="m-3" v-for="moto in Filtre()" :id="moto.idVehiculeDemo" :title="moto.motosVehiculeNavigation.nomMotorisation" :resume="moto.motosVehiculeNavigation.description" :_img="moto.motosVehiculeNavigation.motorisationToOPM[0].photoOPM.url[0]" />
            </div>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->

                <div class="divider"></div>
                <h1 class="font-bold mb-3">Prix max :</h1>
                <input type="number" :min="priceLimits[0]" :max="priceLimits[1]" v-model="maxPrice" placeholder="75000" readonly class="input input-bordered w-full mb-2" />
                <input type="range" :min="priceLimits[0]" :max="priceLimits[1]" v-model="maxPrice" class="range" />
            </ul>
        </div>
    </div>
</template>