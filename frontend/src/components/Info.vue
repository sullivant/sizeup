<script setup lang="ts">
    import type { AppSettings } from '@/types/AppSettings';
    import { onMounted } from 'vue';
    import { appVersion } from '@/version';


    const emit = defineEmits<{
        (e: 'close-info'): void
    }>();


</script>
<template>
    <div class="info-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/> Info..</div>
    <div class="info-content">App Version: {{  appVersion }}</div>
    <div class="info-content">Author: Thomas Sullivan</div>
    <div class="info-content"><a href="http://github.com/sullivant/sizeup" target="_blank"><font-awesome-icon :icon='"fab fa-github"'/></a></div>

    <div class="button-container">
        <button @click="emit('close-info')">Close</button>
    </div>
</template>

<style scoped>
    .info-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-bottom: 1px solid #6f5656;
        background-color: var(--color-side-item-header);
        color: var(--color-base-content);
        flex-shrink: 0;
    }
    .info-content {
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        height: 2em;
        color: var(--color-side-item-content);
        background-color: var(--color-background);
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
        background-color: var(--color-submit-button);
        color: var(--color-base-content);
        margin-top: 10px;
    }


</style>