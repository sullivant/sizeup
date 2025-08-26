<script setup lang="ts">
import type { AppSettings } from '@/types/AppSettings';
import { ref, nextTick, onMounted, computed, watch } from 'vue';
import appSettingsData from '@/data/appSettings.json'


const props = defineProps<{
        settings: AppSettings,
}>()

const handleSubmit = () => {
    console.log("SettingsView: Updating Settings");
    emit('update-settings', localSettings.value);
}

const emit = defineEmits<{
  (e: 'update-settings', newSettings: AppSettings): void
}>();

const showModal = ref(false);
const map = ref<google.maps.Map | null>(null);
const clickCount = ref(0);
const bounds = ref<{ northeast: google.maps.LatLngLiteral, southwest: google.maps.LatLngLiteral } | null>(null);
const rectangle = ref<google.maps.Rectangle | null>(null);

const localSettings = ref<AppSettings>(appSettingsData);


const openModal = async () => {
  showModal.value = true;
  await nextTick;
  initMap();
};

const closeModal = () => {
  showModal.value = false;
  clickCount.value = 0;

    if (rectangle.value) {
        rectangle.value.setMap(null);
        rectangle.value = null;
    }
};

const enabledDispatch = computed({
  get: () => localSettings.value.enabledDispatch,
  set: (val: number) => {
    localSettings.value.enabledDispatch = val;
  }
});

const deptName = computed({
  get: () => localSettings.value.deptName,
  set: (val: string) => {
    localSettings.value.deptName = val;
  }
});


function updateBounding(ne: { lat: number; lng: number; }, sw: { lat: number; lng: number; }) {
  if (localSettings.value != undefined) {
    localSettings.value.location.northeast = ne;
    localSettings.value.location.southwest = sw;
  };
}


const initMap = () => {
  const mapOptions = {
    center: { lat: 41.75673173, lng: -72.6697 }, // Hartford-ish, CT
    zoom: 10,
  };

  map.value = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    map.value.addListener('click', (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    if (clickCount.value === 0) {
        if (rectangle.value) {
            rectangle.value.setMap(null);
            rectangle.value = null;
        }

        bounds.value = {
            northeast: e.latLng.toJSON(),
            southwest: { lat: 0, lng: 0 },
        };
        clickCount.value++;
    } else if (clickCount.value === 1 && bounds.value) {
        bounds.value.southwest = e.latLng.toJSON();

        // Normalize bounds to ensure NE is top-right and SW is bottom-left
        const ne = {
            lat: Math.max(bounds.value.northeast.lat, bounds.value.southwest.lat),
            lng: Math.max(bounds.value.northeast.lng, bounds.value.southwest.lng),
        };
        const sw = {
            lat: Math.min(bounds.value.northeast.lat, bounds.value.southwest.lat),
            lng: Math.min(bounds.value.northeast.lng, bounds.value.southwest.lng),
        };

        // Save to settings
        updateBounding(ne, sw);

        // Remove previous rectangle if it exists
        if (rectangle.value) {
            rectangle.value.setMap(null);
        }

        // Draw new rectangle
        rectangle.value = new google.maps.Rectangle({
            bounds: new google.maps.LatLngBounds(sw, ne),
            strokeColor: '#bdc9a9',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#bdc9a9',
            fillOpacity: 0.35,
            map: map.value,
        });

        clickCount.value = 0;
    }
    });

};

onMounted(() => {
  if (props.settings) {
    localSettings.value = { ...props.settings };
  }
});

watch(
  () => props.settings,
      (newVal) => {
          localSettings.value = newVal;
      },
      { immediate: true }
);


</script>

<template>
    <div class="settings-content">
        <div class="settings-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/> Settings</div>

        <div class="settings-form">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="initialChosen">Initial Feature Count:</label>
                    <input id="initialChosen" type="text" v-model.number="enabledDispatch" placeholder=props.settings.initialFeatures>
                </div>
                <div class="form-group">
                    <label for="initialChosen">Department Name:</label>
                    <input id="initialChosen" type="text" v-model="deptName" placeholder=props.settings.deptName>
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
      <div class="bounding-header">Northeast: {{ props.settings.location.northeast.lat }}, {{ props.settings.location.northeast.lng }}</div>
      <div class="bounding-header">Southwest: {{ props.settings.location.southwest.lat }}, {{ props.settings.location.southwest.lng }}</div>
      <div id="map" class="bounding-map"></div>
      <div class="bounding-header"><button @click="closeModal">Close</button></div>
    </div>

</template>

<style scoped>
    .settings-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-bottom: 1px solid #6f5656;
        background-color: var(--color-base-300);
        color: var(--color-base-content);
        flex-shrink: 0;
    }
    .settings-form {
        border: 1px solid #ccc;
        border-top: none;
        padding-right: 10px;
        padding-bottom: 10px;
        color: var(--color-base-content);
        background-color: var(--color-base-100);
    }

    .bounding-header {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-bottom: none;
        background-color: var(--color-base-300);
        color: var(--color-base-content);
        flex-shrink: 0;
        font-weight: lighter;
    }

    .bounding-map {
        height: 300px;
        width: 300px;
        border: 1px solid #ccc;
    }



    .form-group {
        display: flex;
        margin-top: 10x;
        margin-bottom: 5px;
        margin-left: 10px;
        padding-top: 5px;
        color: var(--color-base-content);
        background-color: var(--color-base-100);
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
        width: 5ch;
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
        color: var(--color-base-content);
    }

    .bounding-modal {
        max-height: 90vh;
        max-width: 90vw;
        overflow-y: auto;
        overflow-x: hidden;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: var(--color-base-200);
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
    }

</style>
