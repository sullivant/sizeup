<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '../types/MenuItem'

import Settings from '@/components/Settings.vue'
import type { AppSettings } from '@/types/AppSettings';

const props = defineProps<{
        settings: AppSettings,
        settingsVersion: number
}>()


const isDark = ref(false) // Default is light mode.
const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches 
    isDark.value = prefersDark

    document.documentElement.classList.toggle('dark',isDark.value)
})

const displaySettings = ref(false);

const showSettings = () => {
    displaySettings.value = !displaySettings.value;
}

const showInfo = () => {
    alert('info clicked')
}

const menuItems: MenuItem[] = [
    { label: 'Settings', icon: {type: "fas", name: "gears"} ,action: showSettings },
    { label: 'Info', icon: {type: "far", name: "circle-question"}, action: showInfo }
]



function handleSettingsUpdate(newSettings: AppSettings) {
    console.log("header emitting settings:"+newSettings.initialFeatures);
    emit('update-settings', newSettings);
}

const emit = defineEmits<{
  (e: 'update-settings', newSettings: AppSettings): void
}>();
</script>

<template>
    <header class="header">
        <div class="header-left">
            <img class="logo" src="@/assets/sizeup-logo.png" alt="Sizeup" />
            <span class="logo-text">Sizeup</span>
        </div>
        <div class="header-r">
        <nav class="menu">
            <div class="menu-item" @click="toggleTheme">
                <div v-if="isDark"><font-awesome-icon :icon="['fas', 'moon']" /></div>
                <div v-else><font-awesome-icon :icon="['far', 'lightbulb']" /></div>
            </div>
            <div class="menu-item" v-for="item in menuItems" :key="item.label" @click="item.action">
                <font-awesome-icon :icon="[item.icon.type, item.icon.name]" size="1x"/>
            </div>
        </nav>
        </div>
    </header>

    <div v-show="displaySettings" class="settings-modal">
        <Settings :settings="props.settings" @update-settings="handleSettingsUpdate" :settings-version="props.settingsVersion" />
    </div>
</template>

<style scoped>
    .logo {
        height: 60px;
        margin-right: 0.5rem;
    }

    .logo-text {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background-color: #2c3e50;
        color: white;
    }

    .header-left {
        display: flex;
        align-items: center;
    }

    .header-r {
        display: flex;
        align-items: center;
    }

    .menu {
        display:flex;
    }
    .menu-item {
        margin-left: 1rem;
    }

    .hidden {
        visibility: hidden;
    }

    .settings-modal {
        height: 25%;
        width: 30%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: var(--color-main-background);
        padding: 20px;
        border-radius: 10px;
    }


</style>