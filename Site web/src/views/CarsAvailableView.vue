<script setup>
    import { request, controller } from '../stores';
    import { onMounted, ref } from "vue";
    import saves from '../stores/saves.js';
    import IconFilter from '../components/icons/IconFilter.vue';
    import Card from '../components/Card.vue';

 
    let maxPrice = ref(0);
    let selected_optExt = ref([]);
    let selected_optInt = ref([]);

    let priceLimits = ref([1000000, 0]);

    let vehiculesDemo = ref([]);
    let vehiDemoView = [];

    let models = ref([]);
    let typeOptions = ref([]);
    let options = ref([]);

    let filters = {};
    let avfilters = ref([]);
    let dictionary = {};

    
    request().access();
    onMounted(async () => {

        controller().ModelesController.GetAll()
        .then((response) => {
            models.value = response.data
            Promise.all(models.value.map((mod) =>{
                dictionary[mod.nomModele] = mod.idModele;
            }))  
            avfilters.value.push(dictionary);
            dictionary = {};  
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
            Promise.all(options.value.map((opt) =>{
                if ( (opt.idType == 1 || opt.idType == 2) && opt.coutAdditionnel != 1190)
                {
                    dictionary[opt.libelleOption] = opt.idOption;
                }
            }))  
            avfilters.value.push(dictionary);
            dictionary = {};  
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

    function ActifFiltre(type, val) {
        if (type == "mod")
        {
            console.log(avfilters.value[0])
            if(avfilters.value[0][val.nomModele] != -1)
            {
                avfilters.value[0][val.nomModele] = -1
            }
            else if (avfilters.value[0][val.nomModele] == -1)
            {
                avfilters.value[0][val.nomModele] = type.idModele
            }
        }
        if (type == "opt")
        {
            if(avfilters.value[1][val.libelleOption] != -1)
            {
                avfilters.value[1][val.libelleOption] = -1
            }
            else if (avfilters.value[1][val.libelleOption] == -1)
            {
                avfilters.value[1][val.libelleOption] = type.idOption
            }
        }
          
        return avfilters;
    }

    function Filtre() 
    {
        vehiDemoView = [];
        vehiculesDemo.value.forEach(element => {
            // if(filters[element.idVehiculeDemo][0] ==){
            //     if(filters[element.idVehiculeDemo][1]){
            //         if(filters[element.idVehiculeDemo][2]){
            //             if (filters[element.idVehiculeDemo][3] <= maxPrice.value){
            //                 vehiDemoView.push(element);
            //             }
            //         }
            //     }
            // }¨
            // if ( (avfilters.value[0]['MODELE S'] || 
            //       avfilters.value[0]['MODELE 3'] ||
            //       avfilters.value[0]['MODELE X'] || 
            //       avfilters.value[0]['MODELE Y']) == filters[element.idVehiculeDemo][0])
            // {
            //     vehiDemoView.push(element);
            // }
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
    
    function Test(msg, m2 = null)
    {
        console.log(msg, m2);
    }
</script>

<template>
    <input type="checkbox" @click="Test(models)"/>
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
                            <input @change="ActifFiltre('mod',model)" type="checkbox" class="toggle" checked/>
                        </label>
                    </div>
                </div>

                <!-- <div class="divider"></div>
                <h1 class="font-bold mb-3">Couleur Intérieure :</h1>
                <li>
                    <select v-model="selected_optInt" class="select select-bordered w-full p-2" name="" id="">
                        <option value="" selected>Aucune</option> -->
                        <!-- v-for Color In -->
                        <!-- <option v-for="colorInt in typeOptions[1].optionsNavigation" :value="colorInt.idOption">{{ colorInt.libelleOption }}</option>
                    </select>
                </li>
                <div class="divider"></div>
                <h1 class="font-bold mb-3">Couleur Extérieure :</h1>
                <li>
                    <select v-model="select_optExt" class="select select-bordered w-full p-2">
                        <option value="" selected>Aucune</option> -->
                        <!-- v-for Color Out -->
                        <!-- <option v-for="colorExt in typeOptions[0].optionsNavigation" :value="colorExt.idOption">{{ colorExt.libelleOption }}</option>
                    </select>
                </li> -->

                <div class="divider"></div>
                <h1 class="font-bold mb-3">Prix max :</h1>
                <input type="number" :min="priceLimits[0]" :max="priceLimits[1]" v-model="maxPrice" placeholder="75000" readonly class="input input-bordered w-full mb-2" />
                <input type="range" :min="priceLimits[0]" :max="priceLimits[1]" v-model="maxPrice" class="range" />
            </ul>
        </div>
    </div>
</template>