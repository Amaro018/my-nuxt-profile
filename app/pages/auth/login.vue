<script setup lang="ts">
import type { FetchError } from 'ofetch';

useHead({
  title: 'Login',
});

const isLoading = ref(false);
const isPasswordShown = ref(false);

const formData = ref({
  email: '',
  password: '',
});

async function handleLogin() {
  try {
    const response = await $fetch('/api/auth/login', { method: 'POST', body: formData.value });

    if (response)
      return await navigateTo('/dashboard');

    return await navigateTo('/');
  }
  catch (e) {
    const error = e as FetchError;
    formData.value.email = '';
    formData.value.password = '';
    console.error(error);
  }
  isLoading.value = false;
}

function togglePasswordVisibility() {
  isPasswordShown.value = !isPasswordShown.value;
}
</script>

<template>
  <div class="flex flex-col max-h-screen justify-center items-center mt-10">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend class="fieldset-legend nintendo-text">
        ADMIN LOGIN
      </legend>
      <form action="" @submit.prevent="handleLogin">
        <label class="label">Email</label>
        <input
          v-model="formData.email"
          type="email"
          class="input"
          placeholder="Email"
        >

        <label class="label">Password</label>
        <input
          v-model="formData.password"
          :type="isPasswordShown ? 'text' : 'password'"
          class="input"
          placeholder="Password"
        >

        <div class="flex flex-col my-2">
          <label class="label">
            <input
              type="checkbox"
              class="checkbox"
              @click="togglePasswordVisibility"
            >
            Show Password
          </label>

          <button class="btn btn-neutral mt-4" type="submit">
            Login
          </button>
        </div>
      </form>
    </fieldset>
  </div>
</template>
