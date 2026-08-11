<template>
  <section class="card">
    <div @click="checkStatus(info.user_status)" class="card__wrapper">
      <img
        v-if="info.image"
        class="card__preview"
        :src="info.image"
        alt="Preview"
      />

      <UiNoImage v-else class="card__no-image" border-radius="none" />

      <div class="card__content">
        <div class="card__content-top">
          <h3 class="card__title title-sm">{{ info.name }}</h3>
          <UiIcon
            class="card__icon"
            icon="chevron"
            size="size-20"
            deg="right"
          />
        </div>
        <!-- <p class="card__description" v-if="info.description">
          {{ info.description }}
        </p> -->

        <div class="card__info">
          <div
            class="card__box"
            v-for="(item, index) in infos"
            :key="item.id"
            v-show="item.show"
          >
            <p class="card__point" v-if="index === 1">·</p>
            <UiIcon :icon="item.icon" size="size-16" />
            <p class="card__info-text">{{ item.text }}</p>
          </div>
        </div>

        <UiProgressBar :percent="info.user_progress?.progress || 0" />

        <div class="card__footer">
          <p class="card__price">{{ formatDigits(10000) }} ₸</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();
const props = defineProps({
  info: Object,
});

const infos = computed(() => [
  {
    id: 1,
    icon: "module-i",
    text: `${props.info.modules_count} ${
      props.info.modules_count === 1
        ? t("local.module").toLocaleLowerCase()
        : t("local.modules").toLocaleLowerCase()
    }`,
    show: props.info.modules_count > 0,
  },
  {
    id: 2,
    icon: "circle-i",
    text: `${props.info.lessons_count} ${
      props.info.lessons_count === 1
        ? t("local.lesson").toLocaleLowerCase()
        : t("local.lessons").toLocaleLowerCase()
    }`,
    show: props.info.lessons_count > 0,
  },
]);

const checkStatus = (status) => {
  if (status === "buy") {
  } else if (status === "start") {
    useApi()
      .client({
        url: `courses/${props.info.slug}/start`,
        method: "post",
      })
      .then(() => {
        router.push(`/panel/course/${props.info.slug}`);
      });
  } else if (status === "continue" || status === "completed") {
    router.push(`/panel/course/${props.info.slug}`);
  }
};
</script>

<style lang="scss" scoped>
.card {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    box-shadow: $box-shadow;
    border-radius: $border-r-xl;
    border: 1px solid var(--surface-200);
    background-color: var(--surface-100);
    cursor: pointer;
    transition: 0.25s linear;
    &:hover {
      box-shadow: $box-shadow-md;
      transform: scale(1.0099);
    }
    &:hover .card__icon {
      transform: translateX(7.5px) rotate(90deg);
    }
  }
  &__description {
    color: $surface-400;
    font-size: 14px;
    padding-bottom: $padding-md;
  }
  &__icon {
    transition: 0.2s linear;
  }
  &__content {
    padding: 0 $padding-md $padding-md;
    display: flex;
    flex-direction: column;
    gap: $gap-sm;
    &-top {
      display: flex;
      justify-content: space-between;
      gap: $gap-md;
    }
  }
  &__no-image,
  &__preview {
    border-top-left-radius: $border-r-lg;
    border-top-right-radius: $border-r-lg;
  }
  &__info {
    display: flex;
    align-items: center;
    gap: $gap-md;
    border-top: 1.5px solid var(--surface-200);
    padding-top: $padding-md;
    &-text {
      font-size: 14px;
      color: var(--surface-400);
    }
  }
  &__point {
    color: var(--surface-400);
  }
  &__box {
    display: flex;
    align-items: center;
    gap: $gap-xs;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-md;
    margin-top: 12px;
  }
  &__btn {
    &--start {
      margin-left: auto;
    }
  }
}
</style>
