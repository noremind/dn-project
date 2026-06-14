<template>
  <section class="lesson">
    <div class="lesson__wrapper">
      {{ route.params.slug }}
    </div>
  </section>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.lesson {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
}
</style>
