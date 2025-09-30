<script setup lang="ts">
useHead({
  title: 'Jun Dashboard',
});
type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const { data: projects, refresh } = useFetch('/api/project');

const { user } = useUserSession();

const currentUser = computed(() => user.value as SessionUser);

const showModal = ref(false);

function handleOpen() {
  showModal.value = true;
}

const projectData = ref({
  name: '',
  description: '',
  category: '',
  live_demo: '',
  github_link: '',
  imageFile: null,
});

async function handleSubmit(data: typeof projectData.value) {
  const payload = new FormData();

  payload.append('name', data.name);
  payload.append('description', data.description);
  payload.append('category', data.category);
  payload.append('live_demo', data.live_demo);
  payload.append('github_link', data.github_link);

  if (data.imageFile) {
    payload.append('imageFile', data.imageFile); // append the File
  }

  try {
    await $fetch('/api/project', {
      method: 'POST',
      body: payload,
    });
    refresh();
    console.warn('Project created successfully');
  }
  catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div v-if="!currentUser">
    <p>Unauthorized</p>
  </div>

  <div v-else class="flex flex-col my-10 nintendo-text md:p-16">
    <div class="flex flex-col justify-between md:flex-row gap-4">
      <p class="capitalize text-xs md:text-3xl">
        dashboard
      </p>
      <button
        class="btn btn-neutral"
        @click="handleOpen"
      >
        Add a project
      </button>
    </div>
    <div class="my-10 flex flex-col gap-4 md:flex-row">
      <ProjectList :projects="projects" />
    </div>

    <!-- Open the modal using ID.showModal() method -->
    <dialog class="modal" :open="showModal">
      <div class="modal-box">
        <ProjectForm
          :project-data="projectData"
          @show-modal="showModal = false"
          @submit="handleSubmit"
        />
      </div>
    </dialog>
  </div>
</template>
