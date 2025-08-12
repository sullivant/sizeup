<script setup lang="ts">
    import { ref, computed, defineProps } from 'vue';

    const emit = defineEmits<{
      (e: 'update-on-scene', onScene: boolean): void
    }>();


</script>

<template>
...Dispatch controls here...<div @click="emit('update-on-scene', true)">((On Scene))</div>
</template>

<style scoped>

</style>