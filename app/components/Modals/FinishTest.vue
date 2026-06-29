<template>
  <section class="finish">
    <div class="finish__wrapper">
      <h4 class="finish__title">
        {{ t("local.will_you_complete_the_testing") }}
      </h4>

      <UiAlertText
        :text="t('local.finish_the_test_alert_information')"
        status="info"
      />

      <div class="finish__btns">
        <UiButton
          @action="emit('close')"
          :label="t('local.cancel')"
          class="finish__btn finish__btn--cancel secondary-btn"
        />
        <UiButton
          @action="emit('finish')"
          :label="t('local.finish')"
          class="finish__btn finish__btn--finish secondary-btn"
          :is-loading="isLoading"
          after-icon="checkmark-i"
          icon-size="size-20"
          icon-color="green-500"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const emit = defineEmits(["close", "finish"]);

const props = defineProps({
  isLoading: Boolean,
});
</script>

<style lang="scss" scoped>
.finish {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: var(--black-fixed);
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-md;
  }
  &__btn {
    &--cancel {
      border: 1px solid transparent;
      color: var(--surface-300);
    }
    &--finish {
      border: 1px solid $green-500;
      color: $green-500;
    }
  }
}
</style>
