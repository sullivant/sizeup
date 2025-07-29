<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import Header from './components/Header.vue'
    import ContentGrid from './components/ContentGrid.vue'

    import appSettingsData from '@/data/appSettings.json'
    import scenarioData from '@/data/scenarioToggles.json'
    import apparatusData from '@/data/apparatus.json'

    import type { AppSettings } from '@/types/AppSettings'
    import type { ScenarioItem } from '@/types/ScenarioItem'
    import type { ScenarioEnvironment as typeScenarioEnvironment } from './types/typeScenarioEnvironment'
    import type { Apparatus } from '@/types/Apparatus'

    const appSettings = ref<AppSettings>(appSettingsData);

    const apparatus = ref<Apparatus[]>(apparatusData);

    // The application's list of scenario features that can be used when discussing
    // response to the incident, etc.  This is stored in the scenarioToggles.json file.
    // It is first enabled randomly and then setup after mount (onMounted below)
    const scenarioToggles = ref<ScenarioItem[]>([]);

    // The application's current (randomly generated) weather and environment detail
    const scenarioEnvironment = ref<typeScenarioEnvironment>(generateRandomEnvironment());

    // After we have the full list of toggles, we'll randomly enable six.
    function randomlyEnable(items: ScenarioItem[]): ScenarioItem[] {
        const shuffled = [...items].sort(() => Math.random() - 0.5)
        return shuffled.map((item, index) => ({
            ...item, enabled: index < appSettings.value.initialFeatures
        }))
    }

    // Returns a random item in an array of given type T
    function getRandomItem<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    function generateRandomEnvironment(): typeScenarioEnvironment {
    
        const times: typeScenarioEnvironment['timeOfDay'][] = ['Morning', 'Afternoon', 'Evening', 'Night']
        const weathers: typeScenarioEnvironment['weather'][] = ['Clear', 'Rain', 'Snow', 'Fog',  'Storm']
        const temperature = Math.floor(Math.random() * 60) + 30 // 20F to 90F
        const randomDate = new Date(
            2025, 
            Math.floor(Math.random()*12), 
            Math.floor(Math.random() * 28) + 1)

        return {
            timeOfDay: getRandomItem(times),
            weather: getRandomItem(weathers),
            temperature,
            date: randomDate.toDateString()
        }
    }

    onMounted(() => {
        scenarioToggles.value = randomlyEnable(scenarioData);
        // scenarioEnvironment.value = generateRandomEnvironment();
    })
</script>

<template>
    <div class="app-container">
        <Header :settings="appSettings" />
        <ContentGrid :scenario-toggles="scenarioToggles" :scenario-environment="scenarioEnvironment" :apparatus="apparatus" />

    </div>
</template>

<style scoped>

.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    margin: 100;
    padding: 0;
    overflow: hidden;
}


</style>

