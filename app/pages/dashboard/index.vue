<script setup lang="ts">
import type { Project } from '~~/server/lib/zod-schema';

import { useToast } from '../../composables/use-toast';

useHead({
  title: 'Jun Dashboard',
});

const { toastMessage, toastType, showToast } = useToast();
type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const { data: projects, refresh } = useFetch('/api/project');

const { user } = useUserSession();

const currentUser = computed(() => user.value as SessionUser);
const editingProject = ref<Project | null>(null);
const showModal = ref(false);

function handleEdit(project: any) {
  editingProject.value = project;
  showModal.value = true;
}

const isSubmitting = ref(false);
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
  isSubmitting.value = true;
  const payload = new FormData();

  payload.append('name', data.name);
  payload.append('description', data.description);
  payload.append('category', data.category);
  payload.append('live_demo', data.live_demo);
  payload.append('github_link', data.github_link);

  if (data.imageFile) {
    payload.append('imageFile', data.imageFile);
  }

  try {
    // Check if we're editing an existing project
    if (editingProject.value && editingProject.value.id) {
      // Update existing project
      payload.append('id', editingProject.value.id.toString());
      const response = await $fetch('/api/project', {
        method: 'PUT', // or 'PUT' depending on your backend
        body: payload,
      });
      if (response && response.message) {
        showToast('Project updated successfully', 'success');
      }
    }
    else {
      // Create new project
      await $fetch('/api/project', {
        method: 'POST',
        body: payload,
      });
      showToast('Project created successfully', 'success');
    }
  }
  catch (e) {
    console.error(e);
    showToast('Failed to create project', 'error');
  }
  finally {
    isSubmitting.value = false;
    showModal.value = false;
    editingProject.value = null; // Reset after submit
    refresh();
  }
}

const showDeleteConfirm = ref(false);
const pendingDeleteId = ref<number | null>(null);

function handleDeleteRequest(projectId: number) {
  pendingDeleteId.value = projectId;
  showDeleteConfirm.value = true;
}

async function confirmDelete() {
  if (pendingDeleteId.value) {
    const response = await $fetch(`/api/project?id=${pendingDeleteId.value}`, { method: 'DELETE' });
    showToast(response.message, 'error');
    refresh();
    pendingDeleteId.value = null;
    showDeleteConfirm.value = false;
  }
}
function cancelDelete() {
  pendingDeleteId.value = null;
  showDeleteConfirm.value = false;
}
</script>

<template>
  <div>
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
      <div class="my-10 flex flex-wrap gap-4 md:flex-row">
        <ProjectList
          :projects="projects"
          @edit="handleEdit"
          @delete="handleDeleteRequest"
        />
      </div>

      <!-- Open the modal using ID.showModal() method -->
      <dialog class="modal" :open="showModal">
        <div class="modal-box">
          <ProjectForm
            :project-data="editingProject || projectData"
            :is-submitting="isSubmitting"
            @show-modal="showModal = false"
            @submit="handleSubmit"
          />
        </div>
      </dialog>

      <dialog class="modal" :open="showDeleteConfirm">
        <div class="modal-box flex flex-col gap-4">
          <p>Are you sure you want to delete this project?</p>
          <div class="flex justify-end gap-2 w-full">
            <button class="btn" @click="cancelDelete">
              Cancel
            </button>
            <button class="btn btn-error" @click="confirmDelete">
              Yes, Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
    <div v-if="toastMessage" class="toast toast-top toast-end z-50 fixed right-4 top-4 nintendo-text">
      <div role="alert" :class="`alert alert-${toastType}`">
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>
