<template>
  <div class="breadcrumb">
    <div class="breadcrumb__wrapper">
      <ul class="breadcrumb__ul">
        <li class="breadcrumb__li" v-for="(item, index) in info" :key="index">
          <nuxt-link
            :to="item?.route"
            class="breadcrumb__link"
            :class="{ 'breadcrumb__link--hover': item?.route }"
          >
            <p class="breadcrumb__text">{{ item.name }}</p>
            <UiIcon
              v-if="index + 1 !== info.length"
              class="breadcrumb__icon"
              icon="chevron"
              size="size-12"
              deg="right"
            />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: Array,
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
  }
  &__ul {
    display: flex;
    align-items: center;
  }
  &__link {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--surface-400);
    cursor: default;
    &--hover {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  &__icon {
    margin-top: 2px;
  }
}
</style>
