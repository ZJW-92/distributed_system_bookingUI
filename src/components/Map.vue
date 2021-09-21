<template>
  <div>
    <MapAvailabilityPicker/>
    <div id="mapContainer">
  </div>
  </div>
</template>

<script>
  import 'leaflet/dist/leaflet.css'
  import L, {Icon} from 'leaflet'
  import MapAvailabilityPicker from "@/components/MapAvailabilityPicker";

  export default {
  name: "Map",
    components: {
      MapAvailabilityPicker
    },
    data() {
    return {
      myMap: Map,
      markerGroup: {},
      loaded: false
    }
  },
  computed: {
    clinics() {
      return this.$store.state.dentist;
    }
  },
  watch: {
    'clinics': {
      deep: true,
      handler() {
        this.setDentistMarkers();
      }
    }
  },
  mounted() {
    this.initiateMap();
    /* Setup to make markers show */
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });
    this.loaded = true
  },
  methods: {
    initiateMap() {
      this.myMap = L.map('mapContainer').setView([57.7089, 11.9746], 12);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZWVtaWxndXNlIiwiYSI6ImNraG44czlpazBkZGUyc2wxYXRmdDNzd3IifQ.X7rb29PK55Oi8EZ8XQ6jtw'
      }).addTo(this.myMap);
      // create a marker group for all markers in order to be able to refresh the markers on the map
      this.markerGroup = L.layerGroup().addTo(this.myMap);
    },
    setDentistMarkers() {
      let clinicList = this.clinics.dentists;
      this.markerGroup.clearLayers();
      for ( let i = 0; i < clinicList.length; i++) {
        let longitude = clinicList[i].coordinate.longitude;
        let latitude = clinicList[i].coordinate.latitude;
        let marker = L.marker([ latitude, longitude],{id: clinicList[i].id}).addTo(this.markerGroup).on('click', (e) => {
              console.log(e.latlng);
              this.$parent.initSidebar();
          if (this.$store.state.selectedClinic.clinic.id !== undefined) {
            this.$store.dispatch('selectedClinic/removeClinic', this.$store.state.selectedClinic.clinic.id);
          }
          this.$store.dispatch('selectedClinic/selectClinic', clinicList[i]);
        }
        );
        
        marker.bindPopup(clinicList[i].name);
        marker.on('mouseover',  () => {
          marker.openPopup();
        });
      }
    },
    markAvailability(id, value) {
      let idNumber = parseInt(id.split("id")[1]);
      const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      this.markerGroup.getLayers().find((e) => {
        if(e.options.id === idNumber){
          if(value){
            e.setIcon(greenIcon).update()
          }else{
            e.setIcon(redIcon).update()
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  #mapContainer {
    min-height: 85vh;
  }
</style>
