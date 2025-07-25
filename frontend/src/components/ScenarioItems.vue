<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';
    
    import type { ScenarioItem } from '@/types/ScenarioItem'

    const props = defineProps<{
        scenarioToggles: ScenarioItem[]
    }>();

    // Ensures the enabled toggles show up first
    const sortedScenarioToggles = computed(() =>
        [...props.scenarioToggles].sort((a,b) => Number(b.enabled) - Number(a.enabled))
    )

    function toggleScenario(id: number) {
        const item = props.scenarioToggles.find(i => i.id === id)
        if (item) {
            item.enabled = !item.enabled
        }
    }
</script>

<template>
    <div class="scrollable-container">
        <ul>
            <li v-for="item in sortedScenarioToggles" :key="item.id" @click="toggleScenario(item.id)">
                <font-awesome-icon :icon="item.enabled ? 'fa-regular fa-square-check' : 'fa-regular fa-square'"  /> {{ item.name }}
            </li>
        </ul>
    </div>
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
</style>