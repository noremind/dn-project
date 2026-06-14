<template>
  <section class="card">
    <div class="card__wrapper">
      <img
        v-if="info.image"
        class="card__preview"
        :src="info.image"
        alt="Preview"
      />
      <UiNoImage v-else class="card__no-image" border-radius="none" />

      <div class="card__content">
        <h3 class="card__title title-sm">{{ info.name }}</h3>
        <p class="card__description" v-if="info.description">
          {{ info.description }}
        </p>

        <div class="card__info">
          <div
            class="card__box"
            v-for="item in infos"
            :key="item.id"
            v-show="item.show"
          >
            <UiIcon :icon="item.icon" size="size-16" />
            <p class="card__info-text">{{ item.text }}</p>
          </div>
        </div>

        <div class="card__footer">
          <p class="card__price">{{ formatDigits(10000) }} ₸</p>
          <UiButton
            v-if="info.user_status === 'start'"
            tag="a"
            :href="`/panel/course/${info.slug}`"
            :label="t('local.start')"
            class="card__btn card__btn--start primary-btn"
          />
          <UiButton
            v-else-if="info.user_status === 'continue'"
            tag="a"
            :href="`/panel/course/${info.slug}`"
            :label="t('local.continue')"
            class="card__btn card__btn--start primary-btn"
          />
          <UiButton
            v-else-if="info.user_status === 'buy'"
            tag="a"
            :href="`/panel/course/${info.slug}`"
            :label="t('local.buy')"
            class="card__btn card__btn--start primary-btn primary-btn--green"
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

const infos = computed(() => [
  {
    id: 1,
    icon: "module-i",
    text: `${props.info.modules_count} ${
      props.info.modules_count === 1
        ? t("local.module").toLocaleLowerCase()
        : t("local.modules").toLocaleLowerCase()
    }`,
    show: props.info.modules_count > 0,
  },
  {
    id: 2,
    icon: "circle-i",
    text: `${props.info.lessons_count} ${
      props.info.lessons_count === 1
        ? t("local.lesson").toLocaleLowerCase()
        : t("local.lessons").toLocaleLowerCase()
    }`,
    show: props.info.lessons_count > 0,
  },
]);
</script>

<style lang="scss" scoped>
.card {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    box-shadow: $box-shadow;
    border-radius: $border-r-xl;
    border: 1px solid var(--surface-200);
    background-color: var(--surface-100);
  }
  &__description {
    color: $surface-400;
    font-size: 14px;
    padding-bottom: $padding-md;
  }
  &__content {
    padding: 0 $padding-md $padding-md;
    display: flex;
    flex-direction: column;
    gap: $gap-sm;
  }
  &__no-image,
  &__preview {
    border-top-left-radius: $border-r-lg;
    border-top-right-radius: $border-r-lg;
  }
  &__info {
    display: flex;
    align-items: center;
    gap: $gap-md;
    border-top: 1.5px solid var(--surface-200);
    padding-top: $padding-md;
    &-text {
      font-size: 14px;
      color: var(--surface-400);
    }
  }
  &__box {
    display: flex;
    align-items: center;
    gap: $gap-xs;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-md;
    margin-top: 12px;
  }
  &__btn {
    &--start {
      margin-left: auto;
    }
  }
}
</style>
