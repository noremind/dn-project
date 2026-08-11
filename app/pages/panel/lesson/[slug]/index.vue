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

      <UiPlayer class="lesson__player" :video-id="oneTabVideo.url" />

      <div class="lesson__materials">
        <p class="lesson__text">{{ t("local.materials") }}:</p>
        <UiLogo v-if="isConverting" />

        <div
          id="conspectus"
          class="lesson__conspectus"
          v-html="lesson.content"
        ></div>
        <UiButton
          class="secondary-btn"
          :label="t('local.download_conspectus')"
          before-icon="download-i"
          icon-size="size-20"
          icon-color="primary-color"
          @action="downloadContectus"
          :is-loading="isConverting"
        />
      </div>

      <div class="lesson__btns">
        <div class="lesson__btns-box">
          <UiButton
            class="lesson__btn lesson__btn--previous primary-btn"
            :label="t('local.previous_lesson')"
            before-icon="chevron"
            icon-size="size-20"
            icon-deg="left"
            @action="redirectToPreviousLesson"
            :is-loading="isLoading"
          />
          <UiButton
            v-for="test in lesson.lesson_tests"
            :key="test.id"
            class="lesson__btn lesson__btn--test primary-btn primary-btn--green"
            :label="`${t('local.take_test')}(${test.title})`"
            @action="redirectToTest(test)"
          />
          <UiButton
            class="lesson__btn lesson__btn--next primary-btn"
            :label="t('local.next_lesson')"
            after-icon="chevron"
            icon-size="size-20"
            icon-deg="right"
            @action="redirectToNextLesson"
            :is-loading="isLoading"
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
  console.error("Failed to load lesson:", error);
  useNotify({
    title: t("local.error"),
    text:
      error?.statusMessage || error?.message || t("local.something_went_wrong"),
    status: "error",
  });
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
  router.push({
    path: `/panel/lesson/test/${test.id}`,
    query: {
      lesson_id: lesson.value.id,
      lesson_slug: lesson.value.slug,
    },
  });
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
      // margin-left: auto;
    }
  }
}
</style>
