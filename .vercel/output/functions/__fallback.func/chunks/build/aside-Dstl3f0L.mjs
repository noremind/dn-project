import { ref } from 'vue';
import { defineStore } from 'pinia';

const useAsideStore = defineStore("aside", () => {
  const isOpen = ref(true);
  const isMobileOpen = ref(false);
  const toggle = () => {
    isOpen.value = !isOpen.value;
    localStorage.setItem("isOpenAside", JSON.stringify(isOpen.value));
  };
  const mobileToggle = () => {
    isMobileOpen.value = !isMobileOpen.value;
  };
  const mobileClose = () => {
    isMobileOpen.value = false;
  };
  const setOpen = (value) => {
    isOpen.value = value;
    localStorage.setItem("isOpenAside", JSON.stringify(value));
  };
  return {
    isOpen,
    isMobileOpen,
    toggle,
    setOpen,
    mobileToggle,
    mobileClose
  };
});

export { useAsideStore as u };
//# sourceMappingURL=aside-Dstl3f0L.mjs.map
