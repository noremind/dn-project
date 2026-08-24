export async function useFetchSsr(options = {}) {
	const authStore = useAuthStore()
	const loaderStore = useLoaderStore()
	const config = useRuntimeConfig();
	const router = useRouter()

	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${authStore.getToken || null}`,
		...options?.headers,
	};

	options.isLoading ? loaderStore.setLoader(true) : null

	try {
		const response = await $fetch(options.url, {
			body: options?.data || options?.body,
			method: options?.method || "get",
			baseURL: options.baseURL || config.public.baseURL || "/api",
			params: options?.params || options?.query,
			headers,
		});

		loaderStore.setLoader(false)

		return response;

	} catch (error) {
		loaderStore.setLoader(false)
		if (
			error?.statusCode === 401
		) {
			// authStore.logout()
			router.push('/login')
		}
		throw error;
	}
};
