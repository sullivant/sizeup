<!-- components/IconTabs.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import IconContainer from './IconContainer.vue'

const activeTab = ref<'icons' | 'questions'>('icons')

import questionData from '@/data/questions.json'
const questions = questionData;

import { reactive } from 'vue'
import type { DraggableIcon } from '@/types/DraggableIcon';

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
    event.preventDefault();
    const newClone: Clone = {
        id: cloneId++,
        icon,
        x: event.clientX,
        y: event.clientY,
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


</script>

<template>
    <IconContainer v-show="activeTab === 'icons'" :clones="clones" :onStartClone="startClone" :onStartCloneDrag="startCloneDrag" :onRemoveClone="removeClone" />
</template>

<style scoped>
    
</style>
