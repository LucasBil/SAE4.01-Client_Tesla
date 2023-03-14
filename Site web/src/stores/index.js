import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const store = defineStore( 'request', () => {
    const requestStatus = ref(true)
    return { requestStatus }}
)

export default store;