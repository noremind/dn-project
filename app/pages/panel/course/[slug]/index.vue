<template>
  <section class="course">
    <div class="course__wrapper">
      {{ route.params.slug }}
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
</script>

<style lang="scss" scoped>
.course {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
}
</style>
