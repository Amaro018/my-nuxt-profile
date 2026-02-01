<script setup lang="ts">
import { Motion } from 'motion-v';
import { computed, ref } from 'vue';

const { data: projects } = useFetch('/api/project');

// --- Pagination ---
const currentPage = ref(1);
const perPage = 8; // projects per page

// --- Filter ---
const selectedCategory = ref('All');

// unique categories from data
const categories = computed(() => {
  if (!projects.value)
    return [];
  const allCats = projects.value.map(p => p.category);
  return ['All', ...new Set(allCats)];
});

// filter by category
const filteredProjects = computed(() => {
  if (!projects.value)
    return [];
  if (selectedCategory.value === 'All')
    return projects.value;
  return projects.value.filter(p => p.category === selectedCategory.value);
});

// paginate filtered projects
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredProjects.value.slice(start, start + perPage);
});

// total pages
const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / perPage),
);

function nextPage() {
  if (currentPage.value < totalPages.value)
    currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1)
    currentPage.value--;
}
</script>

<template>
  <div class="bg-base-200 flex-row md:flex-col md:px-16">
    <Motion
      tag="div"
      class="md:px-16 mt-10"
      :initial="{ opacity: 0, x: -50 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :viewport="{ once: true, amount: 0.3 }"
      :transition="{ duration: 0.6 }"
    >
      <p class="text-center nintendo-text p-10">
        Projects
      </p>
    </Motion>

    <!-- Filters -->
    <div class="flex justify-center mb-6 gap-2 flex-wrap">
      <button
        v-for="cat in categories"
        :key="cat"
        class="btn"
        :class="{ 'btn-accent': selectedCategory === cat }"
        @click="selectedCategory = cat; currentPage = 1"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Project Cards -->
    <div class="flex flex-wrap gap-4 justify-center">
      <Motion
        v-for="(project, index) in paginatedProjects"
        :key="project.id"
        tag="div"
        class="card bg-base-100 w-full shadow-sm p-4 md:w-96"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true, amount: 0.3 }"
        :transition="{ duration: 0.6, delay: index * 0.15 }"
        :while-hover="{ scale: 1.05 }"
      >
        <figure class="relative">
          <div>
            <p class="badge badge-accent absolute top-3 right-0 font-bold">
              {{ project.category }}
            </p>
            <img
              :src="project.image"
              alt="Project"
              class="h-48 w-full object-cover"
            >
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ project.name }}
          </h2>
          <p>{{ project.description }}</p>

          <div class="card-actions justify-center mt-2">
            <div class="flex flex-col gap-2 w-full sm:flex-row sm:w-auto">
              <NuxtLink
                v-if="project.github_link"
                :to="project.github_link"
                class="flex-1"
                target="_blank"
              >
                <button class="btn btn-neutral w-full sm:w-auto">
                  Repository <Icon name="lucide:github" class="h-6 w-6" />
                </button>
              </NuxtLink>

              <NuxtLink
                v-if="project.live_demo"
                :to="project.live_demo"
                class="flex-1"
                target="_blank"
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

    <!-- Pagination -->
    <div class="flex justify-center mt-8 gap-4 py-10">
      <button
        class="btn"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Prev
      </button>
      <span class="self-center">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="btn"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>
