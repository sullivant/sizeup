<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';
    import type { typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';

    const props = defineProps<{
        scenarioEnvironment: typeScenarioEnvironment
    }>();

    const weatherIconClasses: Record<typeScenarioEnvironment['weather'], string> = {
        Clear: 'far fa-sun',
        Rain: 'far fa-cloud-showers-heavy',
        Snow: 'far fa-snowflake',
        Fog: 'fas fa-smog',
        Storm: 'fas fa-cloud-bolt'
    }


</script>

<template>
    <div class="scrollable-container">
        <ul>
            <li><strong>Date: </strong> {{scenarioEnvironment.date}}</li>
            <li><strong>Time: </strong> {{scenarioEnvironment.timeOfDay}}</li>
            <li><strong><font-awesome-icon :icon="weatherIconClasses[scenarioEnvironment.weather]"  /> Conditions: </strong> {{scenarioEnvironment.weather}}</li>
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