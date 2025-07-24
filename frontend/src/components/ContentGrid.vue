<script lang="ts">

</script>

<template>
    <main class="grid-container">
        <div class="grid-item" v-for="n in 6" :key="n">Content {{ n }}</div>
    </main>
</template>

<style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
        flex: 1;
        background-color: #ecf0f1;
    }
    .grid-item {
        background-color: white;
        padding: 1rem;
        border: 1px solix #ccc
    }
</style>