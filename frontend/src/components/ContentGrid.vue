<script lang="ts">

</script>

<template>
    <main class="grid-container">
        <div class="row">
            <div class="main-item">
                Main Item.  Map View.
            </div>
            <div class="side-items">
                <div class="side-item">Side Item 1A - Scenarios</div>
                <div class="side-item">Side Item 1B - Toggles</div>
            </div>
        </div>
        <div class="row">
            <div class="main-item">
                Main Item. Notes Screen.
            </div>
            <div class="side-items">
                <div class="side-item">Side Item 2A - Links</div>
                <div class="side-item">Side Item 2B - Toggles</div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .grid-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        flex: 1;
        width: 100%;
        height: 100%;
        background-color: var(--color-main-background);/* #ecf0f1; */
        box-sizing: border-box;
    }
    .row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        height: 50%;
    }
    .main-item, 
    .side-item {
        background-color: var(--color-background);
        padding: 1rem;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .side-items {
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 1rem;
    }

    @media (max-width: 768px) {
        .row {
            display: flex;
            flex-direction: column;
            height: auto;
        }
        .side-items {
            display: flex;
            flex-direction: column;
        }
        
    }
</style>