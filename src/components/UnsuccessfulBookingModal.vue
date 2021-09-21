<template>
  <div>
    <b-modal
        v-model="showModal"
        title="Unsuccessful Booking"
        ok-only
        ok-variant="danger"
        @hidden="modalClosed()"
    >
      <p>Your booking at {{selectedClinic.name}} on the {{getRequestDate.date}} at {{getRequestDate.time}} was unsuccessful!</p>
      <p>Please try again!</p>
    </b-modal>
    <b-modal
        v-model="getErrorStatus"
        title="Unsuccessful Booking"
        ok-only
        ok-variant="danger"
        @hidden="modalClosed()"
    >
      <p>{{getServerError}}</p>
      <p>Please try again!</p>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: "UnsuccessfulBookingModal",
  data(){
    return {
      display : false
    }},
  methods: {
    modalClosed() {
      this.$store.dispatch('booking/changeBookingStatus', 'viewed')
    },
    displayStatus(){
      this.display = !this.display
    }
  },
  computed: {
    ...mapGetters({status: 'booking/getBookingStatus', booking : 'booking/getBooking'}),
    showModal: {
      // getter
      get: function () {
        return this.status === 'unsuccessfulBookingReceived'
      },
      //setter
      set: function() {
      }
    },
    getErrorStatus: {
      // getter
      get: function () {
        return Object.keys(this.booking.error).length > 0;
      },
      //setter
      set: function() {
      }
    },
    getServerError: {
      // getter
      get: function () {
        return this.booking.error ?  "Something went wrong..."  : ''
      },
      //setter
      set: function() {
      }
    },
    getRequestDate(){
      let date = this.booking.request.time;
      let requestDate = {};
      requestDate.date = ''
      requestDate.time = '';
      if (date) {
        date = date?.split(" ")
        requestDate.date = date[0];
        requestDate.time = date[1];
      }


     return requestDate
    },


    selectedClinic : {
      get: function () {
        return this.booking.request.dentistid ? this.booking.request.clinic : ""
      }
    }
  }
}
</script>

<style scoped>

</style>