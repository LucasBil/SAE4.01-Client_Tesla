<script setup>
    import { onMounted, ref } from 'vue'; 
    
    // Stores
    import { request , controller } from '../stores';
    import saves from '../stores/saves';
    import pdf from '../stores/pdf';

    import html2pdf from 'html2pdf.js'
    
    let motorisation = pdf().motorisation;
    let options = pdf().options;
    let price = pdf().price;
    let caracteristiques = ref([]);

    onMounted(() => {
        if (saves().findValue(`Caractéristiques_Mototrisation${motorisation.idMotorisation}`))
        {
            caracteristiques.value = saves().findValue(`Caractéristiques_Mototrisation${motorisation.idMotorisation}`).value;
        }
        else
        {
            request().access();
            controller().CaracteristiquesController.GetByIdMotorisation(motorisation.idMotorisation)
            .then((response) => {
                caracteristiques.value = response.data;
                request().success(response)
            })
            .catch((error) => {
                request().error(error);
                request().debug();
            });
        }
    });

    function generatePDF() {
        const element = document.getElementById('PDF') // Remplacer 'content' par l'id de votre élément HTML
        const options = {
            margin: [0, 0, 0, 0], // Définir les marges
            filename: 'mon-fichier.pdf', // Définir le nom du fichier PDF
            image: { type: 'jpeg', quality: 0.98 }, // Définir la qualité de l'image
            html2canvas: { scale: 2 }, // Définir l'échelle de l'image HTML
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } // Définir le format et l'orientation du PDF
        }
        html2pdf().from(element).set(options).output('dataurlnewwindow')
    }

    function FormatPrice(price){
        return Intl.NumberFormat('fr-FR', {  style: 'currency', currency: 'EUR' }).format(price);
    }

    function Test(msg) {
        console.log(msg);
    }
</script>

<template>
    <div id="PDF" class="flex flex-col gap-3 items-center m-3 p-6 min-h-screen border-4 border-neutral">
        <img class="" src="" alt="Voiture">
        <h1 class="text-xl font-bold">Motorisation : {{ motorisation.nomMotorisation }}</h1>
        <div class="flex flex-col gap-6">
            <div>
                <h2 class="text-lg font-semibold underline relative left-6">Description : </h2>
                <p>{{ motorisation.description }}</p>
            </div>
            <div class="grid grid-cols-4 gap-3">
                <div class="flex align-middle items-center">
                    <div class="stats shadow">
                        <div class="stat">
                                <div class="stat-title">Classe Energétique</div>
                                <div class="stat-value text-green-500">{{ motorisation.classeEnergetique }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-3 col-span-3">
                    <div v-for="caracteristique in caracteristiques" class="stats stats-vertical shadow col-span-3">
                            <div v-if="!caracteristique.description" class="stat">
                                    <div class="stat-title">{{ caracteristique.nomCaracteristique }}</div>
                                    <div class="stat-value whitespace-normal">{{ caracteristique.motorisationsNavigation[0].valeurCar }} {{ caracteristique.unite }}</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table w-full">
            <thead>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{ motorisation.nomMotorisation }}</td>
                    <td> - </td>
                    <td>{{ FormatPrice(motorisation.prix) }}</td>
                </tr>
                <tr v-for="option in options">
                    <td>{{ option.libelleOption }}</td>
                    <td>{{ (option.description)?option.description:'-' }}</td>
                    <td>{{ (option.coutAdditionnel)?FormatPrice(option.coutAdditionnel):'0 €' }}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td> - </td>
                    <td>{{ price }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <button @click="generatePDF()" class="btn btn-outline btn-ghost fixed m-3 bottom-0 right-0">Dowload</button>
</template>