import { defineStore } from 'pinia'

const saves = defineStore( 'saves', {
    state: () => {
        return {
            saves: [],
        }
    },
    actions: {
        save(key, value) {
            this.saves.push({key, value});
        },
        findValue(key) {
            return this.saves.find(save => save.key === key);
        },
        findKey(value) {
            return this.saves.find(save => save.value === value);
        },
    },
})

export default saves