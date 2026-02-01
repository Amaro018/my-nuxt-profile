<script setup lang="ts">
const isVisible = ref(true);
</script>

<template>
  <main>
    <div class="hero min-h-screen bg-base-200 ">
      <div class="absolute inset-0 overflow-y-hidden mt-20">
        <div>
          <div
            class="absolute top-20 left-10 w-4 h-4 bg-accent rounded-full animate-bounce"
            :style="{ animationDelay: '0s' }"
          />
          <div
            class="absolute top-40 right-20 w-3 h-3 bg-primary rounded-full animate-bounce"
            :style="{ animationDelay: '0.5s' }"
          />
          <div
            class="absolute bottom-40 left-20 w-5 h-5 bg-secondary rounded-full animate-bounce"
            :style="{ animationDelay: '1s' }"
          />
          <div
            class="absolute bottom-20 right-10 w-4 h-4 bg-accent rounded-full animate-bounce"
            :style="{ animationDelay: '1.5s' }"
          />
        </div>
      </div>
      <!-- Content -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 nintendo-text">
        <div
          class="transition-all duration-1000"
          :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-10': !isVisible,
          }"
        >
          <!-- Avatar -->
          <div class="mb-8 flex justify-center">
            <div class="relative">
              <div class="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl bounce-in">
                <div class="w-28 h-28 rounded-full flex items-center justify-center border-1 border-primary">
                  <NuxtImg
                    src="/grad.jpg"
                    width="200"
                    height="200"
                    alt="Avatar"
                    class="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div class="absolute bottom-2 right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center pixel-glow">
                <span class="text-accent-foreground text-xs font-bold">⚡</span>
              </div>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-40xl sm:text-6xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            <span class="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Jhomari Amaro
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-muted-foreground mb-4 font-medium">
            Junior Full-Stack Developer
          </p>

          <p class="text-md text-muted-foreground mb-8 max-w-2xl mx-auto">
            I craft pixel-perfect digital experiences with the spirit of adventure.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#projects">

              <button
                class="btn btn-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View My Projects
              </button>
            </a>
            <a href="/files/resume.pdf" target="_blank">
              <button class="btn btn-outline btn-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Download Resume
              </button>
            </a>
          </div>

          <!-- Scroll Down Button -->
          <a href="#contact">
            <Icon name="lucide:arrow-down-to-line" class="h-6 w-6 animate-bounce" />
          </a>
          <!-- Social Buttons -->
          <div class="flex items-center justify-center space-x-6">
            <NuxtLink
              to="https://github.com/Amaro018"
              class="flex gap-4 items-center hover:transform hover:scale-105"
              target="_blank"
            >
              <button class="btn btn-ghost ">
                <Icon name="lucide:github" class="h-6 w-6" />
              </button>
            </NuxtLink>
            <NuxtLink
              to="https://www.facebook.com/amaro018/"
              class="flex gap-4 items-center hover:transform hover:scale-105"
              target="_blank"
            >
              <button class="btn btn-ghost">
                <Icon name="lucide:facebook" class="h-6 w-6" />
              </button>
            </NuxtLink>
            <NuxtLink
              to="https://www.linkedin.com/in/jhomari-amaro-945987242/"
              class="flex gap-4 items-center hover:transform hover:scale-105"
              target="_blank"
            >
              <button class="btn btn-ghost">
                <Icon name="lucide:linkedin" class="h-6 w-6" />
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
