<script setup>
    defineProps({
        _radios: {
            type: Array,
            default:[{
                title: 'Red pill',
                color:{
                    type: String,
                    required: true
                },
                checked:true
            },
            {
                title: 'Blue pill',
                color:{
                    type: String,
                    required: true
                },
                checked:false
            }],
            required: true
        }
    })

    function idGenerator() {
        return (Math.random()*Math.random()).toString(36).substr(2, 9);
    }

    const id = idGenerator();
</script>

<template>
    <div>
        <div v-for="radio in _radios" class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">{{ radio.title }}</span> 
                <input v-if="radio.checked" type="radio" :name="'radio-'+id" class="radio checked:bg-red-500" checked />
                <input v-else type="radio" :name="'radio-'+id" :class="'radio checked:bg-red-500'" />
            </label>
        </div>
    </div>
</template>