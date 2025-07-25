<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';
    
    import type { Apparatus } from '@/types/Apparatus';

    const props = defineProps<{
        apparatus: Apparatus[]
    }>();

    // Ensures the enabled toggles show up first
    const sortedApparatusToggles = computed(() =>
        [...props.apparatus].sort((a,b) => Number(b.enabled) - Number(a.enabled))
    )

    function toggleApparatus(id: number) {
        const item = props.apparatus.find(i => i.id === id)
        if (item) {
            item.enabled = !item.enabled
        }
    }
    
</script>

<template>
    <ul>
        <li v-for="item in sortedApparatusToggles" :key="item.id" @click="toggleApparatus(item.id)">
            <font-awesome-icon :icon="item.enabled ? 'fa-regular fa-square-check' : 'fa-regular fa-square'"  /> {{ item.name }}
        </li>
    </ul>
</template>