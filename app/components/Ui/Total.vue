<template>
  <div class="total">
    <div class="total__wrapper">
      <p class="total__text">{{ t("local.total") }}: {{ total }}</p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  total: Number,
});
</script>

<style lang="scss" scoped>
.total {
  &__wrapper {
  }
  &__text {
    font-weight: 500;
    font-size: 18px;
  }
}
</style>
