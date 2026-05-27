export async function useFetchSsr(options = {}) {
	const authStore = useAuthStore()
	const loaderStore = useLoaderStore()
	const config = useRuntimeConfig();

	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${authStore.getToken || null}`,
		...options?.headers,
	};

	loaderStore.setLoader(true)

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
		console.log(error)
		if (
			error?.statusCode === 401 ||
			error?.data?.message === "Не авторизован"
		) {
			authStore.logout({ type: 'local' })
		}
		throw error;
	}
};
