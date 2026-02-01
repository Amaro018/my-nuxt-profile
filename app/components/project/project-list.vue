<script setup lang="ts">
defineProps<{ projects: any }>();

defineEmits(['edit', 'delete']);
</script>

<template>
  <div
    v-for="project in projects"
    :key="project.id"
    class="card bg-base-100 w-full shadow-sm p-4 md:w-96 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg "
  >
    <figure>
      <img
        :src="project.image"
        alt="Shoes"
        class="h-48 w-full object-cover"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ project.name }}
      </h2>
      <p>{{ project.description }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="$emit('edit', project)">
          edit
        </button>
        <button class="btn btn-error" @click="$emit('delete', project.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
