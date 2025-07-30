<script setup lang="ts">
import type { AppSettings } from '@/types/AppSettings';
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps<{
        settings: AppSettings,
        settingsVersion: number,
}>()

const handleSubmit = () => {
    emit('update-settings', props.settings);
}

const emit = defineEmits<{
  (e: 'update-settings', newSettings: AppSettings): void
}>();

const showModal = ref(false);
const map = ref<google.maps.Map | null>(null);
const clickCount = ref(0);
const bounds = ref<{ northeast: google.maps.LatLngLiteral, southwest: google.maps.LatLngLiteral } | null>(null);

const openModal = async () => {
  showModal.value = true;
  await nextTick;
  initMap();
};

const closeModal = () => {
  showModal.value = false;
  clickCount.value = 0;
};

const initMap = () => {
  const mapOptions = {
    center: { lat: 41.75673173, lng: -72.6697 }, // Hartford-ish, CT
    zoom: 10,
  };

  map.value = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

  map.value.addListener('click', (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    if (clickCount.value === 0) {
      bounds.value = { northeast: e.latLng.toJSON(), southwest: { lat: 0, lng: 0 } };
      clickCount.value++;
    } else if (clickCount.value === 1 && bounds.value) {
      bounds.value.southwest = e.latLng.toJSON();
      props.settings.location.northeast = bounds.value.northeast;
      props.settings.location.southwest = bounds.value.southwest;
      clickCount.value = 0;
    }
  });
};


</script>

<template>
    <div class="settings-content">
        <div class="settings-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/> Settings..</div>

        <div class="settings-form">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="initialChosen">Initial Feature Count:</label>
                    <input id="initialChosen" type="text" v-model.number="props.settings.initialFeatures" placeholder=props.settings.initialFeatures></input>
                </div>

                <div class="form-group">
                    <label for="ne">Northeast:</label>
                    <input id="nelat" type="text" v-model.number="props.settings.location.northeast.lat" placeholder=props.settings.location.northeast.lat></input>,
                    <input id="nelng" type="text" v-model.number="props.settings.location.northeast.lng" placeholder=props.settings.location.northeast.lng></input>
                </div>
                <div class="form-group">
                    <label for="sw">Southwest:</label>
                    <input id="swlat" type="text" v-model.number="props.settings.location.southwest.lat" placeholder=props.settings.location.southwest.lat></input>,
                    <input id="swlng" type="text" v-model.number="props.settings.location.southwest.lng" placeholder=props.settings.location.southwest.lng></input>
                </div>
                <div class="form-group">
                    <div @click="openModal">Set Bounding Box</div>
                </div>

                <div class="button-container">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>



    </div>


    <div v-if="showModal" class="bounding-modal">
      <div class="settings-header">Northeast: {{ props.settings.location.northeast.lat }}, {{ props.settings.location.northeast.lng }}</div>
      <div class="settings-header">Southwest: {{ props.settings.location.southwest.lat }}, {{ props.settings.location.southwest.lng }}</div>
      <div id="map" style="height: 100%; width: 100%;"></div>
      <div class="form-group"><button @click="closeModal">Close</button></div>
    </div>

</template>

<style scoped>
    .settings-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-bottom: 1px solid #6f5656;
        background-color: var(--color-background);
        flex-shrink: 0;
    }

    .form-container {
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .form-group {
        display: flex;
        margin-top: 10x;
        margin-bottom: 5px;
        margin-left: 10px;
        padding-top: 5px;
    }
    .form-group-header {
        display: flex;
        margin-left: 10px
    }

    label {
        display: block;
    }

    input {
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        margin-left: 10px;
        width: 10ch;
    }
    
    .button-container {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
    }

    button {
        padding: 8px 12px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        background-color: var(--color-submit-button);
    }

    button[type="submit"] {
        background-color: var(--color-submit-button);
        color: white;
    }

    .bounding-modal {
        height: 500px;
        width: 500px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: var(--color-main-background);
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }
</style>