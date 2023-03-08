<script setup>
    import { useRoute, RouterLink, onBeforeRouteUpdate } from 'vue-router';

    import Carousel from '../components/Carousel.vue';
    import RadioButton from '../components/RadioButton.vue';
    import BreadCrumbs from '../components/Breadcrumbs.vue';

    const route = useRoute();
    const title = route.params.title;

    let BreadCrumbsItems = [
        {title:'Motorisation',href:'/models'},
        {title:title}
    ]
</script>

<template>
    <div>
        <BreadCrumbs class="mx-6 mt-3" :_items="BreadCrumbsItems"/>
        <div class="h-[60vh] p-3">
            <Carousel :hiden="{
                title:true,
                number:true
            }"/>
        </div>
        <div class="grid grid-cols-2 p-3 gap-3">
            <div class="flex flex-col gap-4 p-3">
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl font-bold">Model : <span class="underline">{{ title }}</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nam eaque pariatur nostrum rem, aut in. Sapiente, fuga! Nostrum praesentium amet excepturi veniam atque ducimus repudiandae pariatur dolorem ad nisi!</p>
                </div>
                <div>
                    <h2 class="text-lg">Caratéristique :</h2>
                    <div class="w-full stats stats-vertical xl:stats-horizontal shadow">
                        <div class="stat">
                            <div class="stat-title">Vitesse maximale</div>
                            <div class="stat-value text-primary">250 km/h</div>
                        </div>
                        <div class="stat">
                            <div class="stat-title">Autonomie</div>
                            <div class="stat-value text-secondary">634 km</div>
                        </div>
                        <div class="stat">
                            <div class="stat-title">Accélération 0-100</div>
                            <div class="stat-value">3,2 s</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-lg">Caractéristiques principales :</h2>
                    <ul class="ml-6">
                        <li>Transmission Intégrale</li>
                        <li>Autopilot Standard </li>
                        <li>Recharge facile</li>
                        <li>Mode Sentinelle</li>
                        <li>Suspension adaptative</li>
                        <li>Vaste espace de stockage</li>
                        <li>Application mobile Tesla</li>
                    </ul>
                </div>
            </div>
            <div class="border-2 p-6 shadow-xl rounded-xl">
                <h1 class="text-3xl font-bold">Prix : <span class="text-accent">11 5000 €</span></h1>
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