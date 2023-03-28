<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';
    import { onMounted, ref } from "vue";

    // Stores
    import { request , controller } from '../stores';
    import saves from '../stores/saves';
    import pdf from '../stores/pdf';

    // Modeles
    import Modeles from '../modeles';

    // Composants
    import Carousel from '../components/Carousel.vue';
    import BreadCrumbs from '../components/Breadcrumbs.vue';
    import { createPinia } from 'pinia';

    const route = useRoute();
    const nomModele = route.params.nomModele;

    // Variable Request
    let model = ref({});
    let motorisations = ref([{}]);
    let type_options = ref([]);
    let caracteristiques = ref([]);

    let motorisationview = ref({}); // view Motorisation
    let type_optionview = ref({}) // view Type Option <= Motorisation View
    let caracteristiqueview = ref({}); // view Caractéristique <= Motorisation View

    //-----------------------------
    let selected_options = ref([]);

    let BreadCrumbsItems = [
        {title:'Modeles',href:'/models'},
        {title:nomModele}
    ]

    let carousel = ref([]);

    request().access();
    onMounted(async () => {
        // Get Model
        controller().ModelesController.GetByName(nomModele)
        .then((response) => {
            model.value = response.data;
            // GetAll Motorisation <= Model
            controller().MotorisationsController.GetByIdModel(model.value.idModele)
            .then((response) => {
                motorisations.value = response.data;
                motorisationview.value = motorisations.value[0];

                Promise.all(motorisations.value.map(m => {
                    // Get Options for all motorisation
                    const promiseTY = controller().TypeOptionsController.GetByIdMotorisation(m.idMotorisation)
                    .then((response) => {
                        type_options.value.push(response.data);
                    })
                    .catch((error) => {
                        request().error(error);
                        request().debug();
                    });

                    const promiseCA = controller().CaracteristiquesController.GetByIdMotorisation(m.idMotorisation)
                    .then((response) => {
                        caracteristiques.value.push(response.data);
                    })
                    .catch((error) => {
                        request().error(error);
                        request().debug();
                    });

                    return promiseTY, promiseCA;
                })).then(() => {
                    type_optionview.value = type_options.value[0];
                    DefaultOption();
                    CarouselInit(motorisationview.value.idMotorisation,selected_options.value[0].idOption)
                    caracteristiqueview.value = caracteristiques.value[0];
                });
                request().success();
            })
            .catch((error) => {
                //console.log(error)
                //request().error(error);
                //request().debug();
            })
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        })
    })

    function CarouselInit(idMotorisation,idOption)
    {
        carousel.value = [];
        controller().PhotosController.GetByIdMotorisationANDOption(idMotorisation,idOption)
        .then((response) => {
            console.log(response.data)
            response.data.url.forEach(element => {
                        carousel.value.push({
                            title: '',
                            link: `http://${element}`
                    })
                });
            console.log(carousel.value)
        })
        .catch((error) => 
        {
            console.log(error)
        })
    }

    function TotalPrice(){
        let total = 0;
        total += motorisationview.value.prix;
        for (const [key,option] of selected_options.value.entries()) {
            if(option.coutAdditionnel)
                total += option.coutAdditionnel;
        }
        return Intl.NumberFormat('fr-FR', {  style: 'currency', currency: 'EUR' }).format(total);
    }

    function DefaultOption()
    {
        for(const [TY_key,type_option] of type_optionview.value.entries())
        {
            for(const [TO_key,option] of type_option.optionsNavigation.entries())
            {
                if(option.description == "De série")
                {
                    selected_options.value[TY_key] = option;
                }
            }
        }
    }

    function SwitchMotorisation(key)
    {
        motorisationview.value = motorisations.value[key];
        type_optionview.value = type_options.value[key];
        CarouselInit(motorisationview.value.idMotorisation,selected_options.value[0].idOption)
        caracteristiqueview.value = caracteristiques.value[key];
    }

    function Test(msg)
    {
        console.log(msg);
    }


