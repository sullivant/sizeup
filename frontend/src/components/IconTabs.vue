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
  <div class="tabs-container">
    <div class="tab-buttons">
      <button :class="{ active: activeTab === 'icons' }" @click="activeTab = 'icons'">Icons</button>
      <button :class="{ active: activeTab === 'questions' }" @click="activeTab = 'questions'">Size-Up Questions</button>
    </div>

    <div class="tab-content scrollable-container">
        <IconContainer v-show="activeTab === 'icons'" :clones="clones" :onStartClone="startClone" :onStartCloneDrag="startCloneDrag" :onRemoveClone="removeClone" />

        <div v-show="activeTab === 'questions'">
            <ul v-for="section in questions" :key="section.category">
            <li><strong>{{ section.category }}</strong></li>
            <ul>
                <li v-for="question in section.questions" :key="question">{{ question }}</li>
            </ul>
            </ul>
        </div>
    </div>
  </div>
</template>

<style scoped>
    .tabs-container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .tab-buttons {
        display: flex;
        border-bottom: 1px solid #ccc;
    }

    .tab-buttons button {
        flex: 1;
        padding: 0.5rem;
        font-weight: bold;
        background-color: var(--color-background);
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        color: var(--color-base-content);
    }

    .tab-buttons button.active {
        border-bottom: 2px solid var(--color-primary, #007bff);
        background-color: var(--color-base-300);
    }

    .tab-content {
        flex: 1;
        overflow-y: auto;
        padding: 0.5rem;
        color: var(--color-base-content);
    }

    
</style>
