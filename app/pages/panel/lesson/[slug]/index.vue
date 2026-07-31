<template>
  <section class="lesson">
    <div class="lesson__wrapper">
      <UiBreadcrumb v-if="lesson" :info="breadcrumb" />

      <h2 class="lesson__title">{{ lesson.name }}</h2>

      <UiTabs
        v-if="tabsVideo?.length > 1"
        :tabs="tabsVideo"
        v-model="oneTabVideo"
        type="line"
      />

      <UiPlayer
        class="lesson__player"
        :video-id="
          'https://youtu.be/Y_8mUx4VOmo?si=SUNB4RcpiFklyPJN' || oneTab.url
        "
      />

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
            v-for="test in lesson.lesson_tests"
            :key="test.id"
            class="primary-btn primary-btn--green"
            :label="`${t('local.take_test')}(${test.title})`"
            @action="redirectToTest(test)"
          />
          <UiButton
            class="primary-btn"
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

await useApi()
  .ssr({ url: `/lessons/${route.params.slug}`, method: "get" })
  .then((res) => {
    lesson.value = res.data;
    lesson.value.lesson_videos?.length
      ? lesson.value.lesson_videos.forEach((item) =>
          tabsVideo.value?.push({
            id: item.id,
            name: item.title,
            url: item.url,
          }),
        )
      : null;
    oneTabVideo.value = tabsVideo.value?.[0] || null;
  });

titleStore.setTitle(lesson.value?.course.name, "/panel/courses");

useSeo({
  title: `${lesson.value.course.name} > ${lesson.value.name}`,
});

const downloadContectus = async () => {
  isConverting.value = true;
  await useExportToPdf(
    "conspectus",
    `${config.public.projectName} - ${lesson.value.course.name} > ${lesson.value.name}`,
  );
  isConverting.value = false;
};

const redirectToTest = (test) => {
  router.push(`/panel/lesson/test/${test.id}?lesson_id=${lesson.value.id}`);
};

const redirectToNextLesson = async () => {
  const passedTests = lesson.value?.lesson_tests?.filter(
    (test) => test?.passed,
  );
  const hasPassedCurrentTest = Boolean(passedTests?.length);

  if (!hasPassedCurrentTest) {
    useNotify({
      title: t("local.error"),
      text: t("local.first_need_to_take_the_test"),
      status: "error",
    });
    return;
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
    justify-content: flex-end;
    gap: $gap-md;
    &-box {
      display: flex;
      justify-content: flex-end;
      gap: $gap-md;
      align-items: center;
    }
  }
  &__btn {
    &--download {
      background-color: transparent;
      color: $blue-500;
      border: 1px solid $blue-500;
    }
  }
}
</style>
