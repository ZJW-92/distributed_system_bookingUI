<template>
    <div>
        <p>Owner: {{clinicInformation.owner}}</p>
        <p>Address: {{clinicInformation.address}}</p>
        <p>City: {{clinicInformation.city}}</p>
    </div>
</template>

<script>
    export default {
        name: "ClinicInformation",
        props: ['clinicInformation']
    }
</script>

<style scoped>

</style>