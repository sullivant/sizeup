<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '../types/MenuItem'

import Info from '@/components/InfoView.vue';

const isDark = ref(false) // Default is light mode.
const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches

    console.log("Prefers dark is: "+prefersDark);

    // isDark.value = !prefersDark
    isDark.value = false; // I want light first.

    document.documentElement.classList.toggle('dark',isDark.value)
})

const displaySettings = ref(false);
const displayInfo = ref(false);

const toggleSettings = () => {
    displayInfo.value = false;
    console.log("Emitting toggle-settings");
    emit('toggle-settings');
}

const showInfo = () => {
    displaySettings.value = false;
    displayInfo.value = !displayInfo.value;
}

const menuItems: MenuItem[] = [
    { label: 'Settings', icon: {type: "fas", name: "gears"} ,action: toggleSettings },
    { label: 'Info', icon: {type: "far", name: "circle-question"}, action: showInfo }
]

const emit = defineEmits<{
  (e: 'toggle-settings'): void
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

    <div v-show="displayInfo" class="info-modal">
        <Info @close-info="showInfo()" />
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
        background-color: var(--color-base-300);
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

    .settings-modal, .info-modal {
        width: auto;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9900;
        background: var(--color-base-200);
        margin: 2px;

        overflow: auto;
        background-color: var(--color-base-100);
        border: var(--border) solid #ccc;
        border-radius: var(--radius-box);



    }


</style>
