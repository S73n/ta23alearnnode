<script setup>
import { ref } from 'vue';
import Modal from './components/Modal.vue';
import ImgModal from './components/ImgModal.vue';
 
let modalActive = ref(false);
let modalActive2 = ref(false);
let modalActive3 = ref(false);
 
</script>
 
<template>
    <div class="container">
        <section class="section">
            <div class="buttons">
                <button class="button is-primary" @click="modalActive = true">Modal Activate</button>
                <button class="button is-warning is-outlined ml-2" @click="modalActive2 = true">Modal 2 Activate</button>
                <button class="button is-danger is-rounded ml-2" @click="modalActive3 = true">Modal 3 Activate</button>
            </div>
        </section>
    </div>
 
    <ImgModal :active="modalActive" @close="modalActive = false" url="https://picsum.photos/seed/sten/200/300"></ImgModal>
    <ImgModal :active="modalActive2" @close="modalActive2 = false" url="https://picsum.photos/200/300?r=2"></ImgModal>
    <Modal :active="modalActive3" @close="modalActive3 = false">
        <div class="notification is-primary">
            <button class="delete"></button>
            Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
            dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
            nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
            diam, et dictum <a>felis venenatis</a> efficitur.
        </div>
    </Modal>
</template>
 
<style></style>