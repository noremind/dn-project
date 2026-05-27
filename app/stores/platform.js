import { Capacitor } from "@capacitor/core";
import { defineStore } from "pinia"

export const usePlatformStore = defineStore("platform", () => {
	const platform = computed(() => Capacitor.getPlatform());

	const isIos = computed(() => platform.value === 'ios' || false)
	const isAndroid = computed(() => platform.value === 'android' || false)
	const current = computed(() => platform.value)

	return {
		isIos,
		isAndroid,
		current
	};
});
