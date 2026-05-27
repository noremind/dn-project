<template>
  <section class="card">
    <div class="card__wrapper">
      <img
        v-if="info.image"
        class="card__preview"
        :src="info.image"
        alt="Preview"
      />
      <UiNoImage v-else class="card__no-image" />

      <div class="card__content">
        <h3 class="card__title title-sm">{{ info.name }}</h3>
        <p class="card__description">{{ info.description }}</p>

        <div class="card__btns">
          <UiButton
            tag="a"
            :href="`/panel/course/${info.slug}`"
            :label="t('local.start')"
            class="card__btn card__btn--start primary-btn"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const props = defineProps({
  info: Object,
});
</script>

<style lang="scss" scoped>
.card {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    box-shadow: $box-shadow;
    border-radius: $border-r-md;
    border: 1px solid var(--surface-200);
  }
  &__description {
    color: $surface-400;
  }
  &__content {
    padding: 0 $padding-md $padding-md;
    display: flex;
    flex-direction: column;
    gap: $gap-sm;
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-md;
  }
  &__btn {
    &--start {
      margin-left: auto;
    }
  }
}
</style>
