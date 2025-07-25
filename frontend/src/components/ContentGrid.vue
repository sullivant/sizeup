<script setup lang="ts">
    import {ref, defineProps, onMounted } from 'vue';

    import ScenarioItems from '@/components/ScenarioItems.vue'
    import ScenarioEnvironment from '@/components/ScenarioEnvironment.vue';
    
    import type { MenuItem } from '@/types/MenuItem';
    import type { ScenarioItem } from '@/types/ScenarioItem'
    import type { typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';
    
    const props = defineProps<{
        scenarioToggles: ScenarioItem[]
        scenarioEnvironment: typeScenarioEnvironment
    }>();

</script>

<template>
    <main class="grid-container">
        <div class="row">
            <div class="main-item">
                Main Item.  Map View.
            </div>
            <div class="side-items">
                <div class="side-item">
                    <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                </div>
                <div class="side-item">
                    <ScenarioItems :scenario-toggles="scenarioToggles"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="main-item">
                Main Item. Notes Screen.
            </div>
            <div class="side-items">
                <div class="side-item">Side Item 2A - Apparatus </div>
                <div class="side-item">Side Item 2B - Icons </div>
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