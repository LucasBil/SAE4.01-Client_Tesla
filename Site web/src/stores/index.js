import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const store = defineStore( 'request', () => {
    const requestStatus = ref(true);
    const requestStatusComputed = ref('');
    return { requestStatus, requestStatusComputed }}
)

export default store;