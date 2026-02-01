<script setup lang="ts">
import { Motion, useScroll, useTransform } from 'motion-v';

const { scrollYProgress } = useScroll();

// Move Link horizontally as you scroll
const linkX = useTransform(scrollYProgress, [0, 1], ['0vw', '100vw']);
</script>

<template>
  <main>
    <Motion
      class="fixed bottom-4 left-0 w-12 h-12"
      :style="{ x: linkX, zIndex: 100 }"
    >
      <img
        src="/running-link.gif"
        alt="Running Link"
        class="w-full h-full"
      >
    </Motion>

    <AppHero />
    <section id="skills">
      <AppSkills />
    </section>
    <section id="projects">
      <AppProjects />
    </section>
    <section id="contact">
      <AppContact />
    </section>
  </main>
</template>
