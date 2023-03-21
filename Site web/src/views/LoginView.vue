<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { onMounted, ref } from "vue";

    // Stores
    import { request, controller } from '../stores';

    // Composants
    import InputForm from '../components/InputForm.vue';

    let mail = ref();
    let mdp = ref();

    async function Login()
    {
        request().access();
        await controller().ComptesController.GetByEmail(mail.value)
        .then((response) => {
            if(response.data.motDePasse == mdp.value)
                localStorage.user = response.data;
            console.log(localStorage.user);
            request().success(response);
        })
        .catch((error) => {
            request().error(error);
            request().debug();
        });
    }
</script>

<template>
    <div class="hero min-h-[calc(100vh-288px)] bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
        <h1 class="text-5xl py-6 font-bold">Se connecter</h1>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
            <div class="form-control">
            <label class="label">
                <span class="label-text">Email</span>
            </label>
            <InputForm @emit-value="mail.value = $event" :_input="{type:'text',placeholder:'email',required:true}" />
            </div>
            <div class="form-control">
            <label class="label">
                <span class="label-text">Mot de passe</span>
            </label>
            <InputForm @emit-value="mdp.value = $event" :_input="{type:'password',pattern:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$',placeholder:'************',required:true}" />
            <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
            </div>
            <div class="form-control mt-6">
            <button @click="Login()" class="btn btn-primary">Connecter</button>
            <label class="label">
                <RouterLink to="/createaccount" class="label-text-alt underline link link-hover">Créer un Compte</RouterLink>
            </label>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>