<template>
  <section class="lesson">
    <div class="lesson__wrapper">
      <UiBreadcrumb v-if="lesson" :info="breadcrumb" />

      <h2 class="lesson__title">{{ lesson.name }}</h2>

      <UiTabs v-if="tabs?.length > 1" :tabs="tabs" v-model="oneTab" />

      <UiPlayer
        class="lesson__player"
        :video-id="
          'https://youtu.be/Y_8mUx4VOmo?si=SUNB4RcpiFklyPJN' || oneTab.url
        "
      />

      <div class="lesson__conspectus">{{ lesson.content }}</div>

      <div class="lesson__btns">
        <div class="lesson__btns-box">
          <UiButton
            class="primary-btn primary-btn--green"
            :label="t('local.take_test')"
          />
          <UiButton
            class="primary-btn"
            :label="t('local.next_lesson')"
            after-icon="chevron"
            icon-size="size-20"
            icon-deg="right"
          />
        </div>
      </div>
    </div>
    <pre>{{ lesson }}</pre>
  </section>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const titleStore = useTitleStore();

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

const tabs = ref([]);
const oneTab = ref(null);

await useApi()
  .client({ url: `/lessons/${route.params.slug}`, method: "get" })
  .then((res) => {
    lesson.value = res.data;
    lesson.value.lesson_videos?.length
      ? lesson.value.lesson_videos.forEach((item) =>
          tabs.value?.push({ id: item.id, name: item.title, url: item.url }),
        )
      : null;
    oneTab.value = tabs.value?.[0] || null;
  });

titleStore.setTitle(lesson.value?.course.name, "/panel/courses");
</script>

<style lang="scss" scoped>
.lesson {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
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
}
</style>
