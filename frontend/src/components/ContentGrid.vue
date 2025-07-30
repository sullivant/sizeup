<script setup lang="ts">
    import {ref, defineProps, onMounted } from 'vue';

    import ScenarioItems from '@/components/ScenarioItems.vue'
    import ScenarioEnvironment from '@/components/ScenarioEnvironment.vue';
    import ApparatusList from '@/components/ApparatusList.vue';
    import StreetView from '@/components/StreetView.vue';
    import MapView from '@/components/MapView.vue';
    import IconTabs from '@/components/IconTabs.vue';

    import type { ScenarioItem } from '@/types/ScenarioItem'
    import type { ScenarioEnvironment as typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';
    import type { Apparatus } from '@/types/Apparatus';
    import type { AppSettings } from '@/types/AppSettings';
    
    const chosenAddress = ref('')
    const chosenLatLng = ref<{ lat: number; lng: number } | null>(null)


    function handleLocationChosen(payload: { lat: number; lng: number; address: string }) {
        chosenAddress.value = payload.address
        chosenLatLng.value = { lat: payload.lat, lng: payload.lng }
    }

    const props = defineProps<{
        scenarioToggles: ScenarioItem[]
        scenarioEnvironment: typeScenarioEnvironment
        apparatus: Apparatus[]
        settings: AppSettings
    }>();

</script>

<template>
    <main class="grid-container">
        <div class="row">
            <div class="main-item">
                <StreetView :settings="props.settings"  @locationChosen="handleLocationChosen"/>
            </div>
            <div class="side-items">
                <div class="side-item side-item-short">
                    <div class="scrollable-container">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-map"'/>{{ chosenAddress }}</div>
                    <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                    </div>
                </div>

                <div class="side-by-side">
                    <div class="side-item">
                        <div class="side-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/> Features</div>
                        <div class="scrollable-container">
                            <ScenarioItems :scenario-toggles="scenarioToggles"/>
                        </div>
                    </div>
                    <div class="side-item">
                        <div class="side-header"><font-awesome-icon :icon='"far fa-truck"'/> Apparatus</div>
                        <div class="scrollable-container">
                            <ApparatusList :apparatus="apparatus"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="main-item">
                <!-- <MapView v-if="chosenLatLng" :center="chosenLatLng" /> -->
                <MapView  v-if="chosenLatLng"  :lat="chosenLatLng.lat" :lng="chosenLatLng.lng" :address="chosenAddress" />

            </div>
            <div class="side-items">

                <div class="side-item">
                    <div class="scrollable-container">
                        <IconTabs />
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
        /* flex: 1; */
        width: 100%;
        height: 100%;
        background-color: var(--color-main-background);/* #ecf0f1; */
        overflow: hidden;
        box-sizing: border-box;
    }

    .row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        height: 50%;
        min-height: 0;
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
        height: 100%;
        min-height: 0;
    }

    .side-item {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        background-color: var(--color-background);
        border: 1px solid #ccc;
    }

    .side-item-short {
        height: 50%;
    }

    .side-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        background-color: var(--color-side-item-header);
        color: var(--color-side-item-content);
        flex-shrink: 0;
    }

    .scrollable-container {
        flex: 1; 
        overflow-y: auto;
        border: none;
    }   

    .scrollable-container ul {
        list-style: none;
        padding-left: 1em;
        color: var(--color-side-item-content);
    }

    .side-by-side {
        display: flex;
        gap: 1rem;
        height: 100%;
        overflow: hidden;
    }

    .side-by-side .side-item {
        flex: 1;
        height: 100%;
    }


    @media (max-width: 768px) {
        .row {
            display: flex;
            flex-direction: column;
            height: auto;
            flex: 1;
        }

        .side-items {
            display: none !important;
        }

        .main-item {
            width: 100%;
            height: auto;
            border: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .side-item,
        .side-item-short,
        .side-by-side {
            display: none !important;
        }
    }






</style>