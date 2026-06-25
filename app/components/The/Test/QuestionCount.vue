<template>
  <div class="count">
    <div class="count__wrapper">
      <p class="count__text">
        {{ t("local.question") }} {{ current }} / {{ total || 0 }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  current: Number,
  total: Number,
});
</script>

<style lang="scss" scoped>
.count {
  &__wrapper {
  }
  &__text {
    color: var(--surface-400);
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
