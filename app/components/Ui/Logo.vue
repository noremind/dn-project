<template>
  <div class="logo">
    <nuxt-link
      to="/"
      class="logo__wrapper"
      :class="{ 'logo__wrapper--horizontal': type === 'horizontal' }"
    >
      <NuxtImg
        src="/assets/images/logo/DN-Project.png"
        :alt="project.projectName"
        class="logo__preview"
        :style="{ width: width }"
        preload
        loading="lazy"
      />
      <div class="logo__box" v-if="!isTextHide">
        <p class="logo__text"><span class="logo__baige"></span> Project</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const project = useProjectStore();
const props = defineProps({
  width: String,
  type: {
    type: String,
    default: "vertical",
  },
  isTextHide: Boolean,
});
</script>

<style lang="scss" scoped>
.logo {
  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: $gap-md;
    &--horizontal {
      flex-direction: column;
    }
  }
  &__description {
    font-size: 14px;
    color: var(--surface-250);
  }
  &__preview {
    width: 60px;
    // height: 40px;
    // background-color: var(--surface-200);
    // border-radius: 50%;
  }
  &__text {
    font-size: 20px;
    font-weight: 700;
    // color: var(--white);
  }
  &__baige {
    color: $primary-color;
  }
}

@media (max-width: 768px) {
  .logo {
    &__text {
      font-size: 20px;
    }
  }
}
</style>
