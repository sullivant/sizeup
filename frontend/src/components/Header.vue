<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '../types/MenuItem'

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

const showSettings = () => {
    alert('settings clicked')
}

const showInfo = () => {
    alert('info clicked')
}

const menuItems: MenuItem[] = [
    { label: 'Settings', action: showSettings },
    { label: 'Info', action: showInfo }
]
</script>

<template>
    <header class="header">
        <div class="header-left">
            <img class="logo" src="@/assets/sizeup-logo.png" alt="Sizeup" />
            <span class="logo-text">Sizeup</span>
        </div>
        <div class="header-r">
        <div class="theme" @click="toggleTheme">
            <div v-if="isDark"><font-awesome-icon :icon="['fas', 'moon']" /></div>
            <div v-else><font-awesome-icon :icon="['fas', 'sun']" /></div>
        </div>
        <nav class="menu">
            <button v-for="item in menuItems"
             :key="item.label" @click="item.action">
                {{  item.label }}
            </button>
        </nav>
        </div>
    </header>
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

    .theme {
        display: flex;
        align-items: center;
        margin-right: 1rem;
    }

    .menu button {
        margin-left: 1rem;
    }

</style>