<template>
  <div class="tag">
    <div
      class="tag__wrapper"
      :class="{
        'tag__wrapper--yellow': color === 'yellow',
        'tag__wrapper--white-transparency': color === 'white-transparency',
        'tag__wrapper--yellow-transparency': color === 'yellow-transparency',
      }"
    >
      <p
        class="tag__name"
        :class="{
          'tag__name--yellow': color === 'yellow',
          'tag__name--yellow-transparency': color === 'yellow-transparency',
          'tag__name--white-transparency': color === 'white-transparency',
        }"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  color: {
    type: String,
    default: "yellow",
  },
});
</script>

<style lang="scss" scoped>
.tag {
  &__wrapper {
    display: flex;
    align-items: center;
    padding: $padding-xs $padding-md;
    border-radius: $border-r-xxl;
    font-size: 14px;
    font-weight: 500;
    width: fit-content;
    &--yellow {
      background-color: $primary-color;
    }
    &--yellow-transparency {
      background-color: transparent;
      border: 1px solid $yellow-500;
    }
    &--white-transparency {
      background-color: rgba(var(--white), 0.1);
      border: 1px solid var(--white);
    }
  }
  &__name {
    &--yellow {
      color: var(--white);
    }
    &--yellow-transparency {
      color: $yellow-500;
    }
    &--white-transparency {
      color: var(--white);
    }
  }
}
</style>
