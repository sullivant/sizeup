<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { ref, watch } from 'vue';

import type { AIResponse } from '@/types/AIResponse';
// import type { AIAudioResponse } from '@/types/AIResponse';

const prompt = ref('');
const response = ref('');
const error = ref('');
const loading = ref(false);

const props = defineProps<{
  dispatchText: string;
}>()

const audioPlayer = ref<HTMLAudioElement | null>(null);


const sendPrompt = async () => {
  loading.value = true;
  error.value = '';
  response.value = '';

  const payload = {
    prompt: prompt.value,
  };

  console.log("Sending prompt:"+payload.prompt);

  try {
    //
    const res = await fetch('https://sizeup-backend.sullivanscientific.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json() as AIResponse; //AIAudioResponse
    console.log(data);

    // // Our audio data is in data.audio let's decode the base64
    // const binaryString = atob(data.response);
    // const byteArray = new Uint8Array(binaryString.length);
    // for (let i = 0; i < binaryString.length; i++) {
    //   byteArray[i] = binaryString.charCodeAt(i);
    // }
    // // And make some audio from it
    // const blob = new Blob([byteArray], { type: 'audio/mpeg' });
    // const audioUrl = URL.createObjectURL(blob);

    // // And then play it
    // if (audioPlayer.value) {
    //   audioPlayer.value.src = audioUrl;
    //   audioPlayer.value.play();
    // }


    response.value = data.response; //JSON.stringify(data, null, 2);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

  watch([() => props.dispatchText], () => {
    prompt.value = props.dispatchText;
  });

</script>

<template>
  <div class="prompt-sender">
    <h2>Send Prompt to Worker</h2>
    <input
      v-model="prompt"
      type="text"
      class="prompt-input"
    />
    <button @click="sendPrompt" :disabled="loading">
      {{ loading ? 'Sending...' : 'Send Prompt' }}
    </button>

    <div v-if="response" class="response-box">
      <h3>Response:</h3>
      <pre>{{ response }}</pre>
    </div>

    <div v-if="error" class="error-box">
      <h3>Error:</h3>
      <pre>{{ error }}</pre>
    </div>
  </div>


  <div>
    <audio ref="audioPlayer" controls />
  </div>


</template>


<style scoped>
.prompt-sender {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.prompt-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
}

.response-box,
.error-box {
  margin-top: 1rem;
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
}
</style>
