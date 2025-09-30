import tailwindcss from '@tailwindcss/vite';
import MotionResolver from 'motion-v/resolver';
import Components from 'unplugin-vue-components/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', 'nuxt-auth-utils', 'motion-v/nuxt'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
      Components({
        dts: true,
        resolvers: [
          MotionResolver(),
        ],
      }),
    ],
  },
  googleFonts: {
    families: {
      'Press+Start+2P': true,
    },
  },
  colorMode: {
    dataValue: 'theme',
  },
});
