<script setup>
//import * as L from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import { onMounted, useId, watch } from 'vue';

const {center, zoom} = defineProps(['center', 'zoom']);
const id = 'map-' + useId();
const homeCoords = [59.30737833793286, 24.666343408873033];
let map;

onMounted(() => {
    map = L.map(id).setView(center, zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    // Marker
    L.marker(homeCoords).addTo(map).bindPopup("Kodu");
    
    // Polygon
    const homePolygon = L.circle(homeCoords, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 200
    }).addTo(map);
    
    const goHomeControl = L.Control.extend({
        onAdd: function(map) {
            const btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control');
            btn.innerHTML = '🏠 Go to Home';
            btn.style.backgroundColor = 'white';
            btn.style.padding = '5px 10px';
            btn.style.cursor = 'pointer';
            btn.onclick = () => map.setView(homeCoords, 16);
            return btn;
        }
    });
    new goHomeControl({ position: 'topright' }).addTo(map);
});

watch(() => center, (center) => {
    map.panTo(center);
});

watch(() => zoom, (zoom) => {
    map.setZoom(zoom);
});
</script>

<template>
    <div :id="id"></div>
</template>

<style scoped>
div { 
    height: 90vh;
}
</style>