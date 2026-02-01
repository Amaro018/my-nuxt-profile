<script setup lang="ts">
import { Motion } from 'motion-v';
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
      <p class="text-center nintendo-text my-10 md:p-16">
        Skills
      </p>
    </Motion>

    <AppSkillMarquee />

    <div
      class="flex flex-col gap-4 justify-center my-10 nintendo-text md:flex-row md:p-16"
    >
      <!-- Frontend Mastery -->
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
        viewport="{ once: true }"
        class="card card-border bg-base-100 w-full md:w-96 shadow-2xl hover:transform hover:scale-105"
      >
        <div class="card-body">
          <div class="flex flex-row justify-center gap-2 my-2">
            <h2 class="card-title text-sm">
              Frontend Mastery
            </h2>
            <Icon name="lucide:joystick" size="20" />
          </div>
          <ul class="list-disc list-inside capitalize text-xs">
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Tailwind CSS</li>
            <li>Vue</li>
            <li>Blade</li>
            <li>React</li>
            <li>Figma</li>
            <li>Bootstrap</li>
            <li>Material UI</li>
            <li>Daisy UI</li>
          </ul>
        </div>
      </Motion>

      <!-- Backend Powers -->
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }"
        viewport="{ once: true }"
        class="card card-border bg-base-100 w-full md:w-96 shadow-2xl hover:transform hover:scale-105"
      >
        <div class="card-body">
          <div class="flex flex-row justify-center gap-2 my-2">
            <h2 class="card-title text-sm">
              Backend Powers
            </h2>
            <Icon name="lucide:swords" size="20" />
          </div>
          <ul class="list-disc list-inside capitalize text-xs">
            <li>Node.js</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Express.js</li>
            <li>Next.js</li>
            <li>Nuxt.js</li>
            <li>React.js</li>
            <li>Blitz.js</li>
            <li>Prisma</li>
            <li>MongoDB</li>
            <li>Drizzle</li>
            <li>MySQL</li>
          </ul>
        </div>
      </Motion>

      <!-- Tools and Weapons -->
      <Motion
        as="div"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
        viewport="{ once: true }"
        class="card card-border bg-base-100 w-full md:w-96 shadow-2xl hover:transform hover:scale-105"
      >
        <div class="card-body">
          <div class="flex flex-row justify-center gap-2 my-2">
            <h2 class="card-title text-sm">
              Tools and Weapons
            </h2>
            <Icon name="lucide:hammer" size="20" />
          </div>
          <ul class="list-disc list-inside capitalize text-xs">
            <li>Git</li>
            <li>GitHub</li>
            <li>VS Code</li>
            <li>NPM</li>
            <li>ESLint</li>
            <li>Postman</li>
            <li>Cloudinary</li>
            <li>Vite</li>
            <li>Docker</li>
            <li>Vercel</li>
          </ul>
        </div>
      </Motion>
    </div>
  </div>
</template>
