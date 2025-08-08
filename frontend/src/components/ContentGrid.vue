<script setup lang="ts">
    import {ref, defineProps, onMounted } from 'vue';

    import ScenarioItems from '@/components/ScenarioItems.vue'
    import ScenarioEnvironment from '@/components/ScenarioEnvironment.vue';
    import ApparatusList from '@/components/ApparatusList.vue';
    import StreetView from '@/components/StreetView.vue';
    import MapView from '@/components/MapView.vue';
    import IconContainer from '@/components/IconContainer.vue';
    import MainTabs from '@/components/MainTabs.vue';

    import type { ScenarioItem } from '@/types/ScenarioItem'
    import type { ScenarioEnvironment as typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';
    import type { Apparatus } from '@/types/Apparatus';
    import type { AppSettings } from '@/types/AppSettings';
    
    const chosenAddress = ref('')
    const chosenLatLng = ref<{ lat: number; lng: number } | null>(null)
    const streetViewActive = ref(true)


    function handleLocationChosen(payload: { lat: number; lng: number; address: string }) {
        chosenAddress.value = payload.address
        chosenLatLng.value = { lat: payload.lat, lng: payload.lng }
    }

    function handleActiveTab(payload: string) {
       
        streetViewActive.value = (payload === 'street');
        console.log("Streetview active:"+streetViewActive.value);
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
            <div class="address-media"> <!-- Used when in mobile mode, etc -->
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
                @activeTab="handleActiveTab"
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
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/> Features</div>
                    <div class="scrollable-container">
                        <ScenarioItems :scenario-toggles="scenarioToggles"/>
                    </div>
                </div>
            </div>
            <div class="right-row">
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-truck"'/> Icons</div>
                    <div class="scrollable-container">
                        <IconContainer :street-view-active="streetViewActive"/>
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
        width: 25%;
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
        overflow: auto;
        max-height: 100%;
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
        overflow-x: auto;
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

    .address-media {
        display: none;
    }
    .sizeup-media {
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

        .address-media {
            background-color: var(--color-base-100);
            border: var(--border) solid #ccc;
            border-radius: var(--radius-box);            
            display: flex;
            flex-direction: column;
            min-height: auto;
        }
    }







</style>