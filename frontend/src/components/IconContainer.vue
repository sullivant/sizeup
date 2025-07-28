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

const clones = reactive<Clone[]>([]);
let cloneId = 0;
const draggingCloneIndex = ref<number | null>(null);

const startClone = (icon: DraggableIcon, event: MouseEvent) => {
    const newClone: Clone = {
        id: cloneId++,
        icon,
        x: event.clientX,
        y: event.clientY,
    };
    clones.push(newClone);
    draggingCloneIndex.value = clones.length -1;

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
    clones.splice(index, 1);
};

const startCloneDrag = (index: number, event: MouseEvent) => {
    draggingCloneIndex.value = index;
    clones[index].x = event.clientX;
    clones[index].y = event.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDrag);
};

</script>

<template>
    <div class="icon-grid">
        <div v-for="icon in icons" :key="icon.id" class="icon-cell" @mousedown.left="startClone(icon, $event)">
            <font-awesome-icon :icon="[icon.icon.type, icon.icon.name]" size="2x"/>
        </div>

        <div
            v-for="(clone, index) in clones" :key="clone.id" class="icon-clone"
            :style="{ top: clone.y + 'px', left: clone.x + 'px' }"
            @contextmenu.prevent="removeClone(index)"
            @mousedown.left="(event) => startCloneDrag(index, event)">
            <font-awesome-icon :icon="[clone.icon.icon.type, clone.icon.icon.name]" size="2x" />
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

    .icon-clone {
        position: absolute;
        pointer-events: auto;
        cursor: move;
        background: white;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        user-select: none;
    }

</style>
