<script setup>
  import { onMounted, ref } from "vue";

  // Stores
  import { request, controller } from '../stores';
  import saves from '../stores/saves.js';

  // Composants
  import InputForm from '../components/InputForm.vue';

  let compte = ref({});
  
  function Post()
  {
    request().access();
    onMounted(async () => {
        controller().ComptesController.Post()
        .then((response) => {
            console.log(response.data);
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    });
  }

  request().access();
  onMounted(async () => {
      controller().ComptesController.GetAll()
      .then((response) => {
          console.log(response.data);
          request().success(response);
      })
      .catch((error) => {
          request().error(error);
          request().debug();
      });
  });

  //function
  function ProAccount(event)
  {
    if(event.target.classList.contains("select-error")) {
      event.target.classList.remove("select-error","animate-pulse");
    }
    event.target.classList.add("select-success");
    if( event.target.value == 'proffessionnel')
    {
      document.querySelectorAll(".pro").forEach(item => {
        item.classList.remove("hidden");
      })
    }
    else
    {
      document.querySelectorAll(".pro").forEach(item => {
        item.classList.add("hidden");
      })
    }
  }

  function InputValidator(event) {
    if(event.target.checkValidity() && event.target.value != "") {
      if(event.target.classList.contains("input-error")) {
        event.target.classList.remove("input-error","animate-pulse");
      }
      event.target.classList.add("input-success");
    } 
    else {
      if(event.target.value == "" && !event.target.required) {
        if(event.target.classList.contains("input-success")) {
          event.target.classList.remove("input-success");
        }
        if(event.target.classList.contains("input-error")) {
          event.target.classList.remove("input-error","animate-pulse");
        }
      }
      else
      {
        if(event.target.classList.contains("input-success")) {
          event.target.classList.remove("input-success");
        }
        event.target.classList.add("input-error","animate-pulse");
      }
    }
  }

  function hiddeMessageBox(idmsg) {
    document.getElementById(idmsg).classList.add("hidden");
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

  function formValidator(){
    console.log(compte.value);
    let inputs = document.querySelectorAll("input");
    let select = document.querySelector("select");
    let error = false;
    inputs.forEach(input => {
      if(!input.checkValidity()) {
        input.classList.add("input-error","animate-pulse");
        error = true;
      }
    });
    if(select.value == "Type de Compte") {
      select.classList.add("select-error","animate-pulse");
      error = true;
    }
    if(error) {
      document.getElementById("msg_error").classList.remove("hidden");
    }
  }
</script>

<template>
  <form action="/" method="get" class="md:grid md:grid-cols-3">
    <div class="px-6 pt-6 md:p-6">
      <h1 class="text-2xl font-bold">Information Obligatoire</h1>
      <p class="py-3">Ces informations sont obligatoires pour la création d'un compte Tesla.</p>
    </div>
    <div class="col-span-2 m-3 p-6 rounded-xl shadow-xl">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <h1>Type de Compte : <span class="text-error">*</span></h1>
          <select v-model="compte.typeCompte" @change="ProAccount($event)" id="s_typCompt" class="select select-bordered w-full" required>
            <option value="personnel">Personnel</option>
            <option value="proffessionnel">Proffessionel</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <InputForm _label="Nom" :_input="{type:'text',placeholder:'Nom',required:true}" />
          <InputForm _label="Prénom" :_input="{type:'text',placeholder:'Prénom',required:true}" />
        </div>
        <div class="flex flex-col gap-1">
          <InputForm _label="Email" :_input="{type:'email',placeholder:'exemple@gmail.com',required:true}" />
        </div>
        <div class="flex flex-col gap-1">
          <div class="grid grid-col grid-cols-10 gap-3">
            <h1 class="col-span-9">Mot de passe : <span class="text-error">*</span></h1>
            <div class="tooltip tooltip-left" data-tip="1 majuscule, 1 minucule, 1 catatère spécial, 1 chiffre avec minimum 8 carctères">
              <span class="underline">i</span>
            </div>
          </div>
          <input v-model="compte.motDePasse" @change="InputValidator($event);" pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$" type="password" autocomplete="true" placeholder="************" class="input input-bordered w-full" required/>
        </div>
        <div class="flex flex-col gap-1">
          <h1>Confirmation mot de passe : <span class="text-error">*</span></h1>
          <input @change="InputValidator($event);SamePwd($event)" pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$" type="password" autocomplete="true" placeholder="************" class="input input-bordered w-full" required/>
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
          <InputForm _label="Numéro de téléphone" :_input="{type:'tel',placeholder:'+33000000000'}" />
        </div>
        <div class="grid grid-cols-3 gap-y-1 gap-3">
          <h1 class="col-span-3">Addresse :</h1>
          <input v-model="compte.numeroRue" @change="InputValidator($event)" type="number" min="1" max="1000" placeholder="9" class="input input-bordered w-full" />
          <input v-model="compte.nomRue" @change="InputValidator($event)" type="text" placeholder="rue des usines" class="input input-bordered w-full"/>
          <input v-model="compte.ville" @change="InputValidator($event)" type="text" placeholder="Annecy" class="input input-bordered w-full"/>
        </div>
        <div class="flex flex-col gap-1">
          <InputForm _label="Code Postal" :_input="{type:'text',placeholder:'74000'}" />
        </div>
      </div>
    </div>

    <!-- Compte Pro -->

    <div class="divider hidden mx-6 md:col-span-3 pro"></div> 

    <div class="px-6 md:p-6 hidden pro">
      <h1 class="text-2xl font-bold">Compte Proffessionnel</h1>
      <p class="text-gray-500 py-3">Ces informations ne sont pas nécéssaire pour la création d'un compte. De plus seul les comptes proffessionnel peuvent remplir ces données</p>
    </div>
    <div class="hidden col-span-2 m-3 p-6 rounded-xl shadow-xl  pro">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <InputForm _label="Nom de l'entreprise" :_input="{type:'text',placeholder:'Tesla'}" />
        </div>
        <div class="flex flex-col gap-1">
          <InputForm _label="Numéro de TVA" :_input="{type:'text',pattern:'^[A-Z]{2}[0-9]{11}',placeholder:'FR0000000000'}" />
        </div>
      </div>
    </div>

    <span class="flex align-middle justify-center items-center md:col-span-3 m-6">
      <button type="submit" @click="formValidator()" value="submit" class="btn w-full shadow-xl">Créer le Compte</button>
    </span>
    
  </form>

  <!-- Error Message -->
  <div id="msg_error" class="fixed hidden w-[75vw] right-0 bottom-[5vh] alert alert-error shadow-lg">
    <div>
      <svg @click="hiddeMessageBox('msg_error')" xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Erreur ! Un des champs de saisie est invalide ou incomplet.</span>
    </div>
  </div>

</template>