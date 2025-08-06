<script setup lang="ts">
    import {ref, defineProps, onMounted } from 'vue';

    import ScenarioItems from '@/components/ScenarioItems.vue'
    import ScenarioEnvironment from '@/components/ScenarioEnvironment.vue';
    import ApparatusList from '@/components/ApparatusList.vue';
    import StreetView from '@/components/StreetView.vue';
    import MapView from '@/components/MapView.vue';
    import IconTabs from '@/components/IconTabs.vue';
    import MainTabs from '@/components/MainTabs.vue';

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
        <div class="main-item">
            <!-- <StreetView :settings="props.settings"  @locationChosen="handleLocationChosen"/> -->
            <div class="address">
                <div class="scrollable-container">
                <div class="side-header"><font-awesome-icon :icon='"far fa-map"'/>{{ chosenAddress }}</div>
                <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                </div>
            </div>
            
            <MainTabs
                :settings="props.settings"
                :chosenLatLng="chosenLatLng"
                :chosenAddress="chosenAddress"
                @locationChosen="handleLocationChosen"
            />

        </div>
        <div class="right-column">
            <div class="right-row">
                <div class="side-item">
                    <div class="scrollable-container">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-map"'/>{{ chosenAddress }}</div>
                    <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                    </div>
                </div>
            </div>
            <div class="right-row">
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
            <div class="right-row">
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-truck"'/> Icons</div>
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
        flex-direction: row;
        gap: 1rem;
        padding: 1rem;
        /* flex: 1; */
        width: 100%;
        height: 100%;
        background-color: var(--color-base-200);/* #ecf0f1; */
        overflow: hidden;
        box-sizing: border-box;
    }

    .main-item {
        display: flex;
        flex-direction: column;
        width: 75%;
        min-width: 75%;
        height: 100%;
    
    }
    .right-column {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    .right-row {
        flex: 1;
        height: 100%;
        overflow: hidden;
    }

    .right-row:last-child {
        border-bottom: none;
        margin-bottom: none;
    }

    .side-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 0;
    }
    .side-item {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--color-base-100);
        border: var(--border) solid #ccc;
        border-radius: var(--radius-box);
    }
    .side-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        background-color: var(--color-base-300);
        color: var(--color-base-content);
        flex-shrink: 0;
        border: var(--border) solid #ccc;
        border-top-left-radius: var(--radius-box);
        border-top-right-radius: var(--radius-box);
        border-bottom: var(--border) solid #ddd;
    }

    .scrollable-container {
        flex: 1; 
        overflow-y: auto;
        border: none;
    }   

    .scrollable-container ul {
        list-style: none;
        padding-left: 1em;
        color: var(--color-base-content);
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

    .address {
        display: none;
    }

    @media (max-width: 896px) {
        .main-item {
            width: 100%;
            gap: 1rem;
        }

        .right-column {
            display: none !important;
        }

        .address {
            background-color: var(--color-base-100);
            border: var(--border) solid #ccc;
            border-radius: var(--radius-box);            
            display: flex;
            flex-direction: column;
            min-height: 0;
        }
    }







</style>