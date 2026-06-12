<template>
  <section class="course">
    <div class="course__wrapper">
      <h2 class="course__title">{{ course.name }}</h2>

      <div class="course__box">
        <div class="course__content">
          <img
            v-if="course.image"
            class="course__preview"
            src=""
            alt="Preview"
          />
          <UiNoImage v-else class="course__no-image" />

          <section class="course__program">
            <div class="course__program-header">
              <h3 class="course__program-title">
                {{ t("local.course_program") }}
              </h3>
              <div class="course__program-box">
                <div
                  class="course__program-inner"
                  v-for="item in infos"
                  :key="item.id"
                >
                  <UiIcon :icon="item.icon" size="size-16" />
                  <p class="course__program-text">{{ item.text }}</p>
                </div>
              </div>
            </div>

            <hr class="course__hr" />

            <div class="course__accordions">
              <TheCourseAccordion
                v-for="accordion in course.modules"
                :key="accordion.id"
                :info="accordion"
              />
            </div>
          </section>
        </div>
        <div class="course__info">
          <UiButton
            v-if="course.user_status === 'buy'"
            class="course__info-btn primary-btn primary-btn--buy"
            :label="t('local.buy')"
          />
          <UiButton
            v-else
            class="course__info-btn primary-btn"
            :label="t('local.continue')"
          />
          <hr class="course__hr" />
        </div>
      </div>

      <pre>{{ course }}</pre>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const titleStore = useTitleStore();
const course = ref(null);

titleStore.setTitle(t("local.courses"), "/panel/courses");

await useFetchSsr({
  url: `/courses/${route.params.slug}`,
  method: "get",
}).then((res) => {
  course.value = res.data;
});

useSeo({
  title: course.value.name,
  description: course.value.description,
});

const infos = computed(() => [
  {
    id: 1,
    icon: "module-i",
    text: `${1} ${course.value.modules_count > 0 ? t("local.module").toLocaleLowerCase() : t("local.modules").toLocaleLowerCase()}`,
  },
  {
    id: 2,
    icon: "circle-i",
    text: `${1} ${course.value.lessons_count > 0 ? t("local.lesson").toLocaleLowerCase() : t("local.lessons").toLocaleLowerCase()}`,
  },
]);
</script>

<style lang="scss" scoped>
.course {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__info {
    display: flex;
    flex-direction: column;
    background-color: var(--surface-200);
    padding: $padding-md;
    border-radius: $border-r-md;
    box-shadow: $box-shadow-md;
    gap: $gap-xl;
    max-width: 320px;
    height: fit-content;
    width: 100%;
    &-btn {
      height: fit-content;
      width: 100%;
    }
  }
  &__box {
    display: flex;
    gap: $gap-md;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: $gap-xl;
    flex-grow: 1;
  }
  &__hr {
    height: 2px;
    border-radius: $border-r-md;
    background-color: var(--surface-400);
    border: none;
  }
  &__program {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    background-color: var(--surface-100);
    border-radius: $border-r-lg;
    &-header {
      padding: $padding-lg $padding-lg $padding-md $padding-lg;
      display: flex;
      flex-direction: column;
      gap: $gap-md;
    }
    &-box {
      display: flex;
      align-items: center;
      gap: $gap-md;
    }
    &-inner {
      display: flex;
      align-items: center;
      gap: $gap-sm;
    }
  }
  &__accordions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $gap-md;
    padding: $padding-md;
  }
  &__preview {
    border-radius: $border-r-lg;
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  &__no-image {
    height: 350px;
  }
}
</style>
