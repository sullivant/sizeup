<script setup lang="ts">
    import {ref, defineProps, onMounted } from 'vue';

    import { MotionDirective as motion } from '@vueuse/motion'

    import ScenarioItems from '@/components/ScenarioItems.vue'
    import ScenarioEnvironment from '@/components/ScenarioEnvironment.vue';
    import ApparatusList from './ApparatusList.vue';
    import IconList from '@/components/IconList.vue';


    import type { MenuItem } from '@/types/MenuItem';
    import type { ScenarioItem } from '@/types/ScenarioItem'
    import type { ScenarioEnvironment as typeScenarioEnvironment } from '@/types/typeScenarioEnvironment';
    import type { Apparatus } from '@/types/Apparatus';
    
    const props = defineProps<{
        scenarioToggles: ScenarioItem[]
        scenarioEnvironment: typeScenarioEnvironment
        apparatus: Apparatus[]
    }>();



    type DroppedIcon = {
        id: number;
        name: string;
        x: number;
        y: number;
    };

    const droppedIcons = ref<DroppedIcon[]>([]);

    function handleIconDrop(icon: { id: number; name: string }) {
    droppedIcons.value.push({ ...icon, x: 10, y: 10 });
    }

    function updatePosition(index: number, x: number, y: number) {
    droppedIcons.value[index].x = x;
    droppedIcons.value[index].y = y;
    }





</script>

<template>
    <main class="grid-container">
        <div class="row">
            <div class="main-item">
                <div id="street-view" class="street-view">
                    <Motion
                        v-for="(icon, index) in droppedIcons"
                        :key="icon.id + '-' + index"
                        class="draggable-icon"
                        :initial="{ x: icon.x, y: icon.y }"
                        :drag="true"
                        dragConstraints="#street-view"
                        @drag-end="(e: { x: number; y: number }) => updatePosition(index, e.x, e.y)"
                    >
                        <font-awesome-icon :icon="icon.name" />
                    </Motion>
                    </div>


            </div>
            <div class="side-items">
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-life-ring"'/>Conditions</div>
                    <div class="scrollable-container">
                        <ScenarioEnvironment :scenario-environment="scenarioEnvironment"/>
                    </div>
                </div>
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-rectangle-list"'/>Features</div>
                    <div class="scrollable-container">
                        <ScenarioItems :scenario-toggles="scenarioToggles"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="main-item">
                Main Item. Notes Screen.
            </div>
            <div class="side-items">
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-truck"'/>Apparatus</div>
                    <div class="scrollable-container">
                        <ApparatusList :apparatus="apparatus"/>
                    </div>
                </div>
                <div class="side-item">
                    <div class="side-header"><font-awesome-icon :icon='"far fa-truck"'/>Icons</div>
                    <div class="scrollable-container" id="icon-list">
                        <IconList @icon-dropped="handleIconDrop" />
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<style scoped>
    .grid-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        /* flex: 1; */
        width: 100%;
        height: 100%;
        background-color: var(--color-main-background);/* #ecf0f1; */
        overflow: hidden;
        box-sizing: border-box;
    }

    .row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        height: 50%;
        min-height: 0;
    }

    .main-item {
        background-color: var(--color-background);
        padding: 1rem;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
    }

    .side-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
        min-height: 0;
    }

    .side-item {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        background-color: var(--color-background);
        border: 1px solid #ccc;
    }

    .side-header {
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        background-color: var(--color-header-background, #f5f5f5);
        flex-shrink: 0;
    }

    .scrollable-container {
        flex: 1; 
        overflow-y: auto;
        padding: 0.5rem;
        border: none;
    }   

    .scrollable-container ul {
        list-style: none;
        padding-left: 1em;
    }

    @media (max-width: 768px) {
        .row {
            display: flex;
            flex-direction: column;
            height: auto;
        }
        .side-items {
            display: flex;
            flex-direction: column;
        }
        
    }



.street-view {
  position: relative;
  min-height: 400px;
  min-width: 100%;
  border: 2px dashed #888;
  background-color: #eef;
  padding: 1rem;
  overflow: hidden;
}

.draggable-icon {
  position: absolute;
  font-size: 2rem;
  cursor: grab;
  user-select: none;
}



</style>