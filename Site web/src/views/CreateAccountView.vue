<script setup>
  import { onMounted, ref } from "vue";
  import router from '../router';
  import { sha3_512 } from "js-sha3";

  // Stores
  import { request, controller } from '../stores';
  import { compte } from '../stores/compte.js'

  // Composants
  import InputForm from '../components/InputForm.vue';

  let _compte = ref({});
  let mdpconfirm = ref(false);
  let connection = ref();

  async function Post()
  {
    request().access();
    await controller().ComptesController.Post(_compte.value)
    .then((response) => {
      connection = response.data;
        // Get Compte to database
        controller().ComptesController.GetByEmail(_compte.value.email)
        .then((response) => {
          // Get Token
          controller().ComptesController.GetToken(response.data)
          .then((response) => {
            compte().login(connection, response.data.token);
          })
          .catch((error) => {
            request().error(error);
            request().debug();
          });
          request().success(response);
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
  }

  //function
  function formValidator(){
    let inputs = document.querySelectorAll("input");
    let error = false;


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
    else
    {
      Post();
    }
  }
</script>

<template>
  <div v-if="request().requestState">
    <div class="md:grid md:grid-cols-3"> <!-- Form -->
      <div class="px-6 pt-6 md:p-6">
        <h1 class="text-2xl font-bold">Information Obligatoire</h1>
        <p class="py-3">Ces informations sont obligatoires pour la création d'un compte Tesla.</p>
      </div>
      <div class="col-span-2 m-3 p-6 rounded-xl shadow-xl">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <h1>Type de Compte : <span class="text-error">*</span></h1>
            <select @change="_compte.typeCompte = $event.target.value" :class="(_compte.typeCompte)?'select-success':'select-error animate-pulse'" id="s_typCompt" class="select select-bordered w-full" required>
              <option selected disabled>Type de Compte</option>
              <option value="personnel">Personnel</option>
              <option value="proffessionnel">Proffessionel</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <h1>Nom : <span class="text-error">*</span></h1>
              <InputForm @emit-value="_compte.nomCompte = $event" :_input="{type:'text',placeholder:'Nom',required:true}" />
            </div>
            <div>
              <h1>Prénom : <span class="text-error">*</span></h1>
              <InputForm @emit-value="_compte.prenomCompte = $event" :_input="{type:'text',placeholder:'Prénom',required:true}" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h1>Email : <span class="text-error">*</span></h1>
            <InputForm @emit-value="_compte.email = $event" :_input="{type:'email',placeholder:'exemple@gmail.com',required:true}" />
          </div>
          <div class="flex flex-col gap-1">
            <div class="grid grid-col grid-cols-10 gap-3">
              <h1 class="col-span-9">Mot de passe : <span class="text-error">*</span></h1>
              <div class="tooltip tooltip-left" data-tip="1 majuscule, 1 minucule, 1 catatère spécial, 1 chiffre avec minimum 8 carctères">
                <span class="underline">i</span>
              </div>
            </div>
            <InputForm @emit-value="_compte.motDePasse = sha3_512($event)" :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************',required:true}" />
          </div>
          <div class="flex flex-col gap-1">
            <h1>Confirmation mot de passe : <span class="text-error">*</span></h1>
            <InputForm @emit-value="mdpconfirm = (sha3_512($event) == _compte.motDePasse);" :class="(_compte.motDePasse)?(mdpconfirm)?'input-success':'input-error animate-pulse':''" :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************',required:true}" />
          </div>
        </div>
      </div>
  
      <div class="divider mx-6 md:col-span-3"></div> 
  
      <div class="px-6 md:p-6">
        <h1 class="text-2xl font-bold">Information Complémentaire</h1>
        <p class="text-gray-500 py-3">Ces informations ne sont en rien nécéssaire pour la création d'un compte. Néamnoins elle peuvent nous permettre de vous proposez un meilleur service.</p>
      </div>
      <div class="col-span-2 m-3 p-6 rounded-xl shadow-xl ">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <h1>Numéro de Téléphone :</h1>
            <InputForm @emit-value="_compte.numeroTelephone = $event" :_input="{type:'tel',placeholder:'+33000000000'}" />
          </div>
          <div class="grid grid-cols-3 gap-y-1 gap-3">
            <h1 class="col-span-3">Addresse :</h1>
            <InputForm @emit-value="_compte.numeroRue = $event" :_input="{type:'number',placeholder:'9',min:1,max:1000}" />
            <InputForm @emit-value="_compte.nomRue = $event" :_input="{type:'text',placeholder:'rue des usines'}" />
            <InputForm @emit-value="_compte.ville = $event" :_input="{type:'text',placeholder:'Annecy'}" />
          </div>
          <div class="flex flex-col gap-1">
            <h1 class="col-span-3">Code Postal :</h1>
            <InputForm @emit-value="_compte.codepostal = $event" :_input="{type:'text',placeholder:'74000'}" />
          </div>
        </div>
      </div>
  
      <!-- Compte Pro -->
  
      <div v-if="(_compte.typeCompte == 'proffessionnel')" class="divider mx-6 md:col-span-3 pro"></div> 
  
      <div v-if="(_compte.typeCompte == 'proffessionnel')" class="px-6 md:p-6 pro">
        <h1 class="text-2xl font-bold">Compte Proffessionnel</h1>
        <p class="text-gray-500 py-3">Ces informations ne sont pas nécéssaire pour la création d'un compte. De plus seul les comptes proffessionnel peuvent remplir ces données</p>
      </div>
      <div v-if="(_compte.typeCompte == 'proffessionnel')" class="col-span-2 m-3 p-6 rounded-xl shadow-xl  pro">
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <h1>Nom Entreprise : <span class="text-error">*</span></h1>
            <InputForm @emit-value="_compte.nomEntreprise = $event" _label="Nom de l'entreprise" :_input="{type:'text',placeholder:'Tesla'}" />
          </div>
          <div class="flex flex-col gap-1">
            <h1>TVA : <span class="text-error">*</span></h1>
            <InputForm @emit-value="_compte.numTVA = $event" _label="Numéro de TVA" :_input="{type:'text',pattern:'^[A-Z]{2}[0-9]{11}',placeholder:'FR0000000000'}" />
          </div>
        </div>
      </div>
  
      <span class="flex align-middle justify-center items-center md:col-span-3 m-6">
        <button @click="formValidator()" class="btn w-full shadow-xl">Créer le Compte</button>
      </span>
      
    </div>
  
  </div>

</template>