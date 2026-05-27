// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/image', '@nuxtjs/i18n', '@pinia/nuxt'],
	plugins: ["~/plugins/maska.js"],
	css: ['@/assets/scss/index.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "@/assets/scss/abstracts/variables" as *;
						@use "@/assets/scss/abstracts/colors" as *;
						@use "@/assets/scss/base/colors" as *;
					`
				}
			}
		}
  },
	app: {
    head: {
      title: 'DN Project',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },
	runtimeConfig: {
		public: {
			baseURL: process.env.NUXT_BASE_URL
		}
	},
	i18n: {
		defaultLocale: 'kz',
		locales: [
      { code: 'ru', name: 'Ru', file: 'ru.json', flag: "https://cityhelp-diploma-yij7.vercel.app/assets/images/content/ru-flag.png" },
      { code: 'kz', name: 'Kz', file: 'kz.json', flag: "https://cityhelp-diploma-yij7.vercel.app/assets/images/content/kz-flag.png" },
    ],
		vueI18n: "./i18n.config.ts",
  },
	nitro: {
    preset: 'vercel',
    prerender: {
      failOnError: false,
      crawlLinks: false,
      routes: [],
    },
  },
	experimental: {
    payloadExtraction: false
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
	ssr: true,
})
