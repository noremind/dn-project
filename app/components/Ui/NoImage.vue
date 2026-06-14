<template>
  <div class="load" :class="{ 'load--borderless': borderRadius === 'none' }">
    <div class="load__wrapper">
      <img
        class="load__image"
        src="/assets/images/content/no-image.png"
        alt="No Image"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  borderRadius: String,
});
</script>

<style lang="scss" scoped>
.load {
  width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: $border-r-md;
  background-color: var(--surface-200);
  &--borderless {
    border-radius: 0px;
  }
  &__wrapper {
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }
  &__image {
    // width: 100%;
    margin: auto;
    height: 100px;
    overflow: hidden;
  }
}
</style>
