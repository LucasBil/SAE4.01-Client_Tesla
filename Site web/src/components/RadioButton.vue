<script setup>
    defineProps({
        _radios: {
            type: Array,
            default:[{
                title: 'Red pill',
                checked:true
            },
            {
                title: 'Blue pill',
                info:'35€',
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
                <span class="label-text">
                    {{ radio.title }} 
                    <span class="underline" v-if="radio.checked">
                        (défault)
                    </span> 
                    <span v-if="radio.info" class="tooltip underline ml-3 font-bold" :data-tip="radio.info">
                        i
                    </span> 
                </span> 
                <input v-if="radio.checked" type="radio" :name="'radio-'+id" class="radio checked:bg-accent-focus" checked />
                <input v-else type="radio" :name="'radio-'+id" :class="'radio checked:bg-accent-focus'" />
            </label>
        </div>
    </div>
</template>