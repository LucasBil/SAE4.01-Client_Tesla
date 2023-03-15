<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';

    import { onMounted, ref } from "vue";
    import { request , controller } from '../stores';

    import Carousel from '../components/Carousel.vue';
    import RadioButton from '../components/RadioButton.vue';
    import BreadCrumbs from '../components/Breadcrumbs.vue';

    const route = useRoute();
    const nomModele = route.params.nomModele;

    let BreadCrumbsItems = [
        {title:'Modeles',href:'/models'},
        {title:nomModele}
    ]


    // Variable
    let model = ref({});
    let motorisations = ref([{}]);
    let caracteristiques = ref([{}]);
    let options = ref([{}]);

    let motorisationview = ref({});
    request().access();

    onMounted(async () => {
        // Get Model
        controller().ModelesController.GetByName(nomModele)
        .then((response) => {
            model.value = response.data;

            // Get Motorisations
            controller().MotorisationsController.GetByIdModel(model.value.idModele)
            .then((response) => {
                motorisations.value = response.data;
                motorisationview.value = motorisations.value[0];

                let requestsStatus = [false, false]

                // Get Caracteristiques
                controller().CaracteristiquesController.GetByIdMotorisation(motorisationview.value.idMotorisation)
                .then((response) => {
                    caracteristiques.value = response.data;
                    requestsStatus[0] = true;
                    if (requestsStatus[0] && requestsStatus[1])
                        request().success(response)
                })
                .catch((error) => {
                    request().error(error);
                    request().debug();
                });

                // Get Options
                controller().OptionsController.GetByIdMotorisation(motorisationview.value.idMotorisation)
                .then((response) => {
                    options.value = response.data;
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
        request().access();
        controller().CaracteristiquesController.GetByIdMotorisation(motorisationview.value.idMotorisation)
        .then((response) => {
            caracteristiques.value = response.data;
            request().success(response)
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    }
</script>

<template>
    <div v-if="request().requestState">
        <BreadCrumbs class="mx-6 mt-3" :_items="BreadCrumbsItems"/>
        <div class="h-[60vh] p-3">
            <Carousel :hiden="{
                title:true,
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
                    <h2 class="text-lg">Caratéristique :</h2>
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
                <h1 class="text-3xl font-bold">Prix : <span class="text-accent">{{ `${motorisationview.prix}` }}</span></h1>
                <div class="flex flex-col my-2 gap-3">
                    <div class="my-2">
                        <h1>Couleurs extérieures</h1>
                        <RadioButton :_radios="[
                            {
                                title: 'Blanc Nacré Multicouches',
                                checked:true
                            },
                            {
                                title: 'Noir Uni',
                                info:'1800€'
                            },
                            {
                                title: 'Gris Nuit Métallisé',
                                info:'2200€'
                            },
                            {
                                title: 'Bleu Outremer Métallisé',
                                info:'2200€'
                            },
                            {
                                title: 'Rouge Multicouches',
                                info:'2200€'
                            },
                        ]"/>
                    </div>
                    <div class="my-2">
                        <h1>Couleurs intérieures</h1>
                        <RadioButton :_radios="[
                            {
                                title: 'Noir',
                                checked:true
                            },
                            {
                                title: 'Blanc',
                                info:'2400€'
                            },
                            {
                                title: 'Beige',
                                info:'2400€'
                            }
                        ]"/>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div class="p-3">
                            <div class="form-control">
                                <label class="cursor-pointer label">
                                <span class="label-text">Pack de pneus hiver Pirelli 19"</span> 
                                <input type="checkbox" class="toggle toggle-accent" />
                                </label>
                            </div>
                            <p class="text-sm">Pneus hiver Pirelli P Zero présentant une faible résistance au roulement et une forte adhérence sur les routes enneigées. Ce pack comprend quatre jantes Tempest de 19" et leurs pneus montés, ainsi que des enjoliveurs</p>
                        </div>
                        <div class="p-3">
                            <div class="form-control">
                                <label class="cursor-pointer label">
                                <span class="label-text">Autopilot amélioré</span> 
                                <input type="checkbox" class="toggle toggle-accent" />
                                </label>
                            </div>
                            <p class="text-sm">Navigation en Autopilot Changement de voie auto Parking auto Sortie auto Sortie auto intelligente</p>
                        </div>
                        <div class="p-3">
                            <div class="form-control">
                                <label class="cursor-pointer label">
                                <span class="label-text">Capacité de conduite entièrement autonome</span> 
                                <input type="checkbox" class="toggle toggle-accent" />
                                </label>
                            </div>
                            <p class="text-sm">Toutes les fonctionnalités de l'Autopilot de base et de l'Autopilot amélioré Reconnaissance et réaction aux feux de signalisation et aux panneaux stop</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-2 flex flex-col items-center gap-3 p-6">
                <button class="btn w-[75%] btn-outline btn-primary">Générer un résumé en PDF</button>
                <button class="btn w-[75%] btn-warning">Commander</button>
            </div>
        </div>
    </div>
</template>