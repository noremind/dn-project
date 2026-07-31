import { ref, computed, watch } from 'vue';
import { f as useI18n, i as useRoute } from './server.mjs';
import { defineStore } from 'pinia';

const useTitleStore = defineStore("title", () => {
  const { t } = useI18n();
  const route = useRoute();
  const title = ref("");
  const activeRoute = ref("");
  const currentTitle = computed(() => title.value);
  const currentActiveRoute = computed(() => activeRoute.value);
  const switchTitle = () => {
    const path = route.path.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    if (path.startsWith("/panel/admin/staff/")) {
      title.value = "Сотрудник";
      activeRoute.value = "/panel/admin/staff";
      return;
    }
    switch (path) {
      case "/panel":
        title.value = t("local.main");
        activeRoute.value = "/panel";
        break;
      case "/panel/courses":
        title.value = t("local.courses");
        activeRoute.value = "/panel/courses";
        break;
    }
  };
  switchTitle();
  const setTitle = (pageTitle, route2) => {
    title.value = pageTitle;
    activeRoute.value = route2;
  };
  watch(() => route.fullPath, () => {
    switchTitle();
  }, { immediate: true });
  return {
    currentTitle,
    currentActiveRoute,
    setTitle
  };
});

export { useTitleStore as u };
//# sourceMappingURL=title-BndfFPR5.mjs.map
