<script setup>

    defineProps({
        _label: {
            type: String,
            default: '_label',
            required: true
        },
        _input:{
            type: Array,
            default:{
                type:'text',
                placeholder:'_input.placeholder',
                pattern:'',
                min:null,
                max:null,
                required: false
            },
            required: true
        }
    })

    function InputValidator(event) {
        if(event.target.checkValidity() && event.target.value != "") 
        {
            if(event.target.classList.contains("input-error")) {
                event.target.classList.remove("input-error","animate-pulse");
            }
            event.target.classList.add("input-success");
            return true;
        } 
        else {
            if(event.target.value == "" && !event.target.required) {
                if(event.target.classList.contains("input-success")) {
                    event.target.classList.remove("input-success");
                }
                if(event.target.classList.contains("input-error")) {
                    event.target.classList.remove("input-error","animate-pulse");
                }
                return true;
            }
            else
            {
                if(event.target.classList.contains("input-success")) {
                    event.target.classList.remove("input-success");
                }
                event.target.classList.add("input-error","animate-pulse");
                return false;
            }
        }
    }
</script>

<template>
    <div>
        <h1>{{ _label }} : <span v-if="_input.required" class="text-error">*</span></h1>
        <input v-if="_input.required" @change="InputValidator($event)" :type="_input.type" :min="_input.min" :max="_input.max" :pattern="_input.pattern" :placeholder="_input.placeholder" class="input input-bordered w-full" required />
        <input v-else @change="InputValidator($event)" :type="_input.type" :min="_input.min" :max="_input.max" :pattern="_input.pattern" :placeholder="_input.placeholder" class="input input-bordered w-full"/>
    </div>
</template>