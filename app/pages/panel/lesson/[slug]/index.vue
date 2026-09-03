<template>
  <section class="lesson">
    <div class="lesson__wrapper" v-if="lesson">
      <UiBreadcrumb v-if="lesson" :info="breadcrumb" />

      <h2 class="lesson__title">{{ lesson.name }}</h2>

      <UiTabs
        v-if="tabsVideo?.length > 1"
        :tabs="tabsVideo"
        v-model="oneTabVideo"
        type="line"
      />

      <UiPlayer class="lesson__player" :video-id="oneTabVideo?.url" />

      <div class="lesson__materials">
        <p class="lesson__text">{{ t("local.materials") }}:</p>
        <UiLogo v-if="isConverting" />

        <div
          id="conspectus"
          class="lesson__conspectus"
          v-html="lesson?.content"
        ></div>
        <UiButton
          class="secondary-btn"
          :label="t('local.download_conspectus')"
          before-icon="download-i"
          icon-size="size-20"
          icon-color="primary-color"
          @action="downloadContectus"
        />
      </div>

      <section v-if="lesson?.lesson_tests?.length" class="lesson__tests">
        <article
          v-for="test in lesson.lesson_tests"
          :key="test.id"
          class="lesson__test-card"
          :class="{ 'lesson__test-card--passed': test.passed }"
        >
          <span class="lesson__test-icon">{{ test.passed ? "✓" : "▶" }}</span>
          <div class="lesson__test-content">
            <h3>{{ test.title || t("local.lesson_testing") }}</h3>
            <p>{{ t("local.test_duration") }}: {{ test.duration || test.duration_minutes || 60 }} {{ t("local.minutes") }} · {{ t("local.passing_score") }}: {{ test.passing_score || test.pass_score || 80 }}%</p>
          </div>
          <span v-if="test.passed" class="lesson__test-status">{{ t("local.test_passed") }}</span>
          <UiButton v-else class="lesson__test-action primary-btn" :label="t('local.take_test')" @action="redirectToTest(test)" />
        </article>
      </section>

      <div class="lesson__btns">
        <div class="lesson__btns-box">
          <UiButton
            v-if="lesson.previous"
            class="lesson__btn lesson__btn--previous primary-btn"
            :label="t('local.previous_lesson')"
            before-icon="chevron"
            icon-size="size-20"
            icon-deg="left"
            @action="redirectToPreviousLesson"
          />
          <UiButton
            class="lesson__btn lesson__btn--next primary-btn"
            :label="
              !lesson.next ? t('local.finish_course') : t('local.next_lesson')
            "
            after-icon="chevron"
            icon-size="size-20"
            icon-deg="right"
            @action="redirectToNextLesson"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const titleStore = useTitleStore();

const isConverting = ref(false);
const isLoading = ref(null);

const lesson = ref(null);

const breadcrumb = computed(() => [
  {
    name: t("local.courses"),
    route: "/panel/courses",
  },
  {
    name: lesson.value?.course.name,
    route: `/panel/course/${lesson.value?.course.slug}`,
  },
  {
    name: lesson.value?.name,
  },
]);

const tabsVideo = ref([]);
const oneTabVideo = ref(null);

try {
  const response = await useApi().ssr({
    url: `/lessons/${route.params.slug}`,
    method: "get",
  });

  lesson.value = response?.data || response;

  if (lesson.value?.lesson_videos?.length) {
    lesson.value.lesson_videos.forEach((item) => {
      tabsVideo.value.push({
        id: item.id,
        name: item.title,
        url: item.url,
      });
    });
  }
  oneTabVideo.value = tabsVideo.value?.[0] || null;

  titleStore.setTitle(lesson.value?.course.name, "/panel/courses");

  useSeo({
    title: `${lesson.value?.course?.name || ""} > ${lesson.value?.name || ""}`,
  });
} catch (error) {
  await router.push("/panel/courses");
}

const downloadContectus = async () => {
  isConverting.value = true;
  await useExportToPdf(
    "conspectus",
    `${config.public.projectName} - ${lesson.value.course.name} > ${lesson.value.name}`,
  );
  isConverting.value = false;
};

