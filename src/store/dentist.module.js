export const dentist  = {
    state:  () => ({
        dentists: []
    }),
    namespaced: true,
    actions: {
        addDentists({commit}, payload) {
            commit('dentistsAdded', payload)
        }
    },
    mutations: {
        dentistsAdded(state, payload){
            state.dentists = payload.dentists;
        }
    }
}
