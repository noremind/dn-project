export const useTitleStore = defineStore("title", () => {
	const { t } = useI18n()
	const route = useRoute()
	const title = ref("")
	const activeRoute = ref("")


	const currentTitle = computed(() => title.value)
	const currentActiveRoute = computed(() => activeRoute.value)

	const switchTitle = () => {
		const path = route.path.replace(/^\/[a-z]{2}(?=\/|$)/, '');

		if (path.startsWith('/panel/admin/staff/')) {
			title.value = "Сотрудник";
			activeRoute.value = '/panel/admin/staff';
			return;
		}

		switch (path) {
			case '/panel':
				title.value = ""
				activeRoute.value = '/panel'
				break;
			case '/panel/courses':
				title.value = t('local.courses')
				activeRoute.value = '/panel/courses'
				break;
			case '/panel/certificates':
				title.value = t('local.my_certificates')
				activeRoute.value = '/panel/certificates'
				break;
		}
	}

	switchTitle()

	const setTitle = (pageTitle, route) => {
		title.value = pageTitle;
		activeRoute.value = route
	};

	watch(() => route.fullPath, () => { switchTitle() }, { immediate: true })

	return {
		currentTitle,
		currentActiveRoute,
		setTitle
	};
});
