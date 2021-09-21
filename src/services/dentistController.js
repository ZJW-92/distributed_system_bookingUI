import store from "../store"


export default class DentistController {
    constructor() {
    }
    processMessage(message) {
        const buffer = message.toString('utf-8');
        store.dispatch('dentist/addDentists', JSON.parse(buffer));

    }

}