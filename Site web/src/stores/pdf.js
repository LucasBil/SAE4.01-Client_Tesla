import { defineStore } from 'pinia'

const pdf = defineStore( 'pdf', {
    state: () => {
        return {
            motorisation: {},
            options: [],
            price: 0,
        }
    },
    actions: {
        save(motorisation, options, price) {
            this.motorisation = motorisation;
            this.options = options;
            this.price = price;
        },
    },
})

export default pdf