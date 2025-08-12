<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';

    const emit = defineEmits<{
      (e: 'update-on-scene', onScene: boolean): void
    }>();


</script>

<template>
    <div class="control-grid">
        <div class="control-cell">Dispatch</div>
        <div class="control-cell" @click="emit('update-on-scene', true)">On Scene</div>
    </div>
</template>

<style scoped>

    .control-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 0.5rem;
        width: 100%;
        max-width: 600px;
        margin: auto;
        padding: 1rem;
        max-height: 80vh;
        overflow: auto;
    }


    .control-cell {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: var(--color-base-200);
        cursor: grab;
        color: var(--color-primary-content);
        text-align: center;
        word-wrap: break-word;
        white-space: normal;
        height: auto;
        min-height: 60px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .control-cell:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

</style>