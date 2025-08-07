<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { DraggableIcon } from '@/types/DraggableIcon';

import iconData from '@/data/icons.json';

const icons = ref<DraggableIcon[]>(iconData);

interface Clone {
    id: number;
    icon: DraggableIcon;
    x: number;
    y: number;
}

const props = defineProps<{
    clones: Clone[],
    onStartClone: (icon: DraggableIcon, event: MouseEvent) => void;
    onStartCloneDrag: (index: number, event: MouseEvent) => void;
    onRemoveClone: (index: number) => void;
}>();

function getIconImage(icon: DraggableIcon) {
    return('/icons/'+icon.icon.name);
}


</script>

<template>
    <div class="icon-grid">
        <div v-for="icon in icons" :key="icon.id" class="icon-cell" @mousedown.left="onStartClone(icon, $event)">
            <div v-if="icon.icon.type === 'svg'"><img :src="getIconImage(icon)" :class="icon.icon.action"></div>
            <font-awesome-icon v-else :icon="[icon.icon.type, icon.icon.name]" size="2x"  :class="icon.icon.action" />
        </div>

        <div
            v-for="(clone, index) in clones" :key="clone.id" class="icon-clone"
            :style="{ top: clone.y + 'px', left: clone.x + 'px' }"
            @contextmenu.prevent="onRemoveClone(index)"
            @mousedown.left="(event: any) => onStartCloneDrag(index, event)">
            <div v-if="clone.icon.icon.type === 'svg'"><img :src="getIconImage(clone.icon)" :class="clone.icon.icon.action" ></div>
            <font-awesome-icon v-else :icon="[clone.icon.icon.type, clone.icon.icon.name]" size="2x" />
        </div>
    </div>
</template>


<style scoped>
    .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 0.5rem;
        width: 100%;
        max-width: 400px;
        margin: auto;
        padding: 1rem;
        max-height: 80vh;
        overflow: auto; /* Enables both vertical and horizontal scrolling */
    }
    .icon-grid img {
        width: var(--icon-width);
        height: var(--icon-height);
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

    .icon-clone {
        position: absolute;
        pointer-events: auto;
        cursor: move;
        background: none;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        user-select: none;
        color: rgb(174, 106, 106);
    }

    @media (max-width: 768px) {
        .icon-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            max-width: 400px;
            margin: auto;
        }
    }


    @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
    }
    .wiggle {
        animation: wiggle 0.5s infinite ease-in-out;
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    .pulse {
        animation: pulse 1s infinite ease-in-out;
    }
    @keyframes fireWave {
        0% {
            transform: scale(1) skewX(0deg);
            opacity: 0.9;
        }
        25% {
            transform: scale(1.5) skewX(20deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.1) skewX(-20deg);
            opacity: 0.85;
        }
        75% {
            transform: scale(1.5) skewX(1deg);
            opacity: 0.95;
        }
        100% {
            transform: scale(1) skewX(0deg);
            opacity: 0.9;
        }
    }

    .fire-effect {
        animation: fireWave 1.2s infinite ease-in-out;
        transform-origin: center;
    }

    @keyframes verticalWave {
    0% {
        transform: translateY(0) scaleY(1);
        opacity: 1;
    }
    25% {
        transform: translateY(-2px) scaleY(1.05);
        opacity: 0.9;
    }
    50% {
        transform: translateY(-4px) scaleY(0.95);
        opacity: 0.85;
    }
    75% {
        transform: translateY(-2px) scaleY(1.02);
        opacity: 0.95;
    }
    100% {
        transform: translateY(0) scaleY(1);
        opacity: 1;
    }
    }

    .fuzz {
        animation: verticalWave 0.8s infinite ease-in-out;
        transform-origin: center;
    }


</style>
