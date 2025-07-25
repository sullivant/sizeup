
<script setup lang="ts">

import { defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTruck, faAmbulance, faFireExtinguisher, faCar, faBus,
  faHelicopter, faMotorcycle, faShip, faTractor, faTrain
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTruck, faAmbulance, faFireExtinguisher, faCar, faBus,
            faHelicopter, faMotorcycle, faShip, faTractor, faTrain);

const emit = defineEmits(['icon-dropped']);

const icons = [
  { id: 1, name: 'truck' },
  { id: 2, name: 'ambulance' },
  { id: 3, name: 'fire-extinguisher' },
  { id: 4, name: 'car' },
  { id: 5, name: 'bus' },
  { id: 6, name: 'helicopter' },
  { id: 7, name: 'motorcycle' },
  { id: 8, name: 'ship' },
  { id: 9, name: 'tractor' },
  { id: 10, name: 'train' }
];

function onDragStart(icon: { id: number; name: string }, event: DragEvent) {
  event.dataTransfer?.setData('text/plain', JSON.stringify(icon));
}

function onDrop(event: DragEvent) {
  const data = event.dataTransfer?.getData('text/plain');
  if (data) {
    const icon = JSON.parse(data);
    emit('icon-dropped', icon);
  }
}

</script>

<template>
  <div id="icon-list" class="icon-list" @dragover.prevent @drop="onDrop">
    <div
    v-for="icon in icons"
    :key="icon.id"
    class="draggable-icon"
    draggable="true"
    @dragstart="(e) => onDragStart(icon, e)"
    >
    <font-awesome-icon :icon="icon.name" />
    </div>

  </div>
</template>



<style scoped>

.icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  border: 2px dashed #ccc;
  background-color: #f9f9f9;
}

.draggable-icon {
  font-size: 2rem;
  cursor: grab;
}

</style>
