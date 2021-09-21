<template>
  <div>
  <b-modal
          v-model="showModal"
          title="Confirmation Receipt"
          ok-only
          ok-variant="info"
          @hidden="modalClosed()"
  >
    <p>{{bookingMessage}}</p>
    <div>
      <p>Clinic: {{selectedClinic.name}}</p>
      <p>Clinic Address: {{selectedClinic.address}}</p>
      <p>Appointment: {{displayInfo.time}}</p>
      <p>Reference: {{displayInfo.requestid}}</p>
    </div>
  </b-modal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: "ConfirmationModal",
  data(){
  return {
    bookingMessage: "Your booking has been made!",
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
        return this.status === 'received';
      },
      //setter
      set: function() {
      }
    },
    displayInfo(){
      return this.booking.response;
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