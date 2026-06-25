<template>
  <div class="alert">
    <div
      class="alert__wrapper"
      :class="{ 'alert__wrapper--warning': status === 'warning' }"
    >
      <UiIcon icon="i-circle" color="blue-500" size="size-24" />
      <p class="alert__text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  status: String,
});
</script>

<style lang="scss" scoped>
.alert {
  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: $gap-md;
    &--warning {
      border: 1px solid $blue-200;
      padding: $padding-xs;
      border-radius: $border-r-sm;
      color: $blue-500;
    }
  }
  &__text {
    // font-size: 16px;
    color: var(--surface-300);
  }
}
</style>
