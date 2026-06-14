// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/image', '@nuxtjs/i18n', '@pinia/nuxt'],
	plugins: ["~/plugins/maska.js", "~/plugins/plyr.client.js"],
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
      title: process.env.NUXT_PROJECT_NAME,
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
			baseURL: process.env.NUXT_BASE_URL,
			domainURL: process.env.NUXT_DOMAIN_URL,
			projectName: process.env.NUXT_PROJECT_NAME,
		}
	},
	i18n: {
		defaultLocale: 'ru',
		locales: [
      { code: 'ru', name: 'Ru', file: 'ru.json', flag: `${ process.env.NUXT_DOMAIN_URL}/assets/images/content/ru-flag.png` },
      { code: 'kz', name: 'Kz', file: 'kz.json', flag: `${ process.env.NUXT_DOMAIN_URL}/assets/images/content/kz-flag.png` },
			{ code: 'en', name: 'En', file: 'en.json', flag: `${ process.env.NUXT_DOMAIN_URL}/assets/images/content/en-flag.png` },
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
