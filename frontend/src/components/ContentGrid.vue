<script setup lang="ts">
    import {ref, defineProps, watch } from 'vue';

    import ScenarioItems from '@/components/ScenarioDispatch.vue';
    import ScenarioArrival from '@/components/ScenarioArrival.vue';
    import ScenarioEnvironment from '@/components/ScenarioEnvironment.vue';
    import MainTabs from '@/components/MainTabs.vue';
    import ScenarioControl from '@/components/ScenarioControl.vue';

    import type { ScenarioItem } from '@/types/ScenarioItem'
    import type { ScenarioEnvironment as typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';
    import type { Apparatus } from '@/types/Apparatus';
    import type { AppSettings } from '@/types/AppSettings';

    const chosenAddress = ref('')
    const chosenLatLng = ref<{ lat: number; lng: number } | null>(null)
    const streetViewActive = ref(true)
    const onScene = ref(false)
    const itemsDispatched = ref<ScenarioItem[]>([])
    const itemsArrival = ref<ScenarioItem[]>([])

    function handleLocationChosen(payload: { lat: number; lng: number; address: string }) {
        chosenAddress.value = payload.address
        chosenLatLng.value = { lat: payload.lat, lng: payload.lng }
    }

    function handleActiveTab(payload: string) {
        streetViewActive.value = (payload === 'street');
        console.log("Streetview active:"+streetViewActive.value);
    }

    function handleOnScene() {
        onScene.value = true
    }

    function resetDispatch() {
        itemsDispatched.value = randomlyEnable([...props.scenarioDispatch], props.settings.enabledDispatch);
    }

    function resetArrival() {
        itemsArrival.value = randomlyEnable([...props.scenarioOnScene], props.settings.enabledOnScene);
    }

    function randomlyEnable(items: ScenarioItem[], enableCount: number): ScenarioItem[] {
        const shuffled = [...items].sort(() => Math.random() - 0.5)
        return shuffled.map((item, index) => ({
            ...item, enabled: index < enableCount
        }))
    }

    const props = defineProps<{
        scenarioDispatch: ScenarioItem[]
        scenarioOnScene: ScenarioItem[]
        scenarioEnvironment: typeScenarioEnvironment
        apparatus: Apparatus[]
        settings: AppSettings
    }>();

    watch(
        () => props.scenarioDispatch,
            (newVal) => {
                itemsDispatched.value = newVal;
            },
            { immediate: true }
    );
     watch(
        () => props.scenarioOnScene,
            (newVal) => {
                itemsArrival.value = newVal;
            },
            { immediate: true }
    );

</script>

<template>
    <main class="grid-container">
        <div class="main-item">
            <!-- <StreetView :settings="props.settings"  @locationChosen="handleLocationChosen"/> -->
            <div class="media-container"> <!-- Used when in mobile/media mode, etc. -->
                <div class="address-media"> <!-- Used when in mobile mode, etc -->
                    <div class="scrollable-container">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-map"'/>{{ chosenAddress }}</div>
                    <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                    </div>
                </div>
                <div class="sizeup-media"> <!-- Used when in mobile mode, etc -->
                    <div class="side-header resettable"><div><font-awesome-icon :icon='"far fa-rectangle-list"'/> Size Up</div><div @click="resetDispatch"><font-awesome-icon :icon='"fas fa-recycle"'/></div></div>

                    <div class="scrollable-container">
                        <ScenarioItems :scenario-toggles="itemsDispatched"/>
                    </div>
                </div>
            </div>

            <MainTabs
                :settings="props.settings"
                :chosenLatLng="chosenLatLng"
                :chosenAddress="chosenAddress"
                :on-scene="onScene"
                :scenario-dispatch="itemsDispatched"
                @locationChosen="handleLocationChosen"
                @activeTab="handleActiveTab"
            />

        </div>
        <div class="right-column">
            <div class="right-row">
                <div class="side-item">
                    <div class="scrollable-container">
                    <div class="side-header address"><font-awesome-icon :icon='"far fa-map"'/>{{ chosenAddress }}</div>
                    <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                    </div>
                </div>
            </div>
            <div class="right-row">
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-truck"'/> Control</div>
                    <div class="scrollable-container">
                        <ScenarioControl @update-on-scene="handleOnScene"/>
                    </div>
                </div>
            </div>
            <div class="right-row">
                <div class="side-item">
                    <div class="side-header resettable"><div><font-awesome-icon :icon='"far fa-rectangle-list"'/> Size Up</div><div @click="resetDispatch"><font-awesome-icon :icon='"fas fa-recycle"'/></div></div>
                    <div class="scrollable-container">
                        <ScenarioItems :scenario-toggles="itemsDispatched" />
                    </div>
                </div>
            </div>
            <div class="right-row">
                <div class="side-item">
                    <div class="side-header resettable"><div><font-awesome-icon :icon='"far fa-rectangle-list"'/> Found On Scene</div><div @click="resetArrival"><font-awesome-icon :icon='"fas fa-recycle"'/></div></div>
                    <div class="scrollable-container">
                        <ScenarioArrival :scenario-toggles="itemsArrival" :on-scene="onScene" />
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
        background-color: var(--color-base-300);
        color: var(--color-base-content);
        flex-shrink: 0;
        border: var(--border) solid #ccc;
        border-top-left-radius: var(--radius-box);
        border-top-right-radius: var(--radius-box);
        border-bottom: var(--border) solid #ddd;
    }
    .resettable {
        display: flex;
        justify-content: space-between;
        align-items: center;
        white-space: nowrap;
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

    .media-container {
        display: none;
    }
    .address-media {
        display: none;
    }
    .sizeup-media {
        display: none;
    }
    .address {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 896px) {
        .main-item {
            width: 100%;
            gap: 1rem;
        }

        .right-column {
            display: none !important;
        }

        .media-container {
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }

        .address-media, .sizeup-media {
            background-color: var(--color-base-100);
            border: var(--border) solid #ccc;
            border-radius: var(--radius-box);
            display: flex;
            flex-direction: column;
            min-height: auto;
            width: 50%;
        }


        .address-media .side-header {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }


    }







</style>
