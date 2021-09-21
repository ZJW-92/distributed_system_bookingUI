<template>
  <div>
    <b-datepicker
        class="datepicker"
        placeholder="Select date to see available dentists for the day"
        v-model="date"
        :start-weekday="startDay"
        locale="en-us"
        :min="minDate"
        :max="maxDate"
        @input="getDateAvailability(date)"
    />
  </div>
</template>

<script>
export default {
  name: "MapAvailabilityPicker",

  data() {
    let nextYearDate = new Date()
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1)
    let startDate = new Date()
    startDate.setDate(startDate.getDate() + 1)
    return {
      date: '',
      minDate: startDate,
      maxDate: nextYearDate,
      startDay: 1,
    }
  },
  watch: {
    dateAvailability: {
      handler() {
        this.checkTimeslotResponse();
      },
      deep: true,
      immediate:true
    }
  },
  computed: {
    dateAvailability() {
      return this.$store.getters["availability/getAvailability"]
    }
  },
  methods: {
    getDateAvailability(date){
      this.$store.dispatch('availability/removeAvailability', this.$store.state.availability.availabilityDate)
      this.$store.dispatch('availability/selectDate', date)
    },
    checkTimeslotResponse() {
      if (Object.values(this.$store.state.availability.availability).length !== 0 && this.date) {
        for (let key in this.$store.state.availability.availability) {
          let id = key;
          let value = this.$store.state.availability.availability[key];
          this.$parent.markAvailability(id, value);
        }
      }else if (this.$parent.loaded){
        this.$parent.setDentistMarkers()
      }
    }
  }
}


</script>

<style scoped>

</style>