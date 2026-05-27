<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__box">
        <UiLogo class="header__logo" />

        <h1
          class="header__title"
          :class="{ 'header__title--open': !asideStore?.isOpen }"
        >
          {{ titleStore.currentTitle }}
        </h1>
      </div>

      <div class="header__info">
        <UiLocale class="header__locale" />

        <UiDarkMode />

        <TheHeaderProfile />

        <UiIcon
          class="header__hamburger"
          icon="hamburger-i"
          color="black"
          size="size-24"
          @click="asideStore.mobileToggle()"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
const titleStore = useTitleStore();
const asideStore = useAsideStore();
const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.header {
  &__wrapper {
    background-color: var(--white);
    padding: $padding-header;
    border-radius: $border-r-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: $box-shadow;
  }
  &__info {
    display: flex;
    gap: $gap-xxl;
    align-items: center;
  }
  &__hamburger {
    display: none;
  }
  &__title {
    transition: 0.225s margin;
    &--open {
      margin-left: 70px;
    }
  }
  &__link {
    flex-grow: 1;
    &--link {
      max-width: 330px;
      width: 100%;
    }
  }
  &__box {
    display: flex;
    gap: $gap-xxl;
    align-items: center;
    transition: 0.9s max-width;
  }
}

@media (max-width: 768px) {
  .header {
    &__wrapper {
      padding: $padding-md;
    }
    &__hamburger {
      display: block;
    }
    &__title {
      display: none;
    }
    &__locale {
      display: none;
    }
  }
}
</style>
