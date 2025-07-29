<script setup lang="ts">
import type { AppSettings } from '@/types/AppSettings';

const props = defineProps<{
        settings: AppSettings
}>()

const handleSubmit = () => {
    alert("settings updated.")
}

</script>

<template>
    <div class="settings-content">
        <div class="settings-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/>Settings..</div>

        <div class="settings-form">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="initialChosen">Initial Feature Count:</label>
                    <input id="initialChosen" type="text" v-model.number="props.settings.initialFeatures" placeholder=props.settings.initialFeatures></input>
                </div>

                <div class="form-group-header">Bounding Box (lat, lng):</div>
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

                <div class="button-container">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
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
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 10px;
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
    }

    button[type="submit"] {
        background-color: #788a79;
        color: white;
    }


</style>