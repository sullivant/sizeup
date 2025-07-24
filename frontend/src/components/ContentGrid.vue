<script setup lang="ts">
import type { MenuItem } from '@/types/MenuItem';
import type { ScenarioItem } from '@/types/ScenarioItem'
import { onMounted } from 'vue';


const scenarioToggles: ScenarioItem[] = [
    { id: 1, name: 'Toggle 1' },
    { id: 2, name: 'Toggle 2' },
    { id: 3, name: 'Toggle 1' },
    { id: 4, name: 'Toggle 1' },
    { id: 5, name: 'Toggle 1' },
    { id: 6, name: 'Toggle 1' },
    { id: 7, name: 'Toggle 1' },
    { id: 8, name: 'Toggle 1' },
    { id: 9, name: 'Toggle 1' },
    { id: 10, name: 'Toggle 1' },
    { id: 11, name: 'Toggle 1' },
    { id: 12, name: 'Toggle 1' },
    { id: 13, name: 'Toggle 1' },
    { id: 14, name: 'Toggle 1' },
    { id: 15, name: 'Toggle 1' },
    { id: 16, name: 'Toggle 1' },
]

</script>

<template>
    <main class="grid-container">
        <div class="row">
            <div class="main-item">
                Main Item.  Map View.
            </div>
            <div class="side-items">
                <div class="side-item">Side Item 1A - Scenarios</div>
                <div class="side-item">
                    <div class="scrollable-container">
                        <ul>
                            <li v-for="item in scenarioToggles" :key="item.id">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="main-item">
                Main Item. Notes Screen.
            </div>
            <div class="side-items">
                <div class="side-item">Side Item 2A - Links</div>
                <div class="side-item">
                    <div class="scrollable-container">
                        <ul>
                            <li v-for="item in scenarioToggles" :key="item.id">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
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

    .main-item {
        background-color: var(--color-background);
        padding: 1rem;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
    }

    .side-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .side-item {
        background-color: var(--color-background);
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 50%;
    }

    .scrollable-container {
        flex: 1;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 1px;
    }

    .list-item {
        padding: 8px;
        border-bottom: 1px solid #eee;
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