<template>
  <div class="accordion">
    <div class="accordion__wrapper">
      <div class="accordion__header" @click="toggleOpen">
        <p class="accordion__name">{{ info.name }}</p>

        <div class="accordion__box">
          <p class="accordion__lessons">{{ info.lessons?.length }}</p>
          <UiIcon
            icon="chevron"
            size="size-20"
            color="surface-500"
            :deg="isOpen ? 'right' : 'down'"
          />
        </div>
      </div>

      <div class="accordion__content" v-if="isOpen">
        <nuxt-link
          class="accordion__content-link"
          v-for="lesson in info.lessons"
          :key="lesson.id"
          :to="`/lesson/${lesson.slug}`"
          :class="{ 'accordion__content-link--active': info.is_completed }"
        >
          <UiIcon
            icon="play-i"
            size="size-16"
            :color="info.is_completed ? 'white' : 'black'"
          />
          <p class="accordion__content-text">{{ lesson.name }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);

const props = defineProps({
  info: Object,
});

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.accordion {
  width: 100%;
  &__wrapper {
    padding: $padding-lg;
    border: 1.5px solid var(--surface-300);
    border-radius: $border-r-lg;
    display: flex;
    flex-direction: column;
    gap: $gap-lg;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-md;
  }
  &__box {
    display: flex;
    align-items: center;
    gap: $gap-xs;
  }
  &__lessons {
    color: var(--surface-500);
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: $gap-lg;
    &-link {
      display: flex;
      align-items: center;
      gap: $gap-xs;
      border-radius: $border-r-md;
      background-color: var(--surface-200);
      padding: $padding-md;
      color: var(--black);
      font-size: 14px;
      cursor: pointer;
      box-shadow: $box-shadow;
      &--active {
        background-color: $primary-color;
        color: $white;
      }
    }
  }
}
</style>
