<template>
  <div id="container">
    <ConfirmationModal/>
    <MapSidebar ref="MapSidebar"/>
    <Map/>
    <UnsuccessfulBookingModal/>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import MapSidebar from '@/components/MapSidebar'
import ConfirmationModal from '@/components/ConfirmationModal'
import UnsuccessfulBookingModal from "@/components/UnsuccessfulBookingModal";

export default {
  name: "Home",
  components: {
    Map: Map,
    MapSidebar: MapSidebar,
    ConfirmationModal: ConfirmationModal,
    UnsuccessfulBookingModal: UnsuccessfulBookingModal
  },
  methods: {
    initSidebar() {
      this.$refs.MapSidebar.showSidebar()
    }
  }
}
</script>

<style scoped>
  #container {
    padding-right: 50px;
    padding-left: 50px;
  }
</style>