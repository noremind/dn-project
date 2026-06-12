export default defineNuxtRouteMiddleware(async () => {
	const authStore = useAuthStore()

	if (!authStore.initialized) {
		await authStore.init()
	}

	if (!authStore.isToken) {
		// return navigateTo('/login')
	}
})
