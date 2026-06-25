<template>
  <section class="question">
    <div class="question__wrapper">
      <UiMathjax class="question__name" :formula="question" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  question: String,
});
</script>

<style lang="scss" scoped>
.question {
  &__wrapper {
    color: var(--surface-600);
    font-weight: 500;
    font-size: 18px;
  }
  &__name {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    &:deep(p) {
      line-height: 140%;
    }
    &:deep(img) {
      max-width: 280px;
      width: 100%;
      border-radius: $border-r-sm;
      object-fit: cover;
    }
  }
}
</style>
