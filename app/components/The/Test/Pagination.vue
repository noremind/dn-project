<template>
  <div class="pagination">
    <div class="pagination__wrapper">
      <p class="pagination__text">{{ t("local.all_questions") }}</p>

      <div class="pagination__btns">
        <button
          v-for="(num, index) in total"
          :key="num"
          class="pagination__btn"
          @click="emit('update', num.id)"
          :class="{
            'pagination__btn--current': current === num.id,
            'pagination__btn--answered': num.answered,
            'pagination__btn--error': false,
            'pagination__btn--success': false,
          }"
          type="button"
        >
          {{ index + 1 }}
        </button>
      </div>
      <!-- 
      <UiButton
        v-if="current === lastNumber && !isLastSubject"
        before-icon="chevron"
        class="primary-btn"
        icon-deg="down"
        :label="t('Перейти к следующему предмету')"
        @action="emit('nextSubject')"
      /> -->

      <UiButton
        v-if="workOnMistakes"
        after-icon="chevron"
        class="tertiary-btn"
        icon-deg="down"
        :label="t('Перейти к результатам')"
        @action="emit('redirect')"
      />
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const emit = defineEmits(["update", "nextSubject"]);
const props = defineProps({
  total: {
    type: Array,
    default: [],
  },
  isLastSubject: Boolean,
  current: Number,
  workOnMistakes: Boolean,
});

const lastNumber = computed(() =>
  props.total?.length ? props.total[props.total?.length - 1]?.id : false,
);
</script>

<style lang="scss" scoped>
.pagination {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    border: 1px solid var(--surface-200);
    padding: $padding-md;
    border-radius: $border-r-md;
  }
  &__text {
    color: var(--surface-400);
    font-size: 16px;
  }
  &__btns {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: $gap-xxs;
  }
  &__btn {
    width: 50px;
    height: 50px;
    border-radius: $border-r-md;
    font-size: 16px;
    color: var(--surface-600);
    border: 1px solid var(--black);
    &--answered {
      border: 1px solid $primary-color;
      background-color: rbga($primary-color, 0.5);
      color: $white;
    }
    &--error {
      background-color: $red-300;
      color: $white;
    }
    &--success {
      background-color: $green-500;
      color: $white;
    }
    &--current {
      border: 2px solid $blue-500;
    }
  }
}

@media (max-width: 768px) {
  .pagination {
    &__btns {
      display: flex;
      overflow-x: scroll;
      width: 100%;
    }
    &__btn {
      max-width: 100%;
      padding: $padding-xs $padding-lg;
    }
  }
}
</style>
