<script setup lang="ts">
import type { MenuItem } from '../types/MenuItem'

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