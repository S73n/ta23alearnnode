<script setup>
import { ref } from 'vue';
import axios from 'axios';

let joke = ref('');

let response = await axios.get('https://api.chucknorris.io/jokes/random');
joke.value = response.data.value;

</script>

<template>
    {{ joke }}
</template>