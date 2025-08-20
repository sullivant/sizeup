<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
    import { defineProps } from 'vue';
    import type { ScenarioEnvironment as typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';

    const props = defineProps<{
        scenarioEnvironment: typeScenarioEnvironment
    }>();

    const weatherIconClasses: Record<typeScenarioEnvironment['weather'], string> = {
        Clear: 'far fa-sun',
        Rain: 'fas fa-cloud-showers-heavy',
        Snow: 'far fa-snowflake',
        Fog: 'fas fa-smog',
        Storm: 'fas fa-cloud-bolt'
    }

    const timeIconClasses: Record<typeScenarioEnvironment['timeOfDay'], string> = {
        Morning: 'far fa-alarm-clock',
        Afternoon: 'far fa-sun',
        Evening: 'fas fa-sun',
        Night: 'fas fa-bed',
    }
</script>

<template>

    <ul>
        <li><font-awesome-icon :icon='"far fa-calendar-days"'/> {{scenarioEnvironment.date}}</li>
        <li><font-awesome-icon :icon="timeIconClasses[scenarioEnvironment.timeOfDay]"/> {{scenarioEnvironment.timeOfDay}}</li>
        <li><font-awesome-icon :icon="weatherIconClasses[scenarioEnvironment.weather]"/> {{scenarioEnvironment.weather}}</li>
    </ul>

</template>

<style scoped>

     li {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }


</style>
