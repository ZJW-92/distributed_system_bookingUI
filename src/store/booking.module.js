import BookingController from "@/services/bookingController";

export const booking = {
    state:  () => ({
        booking: {
            response: {},
            request: {},
            status: {},
            error: {}
        },
    }),
    namespaced: true,
    getters: {
        getBooking(state) {
            return state.booking
        },
        getBookingStatus(state) {
            return state.booking.status
        }
    },
    actions: {
        createBookingRequest({commit}, {clinic, requestDate, requestTime, user}) {
            let bookingController = new BookingController()
            let request = bookingController.generateRequest(clinic, requestDate, requestTime, user)
            request.then(payload => {
                bookingController.sendRequest(payload)
                let newRequest = {}
                newRequest = payload;
                newRequest.clinic = clinic;
                commit('bookingRequestAdded', newRequest)
            }, error =>{
                commit('bookingRequestNotGenerated', error)
            })
        },
        // successful response
        addBooking({commit}, booking) {
            commit('bookingAdded', booking)
        },

        addUnsuccessfulBooking( {commit}, booking) {
            commit('UnsuccessfulBookingAdded', booking)
        },
        changeBookingStatus({commit}, status) {
            commit('statusChanged', status)
        }
    },
    mutations: {
        bookingRequestAdded(state, booking){
            state.booking.request = booking;
            state.booking.status = 'sent';
        },
        //response
        bookingAdded(state, booking){
            state.booking.response = booking;
            state.booking.status = 'received';
        },
        UnsuccessfulBookingAdded(state, booking) {
            state.booking.response = booking;
            state.booking.status = 'unsuccessfulBookingReceived';
        },
        statusChanged(state, newStatus) {
            state.booking.status = newStatus;
            state.booking.error = {}
        },
        bookingRequestNotGenerated(state, error) {
            state.booking.error = error;
        }
    }
}