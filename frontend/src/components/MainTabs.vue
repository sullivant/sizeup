<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
    import { ref } from 'vue';
    import StreetView from '@/components/StreetView.vue';
    import MapView from '@/components/MapView.vue';
    import DispatchView from '@/components/DispatchView.vue';
    import type { AppSettings } from '@/types/AppSettings';
    import type { ScenarioItem } from '@/types/ScenarioItem';

    const props = defineProps<{
      settings: AppSettings;
      chosenLatLng: { lat: number; lng: number } | null;
      chosenAddress: string;
      onScene: boolean;
      scenarioDispatch: ScenarioItem[];
    }>();

    const emit = defineEmits(['locationChosen', 'activeTab']);

    const activeTab = ref<'street' | 'map'>('street');

    function onLocationChosen(payload: { lat: number; lng: number; address: string }) {
        emit('locationChosen', payload);
    }

    function activateStreet() {
        console.log("Activating street");
        activeTab.value = 'street';
        emit('activeTab', 'street');
    }

    function activateMap() {
        console.log("Activating map");
        activeTab.value = 'map';
        emit('activeTab', 'map');
    }
</script>


<template>
  <div class="main-tabs">
    <div class="tab-buttons">
      <button @click="activateStreet()" :class="{ active: activeTab === 'street' }">Street View</button>
      <button @click="activateMap()" :class="{ active: activeTab === 'map' }">Map View</button>
    </div>
    <div class="tab-content">
        <div class="tab-content" v-show="!props.onScene">
            <DispatchView :address="chosenAddress" :scenarioDispatch="scenarioDispatch"/>
        </div>
        <div class="tab-content" v-show="activeTab === 'street' && props.onScene">
            <StreetView
                :settings="settings"
                @locationChosen="onLocationChosen"/>
        </div>
        <div class="tab-content" v-show="activeTab === 'map' && props.onScene">
            <MapView
                v-if="chosenLatLng"
                :lat="chosenLatLng.lat"
                :lng="chosenLatLng.lng"
                :address="chosenAddress"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .tab-buttons {
        display: flex;
    }
    .tab-buttons button {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-bottom: none;
        background-color: var(--color-base-300);
        cursor: pointer;
        color: var(--color-base-content);
    }
    .tab-buttons button.active {
        background-color: var(--color-base-100);
        font-weight: bold;
    }
    .main-tabs {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .tab-content {
        flex: 1;
        overflow-y: auto;
        height: 100%;
        width: 100%;
    }

</style>
