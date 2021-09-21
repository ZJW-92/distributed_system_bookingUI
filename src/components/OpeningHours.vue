<template>
    <div>
        <p id="hoursMonday">Monday: {{this.openingHours.monday || "Closed"}}</p>
        <p id="hoursTuesday">Tuesday: {{this.openingHours.tuesday || "Closed"}}</p>
        <p id="hoursWednesday">Wednesday: {{this.openingHours.wednesday || "Closed"}}</p>
        <p id="hoursThursday">Thursday: {{this.openingHours.thursday || "Closed"}}</p>
        <p id="hoursFriday">Friday: {{ this.openingHours.friday || "Closed"}}</p>
        <p id="hoursSaturday">Saturday: {{this.openingHours.saturday || "Closed"}}</p>
        <p id="hoursSunday">Sunday: {{this.openingHours.sunday || "Closed"}}</p>
    </div>
</template>

<script>
    export default {
        name: "OpeningHours",
        props: ['openingHours'],
        data () {
          return {}
        }
    }
</script>

<style scoped>

</style>