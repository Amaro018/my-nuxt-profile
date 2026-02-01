<script setup lang="ts">
const props = defineProps<{ projectData: any }>();

const emit = defineEmits<{
  (e: 'showModal'): void;
  (e: 'submit', data: any): void;
  (e: 'update:isSubmitting', value: boolean): void;
}>();
const isSubmitting = ref(false);
const imageUrl = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const localProjectData = ref({
  name: props.projectData.name,
  description: props.projectData.description,
  category: props.projectData.category,
  live_demo: props.projectData.live_demo,
  github_link: props.projectData.github_link,
  imageFile: null as File | null,
});

async function handleSubmit() {
  isSubmitting.value = true;
  emit('update:isSubmitting', true);

  // Simulate async work. Replace with real logic if needed.
  emit('submit', { ...localProjectData.value });

  // Clear form (reset fields to default/empty values)
  localProjectData.value = {
    name: props.projectData.name || '',
    description: props.projectData.description || '',
    category: props.projectData.category || '',
    live_demo: props.projectData.live_demo || '',
    github_link: props.projectData.github_link || '',
    imageFile: null,
  };
  imageUrl.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }

  isSubmitting.value = false;
  emit('update:isSubmitting', false);

  // Close modal
  emit('showModal');
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;

  localProjectData.value.imageFile = file;

  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
  else {
    imageUrl.value = null;
  }
}

watch(
  () => props.projectData,
  (newProject) => {
    localProjectData.value = {
      name: newProject.name || '',
      description: newProject.description || '',
      category: newProject.category || '',
      live_demo: newProject.live_demo || '',
      github_link: newProject.github_link || '',
      imageFile: null,
      // keep id for update
    };
    // Optionally show current image preview if editing
    imageUrl.value = newProject.image ? newProject.image : null;
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between my-2">
      <p>ADDING NEW PROJECT</p>
    </div>

    <form
      method="dialog"
      class="flex flex-col gap-2"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="localProjectData.name"
        type="text"
        placeholder="Project Name"
        class="input w-full"
      >

      <input
        v-model="localProjectData.description"
        type="text"
        placeholder="Project Description"
        class="input w-full textarea h-6"
      >

      <select
        v-model="localProjectData.category"
        class="select w-full"
      >
        <option value="" disabled>
          Select a category
        </option>
        <option value="featured">
          Featured
        </option>
        <option value="web development">
          Web Development
        </option>
        <option value="mobile development">
          Mobile Development
        </option>
        <option value="desktop development">
          Desktop Development
        </option>
      </select>

      <input
        v-model="localProjectData.live_demo"
        type="text"
        placeholder="Demo Link"
        class="input w-full"
      >

      <input
        v-model="localProjectData.github_link"
        type="text"
        placeholder="Repository Link"
        class="input w-full"
      >
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="file-input file-input-primary w-full"

        @change="handleFileChange"
      >

      <div v-if="imageUrl" class="mt-4 flex flex-col items-center">
        <p>Preview:</p>
        <img
          :src="imageUrl"
          alt="Cake preview"
          class="w-48 h-48 object-cover rounded"
        >
      </div>
      <button
        type="submit"
        class="btn"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
      </button>
      <button class="btn" @click="emit('showModal')">
        Close
      </button>
    </form>
  </div>
</template>
