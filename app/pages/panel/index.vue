<template>
  <section class="index">
    <div class="index__wrapper">index.vue</div>
  </section>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
.index {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
}
</style>