const redirectToTest = (test) => {
  if (test.passed) {
    router.push({
      path: `/panel/lesson/test/${test.id}/result`,
      query: { lesson_id: lesson.value.id },
    });
  } else {
    router.push({
      path: `/panel/lesson/test/${test.id}`,
      query: {
        lesson_id: lesson.value.id,
        lesson_slug: lesson.value.slug,
      },
    });
  }
};

const redirectToPreviousLesson = () => {
  router.push(`/panel/lesson/${lesson.value.previous}`);
};

const redirectToNextLesson = async () => {
  // Если есть тесты - проверяем, что они пройдены
  if (lesson.value?.lesson_tests?.length > 0) {
    const passedTests = lesson.value.lesson_tests.filter(
      (test) => test?.passed,
    );

    if (!passedTests?.length) {
      useNotify({
        title: t("local.error"),
        text: t("local.first_need_to_take_the_test"),
        status: "error",
      });
      return;
    }
  }

  isLoading.value = true;

  try {
    await useApi().client({
      url: `/lessons/${lesson.value.slug}/finish`,
      method: "post",
      notify: false,
    });

    await router.push(`/panel/lesson/${lesson.value.next}`);
  } catch (error) {
    useNotify({
      title: t("local.error"),
      text:
        error?.data?.message ||
        error?.message ||
        t("local.something_went_wrong"),
      status: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.lesson {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__text {
    font-weight: 600;
  }
  &__materials {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    background-color: var(--surface-100);
    padding: $padding-md;
    border-radius: $border-r-md;
    box-shadow: $box-shadow;
  }
  &__conspectus {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    &:deep(ul) {
      display: flex;
      flex-direction: column;
      gap: $gap-xs;
    }
    &:deep(li) {
      margin-left: 24px;
    }
    &:deep(blockquote) {
      font-style: italic;
      p {
        font-style: inherit;
      }
    }
  }
  &__btns {
    display: flex;
    align-items: center;
    width: 100%;
    // justify-content: flex-start;
    gap: $gap-md;
    &-box {
      display: flex;
      gap: $gap-md;
      align-items: center;
      width: 100%;
    }
  }
  &__tests {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    padding: $padding-md 0;
    border-top: 1px solid var(--surface-200);
    border-bottom: 1px solid var(--surface-200);
  }
  &__test-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: $gap-md;
    padding: 22px 28px;
    border: 1px solid var(--surface-200);
    border-radius: $border-r-lg;
    background: var(--white);
    box-shadow: $box-shadow;
    &--passed .lesson__test-icon {
      background: rgba($primary-color, 0.13);
      color: $primary-color;
    }
  }
  &__test-icon {
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    border-radius: 15px;
    background: rgba($primary-color, 0.13);
    color: $primary-color;
    font-size: 24px;
    font-weight: 700;
  }
  &__test-content h3 {
    margin: 0;
    color: var(--surface-600);
    font-size: 20px;
  }
  &__test-content p {
    margin: 8px 0 0;
    color: var(--surface-400);
    font-size: 16px;
  }
  &__test-status {
    color: $primary-color;
    font-weight: 700;
    white-space: nowrap;
  }
  &__test-action {
    height: fit-content;
    white-space: nowrap;
  }
  &__btn {
    &--download {
      background-color: transparent;
      color: $blue-500;
      border: 1px solid $blue-500;
    }
    &--previous {
      margin-right: auto;
    }
    &--next {
      // margin-left: auto;
    }
    &--test {
      margin-left: auto;
    }
  }
}

@media (max-width: 768px) {
  .lesson {
    &__test-card {
      grid-template-columns: auto minmax(0, 1fr);
      padding: 18px;
    }
    &__test-status,
    &__test-action {
      grid-column: 2;
      justify-self: start;
    }
    &__btns {
      &-box {
        flex-direction: column;
      }
    }
    &__btn {
      width: 100%;
    }
  }
}
</style>
