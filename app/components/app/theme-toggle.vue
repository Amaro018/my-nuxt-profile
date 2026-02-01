<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const colorMode = useColorMode();
const coinSound = ref<HTMLAudioElement | null>(null);

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light';

    // play sound when toggled
    if (coinSound.value) {
      // restart if already playing
      coinSound.value.currentTime = 0;
      coinSound.value.volume = 0.2;
      coinSound.value.play();
    }
  },
});
</script>

<template>
  <label class="swap swap-rotate cursor-pointer">
    <input v-model="isDark" type="checkbox">

    <Icon
      name="lucide:sun"
      class="swap-on"
      size="24"
    />
    <Icon
      name="lucide:moon"
      class="swap-off"
      size="24"
    />
  </label>

  <!-- Hidden audio -->
  <audio
    ref="coinSound"
    src="/sounds/coin.mp3"
    preload="auto"
  />
</template>
