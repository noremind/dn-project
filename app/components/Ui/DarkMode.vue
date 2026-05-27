<template>
  <div class="mode" @click="toggleTheme">
    <div class="mode__wrapper" :class="{ 'mode__wrapper--dark': isDark }">
      <div class="mode__circle">
        <img class="mode__icon" :src="isDark ? dark : light" />
      </div>
    </div>
  </div>
</template>

<script setup>
import dark from "@/assets/icons/night-i.svg";
import light from "@/assets/icons/sun-i.svg";

const theme = ref("light");

const isDark = computed(() => theme.value === "dark");

const setTheme = (value) => {
  theme.value = value;

  document.documentElement.classList.toggle("dark", value === "dark");
  localStorage.setItem("theme", value);
};

const toggleTheme = () => {
  setTheme(isDark.value ? "light" : "dark");
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(systemDark ? "dark" : "light");
});
</script>

<style lang="scss" scoped>
.mode {
  cursor: pointer;
  width: fit-content;

  &__wrapper {
    width: 54px;
    height: 30px;
    padding: 3px;
    border-radius: 100px;
    background: var(--surface-100);
    border: 1px solid var(--app-border);
    display: flex;
    align-items: center;
    transition: 0.25s ease;
    border: 1px solid var(--surface-400);

    &--dark {
      .mode__circle {
        transform: translateX(24px);
      }
    }
  }

  &__circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--app-card);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.25s ease;
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>
