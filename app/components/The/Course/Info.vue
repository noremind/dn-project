<template>
  <div class="info">
    <div class="info__wrapper">
      <UiProgressBar :percent="info.user_progress?.progress" />

      <hr
        class="info__hr"
        v-if="info.user_progress"
        :percent="info.user_progress?.progress"
      />

      <p class="info__description" v-if="info.description">
        {{ t("local.description") }} <br />
        <span class="info__description-info" v-html="info.description"></span>
      </p>

      <UiButton
        v-if="info.user_status === 'buy'"
        class="info__btn primary-btn primary-btn--green"
        :label="t('local.buy')"
      />
      <UiButton
        v-else-if="info.user_status === 'start'"
        class="info__btn primary-btn"
        @action="redirectToLesson(info.current_lesson_slug)"
        :label="t('local.start')"
      />
      <UiButton
        v-else-if="info.user_status === 'continue'"
        class="info__btn primary-btn"
        :label="t('local.continue')"
        after-icon="chevron"
        icon-size="size-20"
        icon-deg="right"
        @action="redirectToLesson(info.current_lesson_slug)"
      />
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();

const props = defineProps({
  info: Object,
});

const redirectToLesson = (slug) => {
  router.push(`/panel/lesson/${slug}`);
};
</script>

<style lang="scss" scoped>
.info {
  width: 100%;
  &__wrapper {
    display: flex;
    flex-direction: column;
    background-color: var(--surface-200);
    padding: $padding-md;
    border-radius: $border-r-md;
    box-shadow: $box-shadow-md;
    gap: $gap-xl;
    height: fit-content;
    width: 100%;
  }
  &__btn {
    height: fit-content;
    width: 100%;
    max-width: 100%;
  }
  &__description {
    font-weight: 500;
    &-info {
      color: $surface-400;
      font-size: 14px;
    }
  }
}
</style>
