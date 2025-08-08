<script setup lang="ts">
    import type { AppSettings } from '@/types/AppSettings';
    import { onMounted } from 'vue';
    import { appVersion } from '@/version';


    const emit = defineEmits<{
        (e: 'close-info'): void
    }>();


</script>
<template>
    <div class="info-content">
        <div class="info-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/> Info</div>
        <div class="info-detail">App Version: {{  appVersion }}</div>
        <div class="info-detail">Author: Thomas Sullivan</div>
        <div class="info-detail"><a href="http://github.com/sullivant/sizeup" target="_blank"><font-awesome-icon :icon='"fab fa-github"'/></a></div>
        <div class="button-container">
            <button @click="emit('close-info')">Close</button>
        </div>
    </div>


    

</template>

<style scoped>
    .info-content {
        background-color: var(--color-base-100);
        border: 1px solid #ccc;
    }

    .info-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-bottom: 1px solid #6f5656;
        background-color: var(--color-base-300);
        color: var(--color-base-content);
        flex-shrink: 0;
    }

    .info-detail {
        display: flex;
        margin-top: 10x;
        margin-bottom: 5px;
        margin-left: 10px;
        padding-top: 5px;
        padding-right: 5px;
        color: var(--color-base-content);
        background-color: var(--color-base-100);
    }

    .button-container {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
    }

    button {
        padding: 8px 12px;
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
        background-color: var(--color-submit-button);
        color: var(--color-base-content);
    }

</style>