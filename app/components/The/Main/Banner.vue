<template>
  <section class="banner">
    <div class="banner__wrapper">
      <h2 class="banner__title">
        Онлайн курсы для <br />
        сотрудников
      </h2>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.banner {
  &__wrapper {
    padding: 180px $padding-xxl 40px;
    background-color: $primary-color;
    border-radius: $border-r-lg;
    box-shadow: $box-shadow-md;
  }
  &__title {
    color: var(--white);
    font-weight: 600;
    font-size: 42px;
  }
}
</style>
