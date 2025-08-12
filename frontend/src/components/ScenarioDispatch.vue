<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';
    
    import type { ScenarioItem } from '@/types/ScenarioItem'

    const props = defineProps<{
        scenarioToggles: ScenarioItem[]
    }>();

    // // Ensures the enabled toggles show up first
    // const sortedScenarioToggles = computed(() =>
    //     [...props.scenarioToggles].sort((a,b) => Number(b.enabled) - Number(a.enabled))
    // )

    const filteredScenarios = computed(() => 
        [...props.scenarioToggles].filter((s) => s.enabled)
    )

    function toggleScenario(id: number) {
        const item = props.scenarioToggles.find(i => i.id === id)
        if (item) {
            item.enabled = !item.enabled
        }
    }
</script>

<template>
    <div class="scenario-grid">
        <div class="scenario-cell" v-for="item in filteredScenarios" :key="item.id" @click="toggleScenario(item.id)">
            {{ item.shortName }}
        </div>
    </div>
<!-- 
    <ul>
        <li v-for="item in sortedScenarioToggles" :key="item.id" @click="toggleScenario(item.id)">
            <font-awesome-icon :icon="item.enabled ? 'fa-regular fa-square-check' : 'fa-regular fa-square'"  /> {{ item.name }}
        </li>
    </ul>
-->
</template>

<style scoped>
    .scrollable-container {
        flex: 1;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 1px;
    }
    .scrollable-container ul {
        list-style: none;
        padding-left: 1em;
    }
    .scrollable-container li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .scenario-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 0.5rem;
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 1rem;
        max-height: 80vh;
        overflow: auto;
    }


    .scenario-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: var(--color-base-200);
        cursor: grab;
        color: var(--color-primary-content);
        text-align: center;
        word-wrap: break-word;
        white-space: normal;
        height: auto;
        min-height: 60px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .scenario-cell:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }



</style>