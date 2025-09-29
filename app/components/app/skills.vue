<template>
  <div>
    <div class="mx-auto my-10">
      <p class="text-center nintendo-text ">
        Skills
      </p>
    </div>
    <AppSkillMarquee />
    <div class="flex flex-col gap-4 justify-center my-10 nintendo-text md:flex-row md:p-16">
      <div class="card card-border bg-base-100 w-full md:w-96 shadow-2xl hover:transform hover:scale-105">
        <div class="card-body">
          <div class="flex flex-row justify-center gap-2 my-2">
            <h2 class="card-title text-sm">
              Frontend Mastery
            </h2>
            <Icon name="lucide:joystick" size="20" />
          </div>
          <ul class="list-disc list-inside">
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Tailwind CSS</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Vue.js</li>
            <li>React</li>
            <li>Figma</li>
            <li>Bootstrap</li>
            <li>Material UI</li>
          </ul>
        </div>
      </div>

      <div class="card card-border bg-base-100 w-full md:w-96  shadow-2xl hover:transform hover:scale-105">
        <div class="card-body">
          <div class="flex flex-row justify-center gap-2 my-2">
            <h2 class="card-title text-sm">
              Backend Powers
            </h2>
            <Icon name="lucide:swords" size="20" />
          </div>
          <ul class="list-disc list-inside">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>Next.js</li>
            <li>Nest.js</li>
            <li>Prisma</li>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
            <li>GraphQL</li>
            <li>RESTful API</li>
          </ul>
        </div>
      </div>

      <div class="card card-border bg-base-100 w-full md:w-96  shadow-2xl hover:transform hover:scale-105">
        <div class="card-body">
          <div class="flex flex-row justify-center gap-2 my-2">
            <h2 class="card-title text-sm">
              Tools and Weapons
            </h2>
            <Icon name="lucide:hammer" size="20" />
          </div>
          <ul class="list-disc list-inside">
            <li>Git</li>
            <li>VS Code</li>
            <li>NPM</li>
            <li>daisy ui</li>
            <li>Materia UI</li>
            <li>Webpack</li>
            <li>Vite</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
