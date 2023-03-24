<script setup>
    import { compte } from '../stores/compte.js';

    import InputForm from '../components/InputForm.vue';
    
    let _compte = compte().getJsoncompte();

    function Progress()
    {
        for( let key in _compte)
        {
            if(_compte[key] == null || _compte[key] == "")
            {
                console.log(key);
            }
        }
    }

    function SamePwd(event)
    {
        let pwd = document.querySelectorAll("input[type='password']");
        if(pwd[0].value == pwd[1].value)
        {
        if(pwd[0].classList.contains("input-error")) {
            pwd[0].classList.remove("input-error","animate-pulse");
        }
        pwd[0].classList.add("input-success");
        if(pwd[1].classList.contains("input-error")) {
            pwd[1].classList.remove("input-error","animate-pulse");
        }
        pwd[1].classList.add("input-success");
        pwd[1].setCustomValidity('');
        }
        else
        {
        if(pwd[0].classList.contains("input-success")) {
            pwd[0].classList.remove("input-success");
        }
        pwd[0].classList.add("input-error","animate-pulse");
        if(pwd[1].classList.contains("input-success")) {
            pwd[1].classList.remove("input-success");
        }
        pwd[1].classList.add("input-error","animate-pulse");
        pwd[1].setCustomValidity("Mot de Passe non identique");
        }
    }
</script>

<template>
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
                    <div class="stat-value">10 %</div>
                    <progress class="progress progress-success" value="10" max="100"></progress>
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
                <InputForm :_input="{ type:'text',placeholder:`${ _compte.nomCompte }`}"/>
            </div>
            <div class="flex flex-col gap-1">
                <h1>Prénom :</h1>
                <InputForm :_input="{ type:'text',placeholder:`${ _compte.prenomCompte }`}"/>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <h1>Mot de Passe :</h1>
            <InputForm :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************'}"/>
        </div>
        <div class="flex flex-col gap-1">
            <h1>Confirmation mot de passe :</h1>
            <InputForm @change="SamePwd($event)" :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************'}" />
        </div>
        <div class="flex flex-col gap-1">
            <h1>Adresse :</h1>
            <div class="flex flex-col md:grid md:grid-cols-4 gap-3">
                <InputForm :_input="{ type:'number',placeholder:`${ _compte.numeroRue }`, min:0}"/>
                <InputForm :_input="{ type:'text',placeholder:`${ _compte.nomRue }`}"/>
                <InputForm :_input="{ type:'text',placeholder:`${ _compte.ville }`}"/>
                <InputForm :_input="{type:'text',placeholder:`${ _compte.codepostal }`}" />
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <h1>Numéro de Téléphone :</h1>
            <InputForm :_input="{type:'tel',placeholder:`${ _compte.numeroTelephone }`}" />
        </div>
        <div class="divider mx-[40%]"></div>
        <!-- Compte Pro -->
        <div v-if="_compte.typeCompte == 'professionnel'" class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
                <h1>Nom Entreprise :</h1>
                <InputForm :_input="{type:'text',placeholder:'Tesla'}" />
            </div>
            <div class="flex flex-col gap-1">
                <h1>TVA :</h1>
                <InputForm :_input="{type:'text',pattern:'^[A-Z]{2}[0-9]{11}',placeholder:'FR0000000000'}" />
            </div>
            <div class="divider mx-[40%]"></div>
        </div>
        <button @click="Progress()" class="btn">Modifier</button>
        <button class="btn btn-warning">Supprimer Compte</button>
    </div>
</template>