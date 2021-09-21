<template>
  <div>
    <BookingModal ref="BookingModal"></BookingModal>
    <b-sidebar v-model="sidebarCheck" id="sidebar-variant" width="40%"  bg-variant="light" text-variant="dark" shadow>
      <b-container class="container-fluid">
        <h2>{{selectedClinic.name}}</h2>
        <b-row>
          <div id="clinicInfo" class="col-5">
            <ClinicInformation v-bind:clinic-information="selectedClinic"/>
          </div>
          <div id="clinicSchedule" class="col-5">
            <OpeningHours v-bind:opening-hours="openingHours"/>
          </div>
      </b-row>
      <b-calendar v-model="date" :min="minDate" :start-weekday="startDay" :max="maxDate"  v-on:selected="displayTimeSlots()" locale="en-us"></b-calendar>
      <div id="timeContainer" v-if="timeSlots" class="container">
        <b-button @click="openModal(date, timeslot.time)" v-for="(timeslot, index) in timeSlots" :key="index" class="timeButton" :disabled=checkIfAvailable(timeslot)>{{timeslot.time}}</b-button>
      </div>
      </b-container>
  </b-sidebar>
  </div>
</template>

<script>
import BookingModal from '@/components/BookingModal'
import OpeningHours from "./OpeningHours";
import ClinicInformation from "./ClinicInformation";

export default {
  name: "MapSidebar",
  components: {
    ClinicInformation,
    OpeningHours,
    BookingModal: BookingModal
  },
  data() {
    let nextYearDate = new Date()
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1)
    let statDate = new Date()
    statDate.setDate(statDate.getDate() + 1)
    return {
      date: '',
      minDate: statDate,
      maxDate: nextYearDate,
      startDay: 1,
      sidebarCheck: false,
      timeSlots: [],
      bookingCheck: false
    }
  },
  watch: {
    clinicAvailability: {
      handler() {
          this.displayTimeSlots()
      },
      deep: true,
      immediate:true
    }
  },
  computed: {
    selectedClinic(){
      return this.$store.state.selectedClinic.clinic
    },
    clinicAvailability(){
      return this.$store.getters["selectedClinic/getAvailability"]
    },
    openingHours() {
      return this.selectedClinic.openinghours ? this.$store.state.selectedClinic.clinic.openinghours : 'Not Available';
    }
  },
  methods: {
    displayTimeSlots() {
      if (this.$store.state.selectedClinic.clinic.availability && this.date) {
        let dateIndex = this.$store.state.selectedClinic.clinic.availability.findIndex(obj => obj.date === this.date)
        if (this.$store.state.selectedClinic.clinic.availability[dateIndex]) {
          this.timeSlots = this.$store.state.selectedClinic.clinic.availability[dateIndex].timeslots
        }
        else {
          this.timeSlots = []
        }
      }
    },
    openModal(date, time) {
      this.$refs.BookingModal.show(date, time)
    },
    showSidebar(){
      this.sidebarCheck = true
    },
    checkIfAvailable(timeslot) {
      return !(timeslot.availableDentists > 0)
    }
  }
}
</script>

<style scoped>
  #clinicInfo {
    text-align: left;
    margin-left: 1em;
    margin-top: 2em;
  }
  #clinicSchedule {
    text-align: right;
    margin-top: 2em;
  }
  h2 {
    text-align: left;
    margin-left: 0.5em;
  }
  .timeButton {
    margin: 1em;
  }
  #timeContainer {
    text-align: left;
  }


</style>