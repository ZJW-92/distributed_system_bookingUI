import AvailabilityController from '@/services/availabilityController'
import Vue from 'vue'

export const selectedClinic = {
    state:  () => ({
        clinic: {},
    }),
    namespaced: true,
    getters: {
        getAvailability(state) {
            return state.clinic.availability
        }
    },
    actions: {
        selectClinic({commit}, clinic) {
            commit('dentistSelected', clinic)
            let availabilityController = new AvailabilityController();
            availabilityController.subscribeAvailability();
        },
        addAvailability({commit}, availability) {
            commit('availabilityAdded', availability)
        },
        removeClinic({commit}, id){
            let availabilityController = new AvailabilityController();
            availabilityController.unSubscribeAvailability(id);
            commit('clinicRemoved')

        }
    },
    mutations: {
        dentistSelected(state, clinic){
            state.clinic = clinic;
        },
        availabilityAdded(state, availability) {
            Vue.set(state.clinic, 'availability', availability)
        },
        clinicRemoved(state) {
            state.clinic = {}
        }
    }
}