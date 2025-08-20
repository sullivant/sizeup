<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { ScenarioItem } from '@/types/ScenarioItem';


  const props = defineProps<{
      address: string;
      scenarioDispatch: ScenarioItem[];
  }>()

  const speed = 25;
  const autoStart = true;

  const dispatchTextFull = ref('')
  const displayedText = ref('');
  const currentIndex = ref(0);
  const intervalId = ref<number | null>(null);

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

  watch(() => props.address, () => {
    displayedText.value = '';
    currentIndex.value = 0;

    // Build our "plain english" description of this dispatch transmission.
    dispatchTextFull.value = "Winsted Fire, respond to "+props.address+" ";
    dispatchTextFull.value += "for the report of ";

    filteredScenarios.value.forEach((v, i) => {
      dispatchTextFull.value += v.name;
      if (filteredScenarios.value.length > 0 &&  i < (filteredScenarios.value.length-1)) {
        dispatchTextFull.value += " and ";
      }
    });


    if (autoStart) startTyping();
  });

  const filteredScenarios = computed(() =>
      [...props.scenarioDispatch].filter((s) => s.enabled)
  )

</script>

<template>


  <div class="radio-text">
    <span>{{ displayedText }}</span>
  </div>


</template>


<style scoped>
  .radio-text {
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap;
    background-color: var(--color-base-300);
    color: var(--color-base-content);
    padding: 1em;
    border-radius: 8px;
    font-size: 1.2em;
  }
</style>
