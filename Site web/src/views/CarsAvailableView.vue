<script setup>
    import { request, controller } from '../stores';
    import { onMounted, ref } from "vue";
    import saves from '../stores/saves.js';
    import IconFilter from '../components/icons/IconFilter.vue';
    import Card from '../components/Card.vue';

    let motorisations = ref();

    if (saves().findValue('MotorisationDispos')){
        motorisations.value = saves().findValue('MotorisationDispos').value
    }
    else
    {
        request().access();
        onMounted(async () => {
            controller().VehiculeDemonstrationsController.GetAll()
            .then((response) => {
                motorisations.value = response.data;
                saves().save('MotorisationDispos', motorisations.value);
                request().success(response);
                console.log(motorisations.value);
            })
            .catch((error) => {
                request().error(error);
            });
        });
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
                <Card class="m-3" v-for="moto in motorisations" :title="moto.motosVehiculeNavigation.nomMotorisation" :resume="moto.motosVehiculeNavigation.description" :_img="moto.motosVehiculeNavigation.motorisationToOPM[0].photoOPM.url[0]"/>
            </div>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <!-- Sidebar content here -->
                <h1 class="font-bold">Type Model :</h1>
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
                    <select class="select select-bordered w-full p-2" name="" id="">
                        <option value="" selected>Aucune</option>
                        <!-- v-for Color In -->
                        <option v-for="i in 10" :value="i">{{ i }}</option>
                    </select>
                </li>
                <div class="divider"></div>
                <h1 class="font-bold mb-3">Couleur Extérieure :</h1>
                <li>
                    <select class="select select-bordered w-full p-2" name="" id="">
                        <option value="" selected>Aucune</option>
                        <!-- v-for Color Out -->
                        <option v-for="i in 10" :value="i">{{ i }}</option>
                    </select>
                </li>

                <div class="divider"></div>
                <h1 class="font-bold mb-3">Prix :</h1>
                <input type="number" min="0" max="100" placeholder="40" class="input input-bordered w-full mb-2" />
                <input type="range" min="0" max="100" value="40" class="range" />
            </ul>
        </div>
    </div>
</template>