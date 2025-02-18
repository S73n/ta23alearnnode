<script setup>
import { ref } from 'vue';
import Tabs from './components/Tabs.vue';


</script>
 
<template>
    <Tabs></Tabs>
    <div class="container">
        <section class="secion">
            <RouterView></RouterView>
        </section>
    </div>
</template>
 
<style>
</style>