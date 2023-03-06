<script setup></script>

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
            <input type="text" placeholder="email" class="input input-bordered" />
            </div>
            <div class="form-control">
            <label class="label">
                <span class="label-text">Mot de passe</span>
            </label>
            <input type="password" placeholder="************" class="input input-bordered" />
            <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
            </div>
            <div class="form-control mt-6">
            <button class="btn btn-primary">Connecter</button>
            <label class="label">
                <a href="/createaccount" class="label-text-alt underline link link-hover">Créer un Compte</a>
            </label>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>