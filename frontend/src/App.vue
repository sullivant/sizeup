<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'

import Header from './components/Header.vue'
import ContentGrid from './components/ContentGrid.vue'

</script>

<template>
    <div class="app-container">
        <Header />
        <ContentGrid />
    </div>
</template>

<style scoped>

.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

</style>
