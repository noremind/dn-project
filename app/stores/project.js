export const useProjectStore = defineStore("project", () => {
	const config = useRuntimeConfig();
	const domainURL = computed(() => config.public.domainURL)
	const projectName = computed(() => config.public.projectName)

	return {
		domainURL,
		projectName
	};
});
