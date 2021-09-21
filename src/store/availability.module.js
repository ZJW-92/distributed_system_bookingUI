import AvailabilityController from "@/services/availabilityController";

export const availability = {
    state:  () => ({
        availabilityDate: {},
        availability: {}
    }),
    namespaced: true,
    getters: {
        getAvailability(state) {
            return state.availability
        }
    },
    actions: {
        selectDate({commit}, date){
            commit('dateSelected', date)
            let availabilityController = new AvailabilityController();
            availabilityController.subscribeAvailabilityDate(date);
        },
        addAvailability({commit}, availability) {
            commit('availabilityAdded', availability)
        },
        removeAvailability({commit}, date){
            let availabilityController = new AvailabilityController();
            availabilityController.unSubscribeAvailabilityDate(date);
            commit('availabilityRemoved')
        }
    },
    mutations: {
        dateSelected(state, date){
            state.availabilityDate = date
        },
        availabilityAdded(state, availability){
            state.availability = availability;
        },
        availabilityRemoved(state) {
            state.availability = {}
        }
    }
}