<script setup lang="ts">
import { Motion } from 'motion-v';

const { data: projects } = useFetch('/api/project');
</script>

<template>
  <div class="my-10 bg-base-200 flex-row md:flex-col p-16">
    <Motion
      tag="div"
      class="my-10 md:px-16"
      :initial="{ opacity: 0, x: -50 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :viewport="{ once: true, amount: 0.3 }"
      :transition="{ duration: 0.6 }"
    >
      <p class="text-center nintendo-text">
        Projects
      </p>
    </Motion>

    <div class="my-10 flex flex-wrap gap-4">
      <Motion
        v-for="(project, index) in projects"
        :key="project.id"
        tag="div"
        class="card bg-base-100 w-full shadow-sm p-4 md:w-96 "
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.6, delay: index * 0.15 }"
        :while-hover="{ scale: 1.05 }"
      >
        <figure>
          <img
            :src="project.image"
            alt="Project"
            class="h-48 w-full object-cover"
          >
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ project.name }}
          </h2>
          <p>{{ project.description }}</p>
          <p>{{ project.category }}</p>

          <div class="card-actions justify-end">
            <div class="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
              <NuxtLink
                v-if="project.github_link"
                :to="project.github_link"
                class="flex-1"
              >
                <button class="btn btn-neutral w-full sm:w-auto">
                  Repository <Icon name="lucide:github" class="h-6 w-6" />
                </button>
              </NuxtLink>

              <NuxtLink
                v-if="project.live_demo"
                :to="project.live_demo"
                class="flex-1"
              >
                <button class="btn btn-accent w-full sm:w-auto">
                  Live Demo <Icon name="lucide:external-link" class="h-6 w-6" />
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </Motion>
    </div>
  </div>
</template>
