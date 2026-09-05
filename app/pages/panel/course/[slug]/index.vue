<template>
  <section v-if="course" class="course-page">
    <article class="course-page__hero">
      <img
        v-if="course.image"
        :src="course.image"
        :alt="course.name"
        class="course-page__image"
      />
      <UiNoImage v-else class="course-page__image course-page__image--empty" />

      <div class="course-page__body">
        <span class="course-page__status">• {{ courseStatus }}</span>
        <h1>{{ course.name }}</h1>
        <div
          v-if="course.description"
          class="course-page__description"
          v-html="course.description"
        />

        <div class="course-page__progress">
          <div class="course-page__progress-head">
            <b>{{ t("local.progress") }}</b
            ><strong>{{ progress }}%</strong>
          </div>
          <div class="course-page__progress-track">
            <i :style="{ width: `${progress}%` }" />
          </div>
          <div class="course-page__progress-footer">
            <div class="course-page__facts">
              <span
                >▣ {{ course.modules_count || 0 }}
                {{ t("local.modules").toLocaleLowerCase() }}</span
              ><span
                >▶ {{ course.lessons_count || 0 }}
                {{ t("local.lessons").toLocaleLowerCase() }}</span
              >
            </div>
            <UiButton
              class="course-page__continue primary-btn"
              :label="actionLabel"
              after-icon="chevron"
              icon-size="size-20"
              icon-deg="right"
              @action="handleCourseAction"
            />
          </div>
        </div>
      </div>
    </article>

    <section class="course-page__program">
      <div class="course-page__program-title">
        <h2>{{ t("local.course_program") }}</h2>
        <div>
          <span
            >▣ {{ course.modules_count || 0 }}
            {{ t("local.modules").toLocaleLowerCase() }}</span
          ><span
            >◯ {{ course.lessons_count || 0 }}
            {{ t("local.lessons").toLocaleLowerCase() }}</span
          >
        </div>
      </div>
      <div class="course-page__accordions">
        <TheCourseAccordion
          v-for="module in course.modules"
          :key="module.id"
          :info="module"
        />
      </div>
    </section>
  </section>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const titleStore = useTitleStore();
const course = ref(null);

titleStore.setTitle(t("local.courses"), "/panel/courses");
const response = await useFetchSsr({
  url: `/courses/${route.params.slug}`,
  method: "get",
});
course.value = response.data;
useSeo({ title: course.value.name, description: course.value.description });

const progress = computed(() =>
  Math.max(
    0,
    Math.min(100, Math.round(course.value?.user_progress?.progress || 0)),
  ),
);
const courseStatus = computed(() => {
  if (course.value?.user_status === "completed") return t("local.completed");
  if (
    course.value?.user_status === "continue" ||
    course.value?.user_status === "in_progress"
  )
    return t("local.in_progress");
  return t("local.not_started");
});
const actionLabel = computed(() =>
  course.value?.user_status === "completed"
    ? t("local.certificate")
    : course.value?.user_status === "continue" ||
        course.value?.user_status === "in_progress"
      ? t("local.continue")
      : t("local.start"),
);
const handleCourseAction = async () => {
  if (course.value.user_status === "completed") {
    router.push("/panel/certificates");
    return;
  }
  if (
    course.value.user_status === "start" ||
    course.value.user_status === "not_started"
  )
    await useApi().client({
      url: `courses/${course.value.slug}/start`,
      method: "post",
    });
  if (course.value.current_lesson_slug)
    router.push(`/panel/lesson/${course.value.current_lesson_slug}`);
};
</script>

<style lang="scss" scoped>
.course-page {
  --course-card: var(--white);
  --course-text: var(--surface-600);
  --course-muted: var(--surface-400);
  --course-panel: var(--surface-100);
  --course-border: var(--surface-200);
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1140px;
  margin: 0 auto;
  &__hero,
  &__program {
    overflow: hidden;
    // border: 1px solid var(--course-border);
    // border-radius: 22px;
    background: var(--course-card);
    // box-shadow: 0 10px 30px rgba(23, 32, 51, 0.07);
  }
  &__image {
    display: block;
    width: 100%;
    height: 330px;
    object-fit: cover;
    object-position: center;
  }
  &__image--empty {
    height: 330px;
    border-radius: 0;
    background: linear-gradient(
      135deg,
      rgba($primary-color, 0.22),
      rgba($primary-color, 0.06)
    );
  }
  &__body {
    padding: 37px 48px 38px;
  }
  &__status {
    display: inline-block;
    padding: 7px 13px;
    border-radius: 99px;
    background: rgba($primary-color, 0.11);
    color: $primary-color;
    font-size: 14px;
    font-weight: 700;
  }
  & h1 {
    margin: 20px 0 16px;
    color: var(--course-text);
    font-size: 36px;
    line-height: 1.15;
  }
  &__description {
    max-width: 1000px;
    color: var(--course-muted);
    font-size: 17px;
    line-height: 1.58;
  }
  &__description :deep(p) {
    margin: 0 0 18px;
  }
  &__progress {
    margin-top: 36px;
    padding: 25px 27px;
    border: 1px solid var(--course-border);
    border-radius: 16px;
    background: var(--course-panel);
  }
  &__progress-head {
    display: flex;
    justify-content: space-between;
    color: var(--course-text);
    font-size: 17px;
  }
  &__progress-head strong {
    color: $primary-color;
  }
  &__progress-track {
    height: 12px;
    overflow: hidden;
    margin: 18px 0 20px;
    border-radius: 99px;
    background: var(--surface-250);
  }
  &__progress-track i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: $primary-color;
    transition: width 0.25s ease;
  }
  &__progress-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  &__facts {
    display: flex;
    gap: 25px;
    color: var(--course-muted);
    font-size: 16px;
  }
  &__continue {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 20px;
    border: 0;
    border-radius: 11px;
    background: $primary-color;
    color: var(--white-fixed);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  &__continue span {
    font-size: 24px;
    line-height: 0.5;
  }
  &__program-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 25px 28px;
    border-bottom: 1px solid var(--course-border);
  }
  &__program-title h2 {
    color: var(--course-text);
    font-size: 21px;
  }
  &__program-title div {
    display: flex;
    gap: 18px;
    color: var(--course-muted);
    font-size: 15px;
  }
  &__accordions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 18px;
  }
}
.course-page :deep(.accordion__wrapper) {
  border-color: var(--course-border);
}
.course-page :deep(.accordion__content-link) {
  background: var(--course-panel);
  color: var(--course-text);
}
@media (max-width: 720px) {
  .course-page__image {
    height: 210px;
  }
  .course-page__body {
    padding: 25px 20px;
  }
  .course-page h1 {
    font-size: 28px;
  }
  .course-page__description {
    font-size: 16px;
  }
  .course-page__progress {
    padding: 20px 17px;
  }
  .course-page__progress-footer,
  .course-page__program-title {
    align-items: flex-start;
    flex-direction: column;
  }
  .course-page__facts {
    flex-wrap: wrap;
    gap: 9px 18px;
  }
  .course-page__continue {
    width: 100%;
    justify-content: center;
  }
  .course-page__program-title div {
    flex-wrap: wrap;
  }
}
</style>
