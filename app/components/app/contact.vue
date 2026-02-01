<script setup lang="ts">
import { Motion } from 'motion-v';

import { useToast } from '../../composables/use-toast';

const { toastMessage, toastType, showToast } = useToast();

const yahooSound = ref<HTMLAudioElement | null>(null);
const isSubmitting = ref(false);
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

function handleSubmit() {
  isSubmitting.value = true;
  try {
    const res = $fetch('/api/mail', {
      method: 'POST',
      body: formData.value,
    });
      // Play sound
    showToast('Message sent successfully', 'success');
    yahooSound.value?.play();
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };

    console.warn(res);
  }
  catch (e) {
    console.error(e);
  }
  finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="">
    <Motion
      tag="div"
      class="my-10 md:px-16"
      :initial="{ opacity: 0, x: -50 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :viewport="{ once: true, amount: 0.3 }"
      :transition="{ duration: 0.6 }"
    >
      <p class="text-center nintendo-text">
        Contact
      </p>
    </Motion>
    <div class="flex flex-col md:flex-row justify-center">
      <!-- LEFT CARD -->
      <Motion
        tag="div"
        class="my-10 md:px-16"
        :initial="{ opacity: 0, x: -50 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.6 }"
      >
        <fieldset class="fieldset bg-nutral-200 border-base-300 rounded-box w-full md:w-lg border p-4">
          <legend class="fieldset-legend nintendo-text">
            GET IN TOUCH
          </legend>
          <div class="flex flex-col gap-4 nintendo-text">
            <p>
              Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision
            </p>
            <NuxtLink
              to="https://github.com/Amaro018"
              class="flex gap-4 items-center hover:underline"
              target="_blank"
            >
              <Icon name="lucide:github" class="w-8 h-8" />
              <p class="nintendo-text">
                github.com/Amaro018
              </p>
            </NuxtLink>
            <NuxtLink
              to="https://www.facebook.com/amaro018/"
              class="flex gap-4 items-center hover:underline"
              target="_blank"
            >
              <Icon name="lucide:facebook" class="w-8 h-8" />
              <p class="nintendo-text">
                facebook.com/amaro018
              </p>
            </NuxtLink>
            <NuxtLink to="mailto:jhomari.amaro@gmail.com" class="flex gap-4 items-center hover:underline">
              <Icon name="lucide:mail" class="w-8 h-8" />
              <p class="nintendo-text">
                jhomari.amaro@gmail.com
              </p>
            </NuxtLink>
            <NuxtLink to="tel:+639093087961" class="flex gap-4 items-center hover:underline">
              <Icon name="lucide:phone" class="w-8 h-8" />
              <p class="nintendo-text">
                +63 909 308 7961
              </p>
            </NuxtLink>
          </div>
        </fieldset>
      </Motion>

      <!-- RIGHT FORM -->
      <Motion
        tag="div"
        class="my-10 md:px-16"
        :initial="{ opacity: 0, x: 50 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <form action="" @submit.prevent="handleSubmit">
          <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-lg border p-4">
            <legend class="fieldset-legend nintendo-text">
              SEND AN EMAIL
            </legend>
            <fieldset>
              <legend class="fieldset-legend nintendo-text">
                NAME
              </legend>
              <input
                v-model="formData.name"
                type="text"
                class="input w-full"
                required
              >
            </fieldset>

            <fieldset>
              <legend class="fieldset-legend nintendo-text">
                EMAIL
              </legend>
              <input
                v-model="formData.email"
                type="email"
                class="input w-full"
                required
              >
            </fieldset>

            <fieldset>
              <legend class="fieldset-legend nintendo-text">
                SUBJECT
              </legend>
              <input
                v-model="formData.subject"
                type="text"
                class="input w-full"
              >
            </fieldset>

            <fieldset>
              <legend class="fieldset-legend nintendo-text">
                MESSAGE
              </legend>
              <textarea
                v-model="formData.message"
                class="textarea w-full h-24"
                required
              />
            </fieldset>

            <div class="my-2">
              <button
                v-if="!formData.name.length || !formData.email.length || !formData.subject.length || !formData.message.length"
                disabled
                class="btn btn-neutral w-full nintendo-text"
              >
                PRESS HERE TO SUBMIT
              </button>
              <button
                v-else
                class="btn btn-neutral w-full nintendo-text"
                :class="{
                  'animate-blink': formData.name.length > 0 && formData.email.length > 0 && formData.subject.length > 0 && formData.message.length > 0,
                }"
                type="submit"
              >
                {{ isSubmitting ? 'Sending...' : 'PRESS HERE TO SUBMIT' }}
              </button>
            </div>
          </fieldset>
        </form>
      </Motion>
    </div>
    <audio
      ref="yahooSound"
      src="/sounds/mario.mp3"
      preload="auto"
    />

    <div v-if="toastMessage" class="toast toast-top toast-end z-50 fixed right-4 top-4 nintendo-text">
      <div role="alert" :class="`alert alert-${toastType}`">
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>
