<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '../types/MenuItem'

const isDark = ref(false) // Default is light mode.
const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches 
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
        <div class="logo">Sizeup</div>
        <nav class="menu">
            <button @click="toggleTheme">
                {{  isDark ? 'Light' : 'Dark' }}
            </button>
            <button v-for="item in menuItems"
             :key="item.label" @click="item.action">
                {{  item.label }}
            </button>
        </nav>
    </header>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #2c3e50;
        color: white;
    }
    .menu button {
        margin-left: 1rem;
    }
</style>