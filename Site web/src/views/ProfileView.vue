<script setup>
    import { ref } from 'vue';
    import { sha3_512 } from "js-sha3";

    import { store_compte } from '../stores/compte.js';
    import { request, controller } from '../stores';

    import InputForm from '../components/InputForm.vue';
    import Popup from '../components/Popup.vue';
    
    let _compte = ref(store_compte().compte);
    let mdpconfirm = ref(true);

    let popup =ref({
        show: false,
        title: "",
        description: "",
        confirm: false
    });

    function Progress()
    {
        let count = 0;
        let total = 0;
        for( let key in _compte)
        {
            if(_compte[key] == null || _compte[key] == "")
            {
                count += 1;
            }
            total += 1;
        }
        return ((total-count)/total)*100;
    }

    async function Put()
    {   
        request().access();
        await controller().ComptesController.Put(_compte.value.idCompte,_compte.value, store_compte().token)
        .then((response) => {
            store_compte().editCompte(_compte.value);
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    }

    async function Delete()
    {
        request().access();
        await controller().ComptesController.Delete(_compte.value.idCompte, store_compte().token)
        .then((response) => {
            store_compte().logout();
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    }

    function formValidator(){
        let inputs = document.querySelectorAll("input");
        let error = !mdpconfirm;

        // Detect Error Form
        inputs.forEach(input => {
        if(!input.checkValidity()) {
            error = true;
        }
        });

        if(_compte.value.typeCompte == "proffessionnel") {
            if(!_compte.value.nomEntreprise || !_compte.value.numTVA || _compte.value.nomEntreprise == "" || _compte.value.numTVA == "")
                error = true;
        }

        if(error) {
            request().addAlert("alert-error","Erreur ! Veuillez remplir correctement les champs obligatoires");
        }
        else{
            Put();
        }
    }
</script>

<template>
    <div v-if="request().requestState">
        <div class="stats w-full">
            <div class="stat flex flex-col items-center gap-2">
                <div class="stat-title">Bonjour, {{ _compte.prenomCompte }} {{ _compte.nomCompte }}</div>
                <div class="stats stats-vertical md:stats-horizontal shadow">
                    <div class="stat">
                        <div class="stat-title">Type de Compte</div>
                        <div class="stat-value">{{ _compte.typeCompte }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Donnée récoltée</div>
                        <div class="stat-value">{{ (_compte.dataCollect)?'oui':'non' }}</div>
                    </div>
                    <div class="stat gap-2">
                        <div class="stat-title">Progression du compte</div>
                        <div class="stat-value">{{ Progress() }} %</div>
                        <progress class="progress progress-success" :value="Progress()" max="100"></progress>
                    </div>
                </div>
            </div>
        </div>
        <div class="divider mx-4"></div>
        <!-- Modification Compte -->
        <div class="flex flex-col m-3 gap-3">
            <!-- Compte Perso -->
            <div class="flex flex-col gap-1">
                <h1>Email :</h1>
                <InputForm :_input="{ type:'text',placeholder:`${ _compte.email }`}" disabled/>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                    <h1>Nom :</h1>
                    <InputForm @emit-value="_compte.nomCompte = $event" :_input="{ type:'text',placeholder:`${ _compte.nomCompte }`}"/>
                </div>
                <div class="flex flex-col gap-1">
                    <h1>Prénom :</h1>
                    <InputForm @emit-value="_compte.prenomCompte = $event" :_input="{ type:'text',placeholder:`${ _compte.prenomCompte }`}"/>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <h1>Mot de Passe :</h1>
                <InputForm @emit-value="_compte.motDePasse = sha3_512($event)" :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************'}"/>
            </div>
            <div class="flex flex-col gap-1">
                <h1>Confirmation mot de passe :</h1>
                <InputForm @emit-value="mdpconfirm = (sha3_512($event) == _compte.motDePasse);" :class="(_compte.motDePasse)?(mdpconfirm)?'input-success':'input-error animate-pulse':''" :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************'}" />
            </div>
            <div class="flex flex-col gap-1">
                <h1>Adresse :</h1>
                <div class="flex flex-col md:grid md:grid-cols-4 gap-3">
                    <InputForm @emit-value="_compte.numeroRue = $event" :_input="{ type:'number',placeholder:`${ _compte.numeroRue }`, min:0}"/>
                    <InputForm @emit-value="_compte.nomRue = $event" :_input="{ type:'text',placeholder:`${ _compte.nomRue }`}"/>
                    <InputForm @emit-value="_compte.ville = $event" :_input="{ type:'text',placeholder:`${ _compte.ville }`}"/>
                    <InputForm @emit-value="_compte.codepostal = $event" :_input="{type:'text',placeholder:`${ _compte.codepostal }`}" />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <h1>Numéro de Téléphone :</h1>
                <InputForm @emit-value="_compte.numeroTelephone = $event" :_input="{type:'tel',placeholder:`${ _compte.numeroTelephone }`}" />
            </div>
            <div class="divider mx-[40%]"></div>
            <!-- Compte Pro -->
            <div v-if="_compte.typeCompte == 'proffessionnel'" class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                    <h1>Nom Entreprise :</h1>
                    <InputForm @emit-value="_compte.nomEntreprise = $event" :_input="{type:'text',placeholder:`${ _compte.nomEntreprise }`}" />
                </div>
                <div class="flex flex-col gap-1">
                    <h1>TVA :</h1>
                    <InputForm @emit-value="_compte.numTVA = $event" :_input="{type:'text',pattern:'^[A-Z]{2}[0-9]{11}',placeholder:`${ _compte.numTVA }`}" />
                </div>
                <div class="divider mx-[40%]"></div>
            </div>
            <button @click="popup = {
                show : true,
                title : 'Modification',
                description : 'Toutes les modifications seront prises en compte voulez-vous continuer ?',
                confirm : true
            };" class="btn">Modifier</button>
            <button @click="popup = {
                show : true,
                title : 'Suppression',
                description : 'Cette action est irréversible voulez-vous quand même continuer ?',
                confirm : true
            };" class="btn btn-warning">Supprimer Compte</button>
        </div>
    
        <!-- Popup -->
        <Popup :show="popup.show" @confirm="(popup.title == 'Modification')?formValidator():Delete()" @close="popup.show = false" :title="popup.title" :description="popup.description" :confirm="popup.confirm"/>
    </div>
</template>