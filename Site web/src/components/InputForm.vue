<script setup>

    defineProps({
        _input:{
            type: Object,
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

    const emit = defineEmits(['emitValue']);

    function EmitValue(params)
    {
        emit('emitValue',params);
    }

    function InputValidator(event) {
        if(event.target.checkValidity() && event.target.value != "") 
        {
            if(event.target.classList.contains("input-error")) {
                event.target.classList.remove("input-error","animate-pulse");
            }
            event.target.classList.add("input-success");
            EmitValue(event.target.value);
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
    <input  @change="InputValidator($event)" :type="_input.type" :min="_input.min" :max="_input.max" :pattern="_input.pattern" :placeholder="_input.placeholder" class="input input-bordered w-full" :required="_input.required" />
</template>