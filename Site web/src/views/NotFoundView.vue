<script setup>
    import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="hero min-h-[calc(100vh-64px)] bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
            <h1 class="text-5xl text-primary font-bold">Erreur 404</h1>
            <div class="py-6">
                <p class="pb-3">
                    La page que vous recherchez n'existe pas.</p>
                <p>
                    Il est possible que l'URL ait été modifiée ou que la page ait été supprimée.
                    Vous pouvez retourner à la page d'accueil en cliquant soit sur le bouton ci-dessous ou sur le logo Tesla en haut à gauche.
                </p>
            </div>
            <RouterLink to="/" class="btn btn-primary">Page d'acceuil</RouterLink>
            </div>
        </div>
    </div>
</template>