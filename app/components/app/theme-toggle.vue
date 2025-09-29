<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(({
  get() {
    return colorMode.value === 'dark';
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light';
  },
}));
</script>

<template>
  <label class="swap swap-rotate">
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
</template>
