import { c as useRuntimeConfig } from './server.mjs';
import { computed } from 'vue';
import { defineStore } from 'pinia';

const useProjectStore = defineStore("project", () => {
  const config = useRuntimeConfig();
  const domainURL = computed(() => config.public.domainURL);
  const projectName = computed(() => config.public.projectName);
  return {
    domainURL,
    projectName
  };
});

export { useProjectStore as u };
//# sourceMappingURL=project-GeJXWS_c.mjs.map
