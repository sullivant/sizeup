<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { ScenarioItem } from '@/types/ScenarioItem';
import type { AppSettings } from '@/types/AppSettings';

  const emit = defineEmits(['onScene']);

  const props = defineProps<{
    settings: AppSettings;
    address: string;
    scenarioDispatch: ScenarioItem[];
  }>()

  const speed = 25;
  const autoStart = true;

  const dispatchTextFull = ref('')
  const displayedText = ref('');
  const currentIndex = ref(0);
  const intervalId = ref<number | null>(null);

  let debounceTimer: number | null = null;

  const startTyping = () => {
    if (intervalId.value !== null) return; // prevent multiple intervals

    intervalId.value = window.setInterval(() => {
      if (currentIndex.value < dispatchTextFull.value.length) {
        displayedText.value += dispatchTextFull.value[currentIndex.value];
        currentIndex.value++;
      } else {
        clearInterval(intervalId.value!);
        intervalId.value = null;
      }
    }, speed ?? 50);
  };


  watch([() => props.address, () => props.scenarioDispatch], () => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = window.setTimeout(() => {
      displayedText.value = '';
      currentIndex.value = 0;

      const deptName = props.settings.deptName ?? "Fire Dept";

      // Build our "plain english" description of this dispatch transmission.
      dispatchTextFull.value = deptName+", respond to "+props.address+" ";
      dispatchTextFull.value += "for the report of ";

      filteredScenarios.value.forEach((v, i) => {
        dispatchTextFull.value += v.name;
        if (filteredScenarios.value.length > 0 &&  i < (filteredScenarios.value.length-1)) {
          dispatchTextFull.value += " and ";
        }
      });


      if (autoStart) startTyping();
    }, 1000);
  });

  const filteredScenarios = computed(() =>
      [...props.scenarioDispatch].filter((s) => s.enabled)
  )


</script>

<template>


  <div class="radio-text">
    <span>{{ displayedText }}</span>
  </div>
  <div class="control-grid">
      <div class="control-cell" @click="emit('onScene', true)">On Scene</div>
  </div>

</template>


<style scoped>
  .radio-text {
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap;
    background-color: var(--color-base-100);
    border: 1px solid #ccc;
    color: var(--color-base-content);
    padding: 1em;
    border-radius: var(--radius-box);
    font-size: 1.2em;
    width: 100%;
  }

  .control-grid {
    display: none;
  }

  .control-grid {
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
    background: var(--color-base-100);
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


  @media (max-width: 896px) {
    .control-grid {
      display: grid;
    }
  }
</style>


