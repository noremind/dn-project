<template>
  <section class="course">
    <div class="course__wrapper">
      <h2 class="course__title">{{ course.name }}</h2>

      <div class="course__box">
        <div class="course__content">
          <img
            v-if="course.image"
            class="course__preview"
            :src="course.image"
            alt="Preview"
          />
          <UiNoImage v-else class="course__no-image" />

          <TheCourseInfo
            class="course__info course__info--mobile"
            :info="course"
          />

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
        <TheCourseInfo class="course__info" :info="course" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
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
    text: `${course.value.modules_count} ${course.value.modules_count > 0 ? t("local.module").toLocaleLowerCase() : t("local.modules").toLocaleLowerCase()}`,
  },
  {
    id: 2,
    icon: "circle-i",
    text: `${course.value.modules_count} ${course.value.lessons_count > 0 ? t("local.lesson").toLocaleLowerCase() : t("local.lessons").toLocaleLowerCase()}`,
  },
]);
</script>

<style lang="scss" scoped>
.course {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
    position: relative;
  }
  &__info {
    max-width: 320px;
    width: 100%;
    &--mobile {
      display: none;
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
    position: relative;
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

@media (max-width: 1024px) {
  .course {
    &__info {
      width: 100%;
      max-width: 100%;
      display: none;
      &--mobile {
        display: flex;
      }
    }
  }
}
</style>
