<script setup lang="ts">
import { ref } from 'vue';
import type { DraggableIcon } from '@/types/DraggableIcon';

import iconData from '@/data/icons.json';

const icons = ref<DraggableIcon[]>(iconData);

</script>

<template>
    <div class="icon-grid">
        <div v-for="icon in icons" :key="icon.id" class="icon-cell" draggable="true">
            <font-awesome-icon :icon="[icon.icon.type, icon.icon.name]" size="2x"/>
        </div>
    </div>
</template>


<style scoped>
    .icon-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    max-width: 400px;
    margin: auto;
    }
    .icon-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
    cursor: grab;
    color: rgb(174, 106, 106);
    }
</style>