</script>

<template>
    <input @click="Test(Modeles /*.Motorisation.prototype.motorisationToOPM[0]*/)" type="checkbox" />
    <div v-if="request().requestState">
        <BreadCrumbs class="mx-6 mt-3" :_items="BreadCrumbsItems"/>
        <div class="h-[60vh] p-3">
            <Carousel 
            :_imgs="carousel"
            :hiden="{
                title: true,
                number:true
            }"/>
        </div>
        <div class="flex m-3 gap-3 justify-center">
            <button @click="SwitchMotorisation(key)" v-for="motorisation,key in motorisations" class="btn">
                {{ motorisation.nomMotorisation }}
            </button>
        </div>

        <div class="md:grid md:grid-cols-2 p-3 gap-3">
            <div class="flex flex-col gap-4 p-3">
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl font-bold">Motorisation : <span class="underline">{{ motorisationview.nomMotorisation }}</span></h1>
                    <p>{{ motorisationview.description }}</p>
                </div>
                <div>
                    <h2 class="text-lg font-bold">Caratéristique :</h2>
                    <div class="w-full stats stats-vertical shadow">
                        <div v-for="caracteristique in caracteristiqueview" class="stat">
                            <div v-if="!caracteristique.description" class="stat-title">{{caracteristique.nomCaracteristique }}</div>
                            <div v-if="!caracteristique.description" class="stat-value text-primary whitespace-normal">{{ `${caracteristique.motorisationsNavigation[0].valeurCar} ${(caracteristique.unite==null)?'':caracteristique.unite}`}}</div>
                            <div v-else tabindex="0" class="collapse collapse-arrow  border-base-300 bg-base-100 rounded-box">
                                <div class="collapse-title text-xl font-medium">
                                    {{ caracteristique.nomCaracteristique }}
                                </div>
                                <div class="collapse-content"> 
                                    <p>{{ caracteristique.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-2 p-6 shadow-xl rounded-xl">
                <h1 class="text-3xl font-bold">Prix : <span class="text-accent"> {{ TotalPrice() }}</span></h1>
                
                <div class="flex flex-col my-2 gap-3">
                    <div v-for="typeoption,key in type_optionview" class="my-2">
                           
                        <div v-if="typeoption.nomType != 'Autres options'">
                            <h1 class="mb-2">{{ typeoption.nomType }} :</h1>
                            <select @change="(key==0)?CarouselInit(motorisationview.idMotorisation,selected_options[0].idOption):Test('Hop')" v-model="selected_options[key]" class="select select-primary w-full">
                                <option v-for="option in typeoption.optionsNavigation" :value="option ">{{ `${option.libelleOption} ${(option.description)?`(${option.description})`:''}` }}</option>
                            </select>
                        </div>
                        
                        <div v-else class="p-3">    
                            <h1 class="mb-2">{{ typeoption.nomType }} :</h1>
                            <div class="flex flex-col gap-3"> 

                                <div v-for="option,key2 in typeoption.optionsNavigation" class="p-3">
                                    <div class="form-control">
                                        <label class="cursor-pointer label">
                                            <span class="label-text">{{ option.libelleOption }}</span> 
                                            <input type="checkbox" @change="($event.target.checked)?selected_options[key+key2] = option:selected_options[key+key2] = {};" :value="option" class="toggle toggle-accent"/>
                                        </label>
                                    </div>
                                    <p class="text-sm">{{ option.description }}</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <div class="col-span-2 flex flex-col items-center gap-3 p-6">
                <RouterLink @click="pdf().save(motorisationview,selected_options,TotalPrice())" class="btn w-[75%] btn-outline btn-primary" :to="{ name:'pdf'}">
                    Générer un résumé en PDF
                </RouterLink>
                <button class="btn w-[75%] btn-warning">Commander</button>
            </div>
        </div>
    </div>
</template>