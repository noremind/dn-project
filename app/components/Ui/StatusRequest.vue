<template>
  <div class="status">
    <div class="status__wrapper">
      <p
        v-if="status === 'pending'"
        class="status__info loading-dots"
        :class="{ 'status__info--pending': status === 'pending' }"
      >
        {{ t("local.loading") }}
      </p>

      <p
        v-if="status === 'empty'"
        class="status__info"
        :class="{ 'status__info--pending': status === 'empty' }"
      >
        {{ t("local.still_empty") }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  status: {
    type: [String, null],
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.status {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
  }
  &__info {
    padding: $padding-md;
    border-radius: $border-r-md;
    text-align: center;
    color: $surface-400;
    &--pending {
    }
    &--empty {
    }
  }
}
</style>
