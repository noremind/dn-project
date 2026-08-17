export async function useFetchClient(options = {}) {
	const authStore = useAuthStore()
	const loaderStore = useLoaderStore()
	const router = useRouter()


	const headers = {
		Accept: "application/json",
		// "Content-Type": options?.content_type || "application/json",
		"Accept-Language": options.locale,
		"Authorization": `Bearer ${authStore.getToken || ""}`,
		...options?.headers,
	};

	options?.isLoading === false ? null : loaderStore.setLoader(true)

	try {
		const response = await $fetch(options.url, {
			body: options?.data || options?.body,
			method: options?.method || "get",
			baseURL: options.baseURL,
			params: options?.params || options?.query,
			headers,
		});

		loaderStore.setLoader(false)

		return response;

	} catch (error) {
		loaderStore.setLoader(false)
		if (error?.response?.status === 401) {
			router.push('/login')
			// authStore.logout()
		}
		const normalizedError = error?.response || {
			statusCode: error?.status || 500,
			statusMessage: error?.statusMessage || error?.message || "Ошибка запроса",
			data: error?.data || {},
		}
		normalizedError.message =
			normalizedError?.data?.message ||
			normalizedError?._data?.message ||
			normalizedError?.message ||
			normalizedError?.statusMessage ||
			"Ошибка запроса"

		if (options?.notify !== false) {
			useNotify({ title: "Ошибка", text: normalizedError.message, status: "error" })
		}

		throw normalizedError;
	}
};
