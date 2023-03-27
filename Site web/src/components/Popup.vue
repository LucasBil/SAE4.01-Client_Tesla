<script setup>
    import { ref, watch } from 'vue';
    const props = defineProps({
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            required: true
        },
        confirm: {
            type: Boolean,
            default: false
        }
    })

    const isPopupOpen = ref(props.show)
    
    watch(() => props.show, (newValue) => {
        isPopupOpen.value = newValue
    })

    const emit = defineEmits(
        ['close']
        ['close_not_conform'],
        ['confirm'])

    function Emit(emitname,params)
    {
        isPopupOpen.value = false;
        emit('close',true);
        emit(emitname,params);
    }


</script>

<template>
    <div v-if="isPopupOpen" class="fixed top-0 bottom-0 w-screen h-screen flex flex-col items-center justify-center">
        <div class="w-[80%] rounded-lg bg-base-200 shadow-xl">
            <svg @click="Emit('close_not_conform',true)" xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6 m-3" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            
            <div class="flex flex-col items-center mb-3 gap-3">
                <h1 class="font-bold text-xl">{{ title }}</h1>
                <p v-if="typeof(description) == 'string'" class="text-center w-[80%]">{{ description }}</p>
                <div v-else class="w-[80%]">
                    <component :is="description"></component>
                </div>
                <button @click="Emit('confirm',true)" v-if="confirm" class="btn btn-info w-[80%]"> Confirmer </button>
            </div>
        </div>
    </div>
</template>