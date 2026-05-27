<template>
  <div class="index">
    <div class="index__wrapper"></div>
  </div>
</template>

<script setup>
const router = useRouter();

router.push("/login");

definePageMeta({
  layout: "landing",
});
</script>

<style lang="scss" scoped>
.index {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    gap: $gap-xl;
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
    padding: $padding-sm;
  }
  &__present,
  &__map {
    padding: $padding-sm;
  }
}

@media (max-width: 1024px) {
  .index {
    &__content {
      flex-direction: column;
    }
    &__info {
      order: -1;
      background-color: var(--white);
      border-radius: $border-r-md;
      box-shadow: $box-shadow;
    }
  }
}
</style>
