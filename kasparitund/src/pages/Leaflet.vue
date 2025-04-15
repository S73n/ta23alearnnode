<script setup>
import { ref } from 'vue';
import LeafletMap from '../components/LeafletMap.vue';

let center = ref([59.4269, 24.7434]);
let zoom = ref(19);
</script>
<template>
        <button class="button is-primary" @click="center[59.410711, 24.605378]">Go To Home</button>
    <input type="range" min="1" max="19" v-model="zoom">
        <LeafletMap :center="center" :zoom="zoom"></LeafletMap>
    <LeafletMap :center="[24.7434, 59.4269]" :zoom="19"></LeafletMap>
</template>
