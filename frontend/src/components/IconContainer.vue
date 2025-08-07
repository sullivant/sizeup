<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import type { DraggableIcon } from '@/types/DraggableIcon';

    import iconData from '@/data/icons.json';

    const props = defineProps<{
        streetViewActive: boolean
    }>();

    const icons = ref<DraggableIcon[]>(iconData);

    interface Clone {
        id: number;
        icon: DraggableIcon;
        x: number;
        y: number;
        width: number;
        height: number;
    }

    function getIconImage(icon: DraggableIcon) {
        return('/icons/'+icon.icon.name);
    }

    const clones = reactive<Clone[]>([]);
    let cloneId = 0;
    const draggingCloneIndex = ref<number | null>(null);
    const resizingCloneIndex = ref<number | null>(null);
    const initialMouse = ref<{ x: number; y: number } | null>(null);



    const startClone = (icon: DraggableIcon, event: MouseEvent) => {
        event.preventDefault();
        const newClone: Clone = {
            id: cloneId++,
            icon,
            x: event.clientX,
            y: event.clientY,
            width: 64,
            height: 64
        };
        clones.push(newClone);
        draggingCloneIndex.value = clones.length - 1;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDrag);
    };

    const onMouseMove = (event: MouseEvent) => {
        if (draggingCloneIndex.value !== null) {
            clones[draggingCloneIndex.value].x = event.clientX;
            clones[draggingCloneIndex.value].y = event.clientY;
        }
    };

    const stopDrag = () => {
        draggingCloneIndex.value = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDrag);
    }

    const removeClone = (index: number) => {
        if (resizingCloneIndex.value === index) {
            stopResize();
        }
        clones.splice(index, 1);
    };


    const startCloneDrag = (index: number, event: MouseEvent) => {
        event.preventDefault();
        draggingCloneIndex.value = index;
        clones[index].x = event.clientX;
        clones[index].y = event.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDrag);
    };



    const startResize = (index: number, event: MouseEvent) => {
        resizingCloneIndex.value = index;
        initialMouse.value = { x: event.clientX, y: event.clientY };
        document.addEventListener('mousemove', onResizeMove);
        document.addEventListener('mouseup', stopResize);
    };

    const onResizeMove = (event: MouseEvent) => {
        if (resizingCloneIndex.value !== null && initialMouse.value) {
            const clone = clones[resizingCloneIndex.value];
            const dx = event.clientX - initialMouse.value.x;
            const dy = event.clientY - initialMouse.value.y;
            clone.width = Math.max(20, clone.width + dx);
            clone.height = Math.max(20, clone.height + dy);
            initialMouse.value = { x: event.clientX, y: event.clientY };
        }
    };

    const stopResize = () => {
        resizingCloneIndex.value = null;
        initialMouse.value = null;
        document.removeEventListener('mousemove', onResizeMove);
        document.removeEventListener('mouseup', stopResize);
    };




</script>

<template>
    <div v-if="resizingCloneIndex !== null" class="resize-overlay"></div>

    <div class="icon-grid">
        <div v-for="icon in icons" :key="icon.id" class="icon-cell" @mousedown.left="startClone(icon, $event)">
            <div v-if="icon.icon.type === 'svg'"><img :src="getIconImage(icon)" :class="icon.icon.action" class="icon-orig"></div>
            <!-- <font-awesome-icon v-else :icon="[icon.icon.type, icon.icon.name]" size="2x"  :class="icon.icon.action" /> -->
        </div>

        <div v-show="props.streetViewActive"
            v-for="(clone, index) in clones" :key="clone.id" class="icon-clone"
            :style="{ top: clone.y + 'px', left: clone.x + 'px' }"
            @contextmenu.prevent="removeClone(index)"
            @mousedown.left="(event: any) => startCloneDrag(index, event)">
            <div v-if="clone.icon.icon.type === 'svg'"><img :src="getIconImage(clone.icon)" :class="clone.icon.icon.action" :width="clone.width" :heigh="clone.height" ></div>
            <!-- <font-awesome-icon v-else :icon="[clone.icon.icon.type, clone.icon.icon.name]" size="2x" /> -->

            <div
                class="resize-handle"
                @mousedown.stop.prevent="startResize(index, $event)"
            ></div>
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


    .icon-orig {
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

    .resize-handle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        background: #555;
        border: 2px solid white;
        border-radius: 50%;
        cursor: nwse-resize;
        z-index: 10;
    }
    .resize-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        cursor: nwse-resize;
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
