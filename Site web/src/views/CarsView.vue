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
    import RadioButton from '../components/RadioButton.vue';
    import BreadCrumbs from '../components/Breadcrumbs.vue';
import { parse } from '@vue/compiler-dom';

    const route = useRoute();
    const nomModele = route.params.nomModele;

    let BreadCrumbsItems = [
        {title:'Modeles',href:'/models'},
        {title:nomModele}
    ]


    // Variable
    let model = ref();
    let motorisations = ref([{}]);
    let caracteristiques = ref([{}]);
    let options = ref([{}]);
    let typeoptions = ref([{}]);

    let motorisationview = ref({});

    if(!saves().findValue(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`) || !saves().findValue(`Options_Mototrisation${motorisationview.value.idMotorisation}`))
    {
        request().access();
    }
    
    onMounted(async () => {
        // Get Model
        controller().ModelesController.GetByName(nomModele)
        .then((response) => {
            model.value = Modeles.Modele.fromJson(response.data);

            // Get Motorisations
            controller().MotorisationsController.GetByIdModel(model.value.idModele)
            .then((response) => {
                motorisations.value = Modeles.Motorisation.fromJsonArray(response.data);
                motorisationview.value = motorisations.value[0];

                let requestsStatus = [false, false]
                if (saves().findValue(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`))
                {
                    caracteristiques.value = saves().findValue(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`).value;
                    requestsStatus[0] = true;
                }
                else
                {
                    // Get Caracteristiques
                    controller().CaracteristiquesController.GetByIdMotorisation(motorisationview.value.idMotorisation)
                    .then((response) => {
                        caracteristiques.value = response.data;
                        saves().save(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`, caracteristiques.value);
                        requestsStatus[0] = true;
                        if (requestsStatus[0] && requestsStatus[1])
                            request().success(response)
                    })
                    .catch((error) => {
                        request().error(error);
                        request().debug();
                    });
                }

                // if ( saves().findValue(`TypeOptions_Mototrisation${motorisationview.value.idMotorisation}`))
                // {
                //     options.value = saves().findValue(`Options_Mototrisation${motorisationview.value.idMotorisation}`);
                //     requestsStatus[1] = true;
                // }
                // Get Options
                controller().TypeOptionsController.GetByIdMotorisation(motorisationview.value.idMotorisation)
                .then((response) => {
                    typeoptions.value = response.data;
                    console.log(typeoptions.value)
                    saves().save(`TypeOptions_Mototrisation${motorisationview.value.idMotorisation}`, caracteristiques.value);
                    requestsStatus[1] = true;
                    if (requestsStatus[0] && requestsStatus[1])
                        request().success(response)
                })
                .catch((error) => {
                    request().error(error);
                    request().debug();
                });

            })
            .catch((error) => {
                request().error(error);
                request().debug();
            });
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    });

    async function SwitchMotorisation(){
        let requestsStatus = [false, false]

        if(!saves().findValue(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`) || !saves().findValue(`Options_Mototrisation${motorisationview.value.idMotorisation}`))
        {
            request().access();
        }

        if (saves().findValue(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`))
        {
            caracteristiques.value = saves().findValue(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`).value;
            requestsStatus[0] = true;
        }
        else
        {
            controller().CaracteristiquesController.GetByIdMotorisation(motorisationview.value.idMotorisation)
            .then((response) => {
                caracteristiques.value = response.data;
                saves().save(`Caractéristiques_Mototrisation${motorisationview.value.idMotorisation}`, caracteristiques.value);
                requestsStatus[0] = true;
                if (requestsStatus[0] && requestsStatus[1])
                    request().success(response)
            })
            .catch((error) => {
                request().error(error);
                request().debug();
            });
        }

        if ( saves().findValue(`Options_Mototrisation${motorisationview.value.idMotorisation}`))
        {
            options.value = saves().findValue(`Options_Mototrisation${motorisationview.value.idMotorisation}`);
            requestsStatus[1] = true;
        }
        else
        {
            controller().TypeOptionsController.GetByIdMotorisation(motorisationview.value.idMotorisation)
            .then((response) => {
                typeoptions.value = response.data;
                saves().save(`TypeOptions_Mototrisation${motorisationview.value.idMotorisation}`, caracteristiques.value);
                requestsStatus[1] = true;
                if (requestsStatus[0] && requestsStatus[1])
                    request().success(response)
            })
            .catch((error) => {
                request().error(error);
                request().debug();
            });
        }
    }

    // Price Calcul
    let selected_options = ref([])
    function TotalPrice(){
        // console.log(selected_options.value)
        let total = 0;
        total += motorisationview.value.prix;
        selected_options.value.forEach(option => {
            total += option.coutAdditionnel;

        });
        return Intl.NumberFormat('fr-FR', {  style: 'currency', currency: 'EUR' }).format(total);
    }

    let checkOption = {}
    function ToogleOption(option, event)
    {
        let value = event.checked
        
        //Les traveaux

        checkOption["0"]

        if(value)
        {
            checkOption[event.name] = event
            if( checkOption["1"] && checkOption["0"] )
            {
                if(event.name == "0" && checkOption["1"].checked)
                {
                    checkOption["1"].checked = false
                    selected_options.value.pop()
                }
                else if(event.name == "1" && checkOption["0"].checked)
                {
                    checkOption["0"].checked = false
                    selected_options.value.pop()
                }
            }
            selected_options.value.push(option)
        }
        else
        {
            selected_options.value.pop()
            checkOption[event.name] = event
        }

        console.log(selected_options._rawValue[0])
    }


    function Test(msg)
    {
        console.log(msg)
    }

</script>

<template>
    <div v-if="request().requestState">
        <BreadCrumbs class="mx-6 mt-3" :_items="BreadCrumbsItems"/>
        <div class="h-[60vh] p-3">
            <Carousel :hiden="{
                title: true,
                number:true
            }"/>
        </div>
        <div class="flex m-3 gap-3 justify-center">
            <button @click="motorisationview = motorisation; SwitchMotorisation()" v-for="motorisation in motorisations" class="btn">
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
                        <div v-for="caracteristique in caracteristiques" class="stat">
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
                <h1 class="text-3xl font-bold">Prix : <span class="text-accent">{{ `${TotalPrice()}` }}</span></h1>
                <!-- Options -->
                <div class="flex flex-col my-2 gap-3">
                    <div v-for="typeoption,key in typeoptions" class="my-2">
                        <!-- Options sauf Autres options -->
                        <div v-if="typeoption.nomType != 'Autres options'">
                            <h1 class="mb-2">{{ typeoption.nomType }} :</h1>
                            <select v-model="selected_options[key]" class="select select-primary w-full">
                                <option v-for="option in typeoption.optionsNavigation" :value="option">{{ `${option.libelleOption} ${(option.description)?`(${option.description})`:''}` }}</option>
                            </select>
                        </div>
                        <!-- Autres options -->
                        <div v-else class="p-3">    
                            <h1 class="mb-2">{{ typeoption.nomType }} :</h1>
                            <div class="flex flex-col gap-3">

                                <div v-for="option,key2 in typeoption.optionsNavigation" class="p-3">
                                    <div class="form-control">
                                        <label class="cursor-pointer label">
                                            <span class="label-text">{{ option.libelleOption }}</span> 
                                            <input :name="key2" @change="ToogleOption(option,$event.target)" type="checkbox" class="toggle toggle-accent"/>
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