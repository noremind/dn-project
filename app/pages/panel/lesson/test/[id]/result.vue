<template>
  <section class="test-result">
    <div class="test-result__wrapper">
      <div class="test-result__top">
        <UiButton
          class="secondary-btn"
          :label="t('local.back')"
          before-icon="chevron"
          icon-size="size-20"
          icon-color="primary-color"
          icon-deg="left"
          @action="router.back"
        />
        <div>
          <h1 class="test-result__title">{{ t("local.test_results") }}</h1>
          <p class="test-result__subtitle">{{ resultSubtitle }}</p>
        </div>
      </div>

      <div v-if="error" class="test-result__status">
        <UiAlertText :text="error" status="error" />
      </div>

      <div v-else-if="isLoading" class="test-result__status">
        <UiAlertText :text="t('local.loading')" status="info" />
      </div>

      <div v-else-if="!result" class="test-result__status">
        <UiAlertText :text="t('local.no_result')" status="info" />
      </div>

      <div v-else class="test-result__body">
        <div class="test-result__summary">
          <div
            :class="[
              'test-result__metric',
              item.statusType ? 'test-result__metric--status' : '',
            ]"
            v-for="item in summaryItems"
            :key="item.label"
          >
            <span class="test-result__metric-label">{{ item.label }}</span>
            <strong
              :class="[
                'test-result__metric-value',
                item.statusType === 'passed'
                  ? 'test-result__metric-value--passed'
                  : '',
                item.statusType === 'failed'
                  ? 'test-result__metric-value--failed'
                  : '',
              ]"
            >
              {{ item.value }}
            </strong>
          </div>
        </div>

        <div class="test-result__details" v-if="detailItems.length">
          <h2 class="test-result__section-title">
            {{ t("local.test_details") }}
          </h2>
          <div class="test-result__details-grid">
            <div
              class="test-result__detail"
              v-for="item in detailItems"
              :key="item.label"
            >
              <span class="test-result__detail-label">{{ item.label }}</span>
              <strong class="test-result__detail-value">{{
                item.value
              }}</strong>
            </div>
          </div>
        </div>

        <div v-if="questionDetails.length" class="test-result__questions">
          <h2 class="test-result__section-title">
            {{ t("local.question_answers") }}
          </h2>
          <div class="test-result__questions-grid">
            <div
              class="test-result__question-card"
              v-for="item in questionDetails"
              :key="item.question_id"
            >
              <div class="test-result__question-header">
                <span>{{ t("local.question") }} {{ item.question_id }}</span>
                <span
                  :class="[
                    'test-result__question-status',
                    item.is_correct
                      ? 'test-result__question-status--correct'
                      : 'test-result__question-status--incorrect',
                  ]"
                >
                  {{
                    item.is_correct ? t("local.correct") : t("local.incorrect")
                  }}
                </span>
              </div>
              <p class="test-result__question-text">{{ item.text }}</p>
              <div class="test-result__question-row">
                <span class="test-result__question-label"
                  >{{ t("local.submitted") }}:</span
                >
                <span class="test-result__question-value">{{
                  item.submittedText || "-"
                }}</span>
              </div>
              <div class="test-result__question-row" v-if="item.correctText">
                <span class="test-result__question-label"
                  >{{ t("local.correct_answer") }}:</span
                >
                <span class="test-result__question-value">{{
                  item.correctText
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="test-result__actions">
          <UiButton
            class="primary-btn"
            :label="t('local.back_to_lesson')"
            @action="goLesson"
          />
          <UiButton
            class="secondary-btn"
            :label="t('local.back_to_courses')"
            @action="goCourses"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const titleStore = useTitleStore();

const result = ref(null);
const isLoading = ref(true);
const error = ref(null);

const resultSubtitle = computed(() => {
  return (
    result.value?.meta?.test?.name || result.value?.meta?.lesson?.name || ""
  );
});

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const summaryItems = computed(() => {
  if (!result.value) return [];

  return [
    {
      label: t("local.percent"),
      value:
        result.value.summary?.percent !== undefined
          ? `${result.value.summary.percent}%`
          : "-",
    },
    {
      label: t("local.status"),
      value:
        result.value.summary?.status === "passed"
          ? t("local.passed")
          : result.value.summary?.status === "failed"
            ? t("local.failed")
            : result.value.summary?.status || "-",
      statusType: result.value.summary?.status,
    },
    {
      label: t("local.total_questions"),
      value: result.value.details?.length ?? "-",
    },
    {
      label: t("local.correct_answers"),
      value:
        result.value.details?.filter((item) => item.is_correct).length ?? "-",
    },
    {
      label: t("local.incorrect_answers"),
      value:
        result.value.details?.filter((item) => !item.is_correct).length ?? "-",
    },
  ];
});

const detailItems = computed(() => {
  if (!result.value) return [];

  const details = [];

  if (result.value.meta?.test?.name) {
    details.push({
      label: t("local.test"),
      value: result.value.meta.test.name,
    });
  }
  if (result.value.meta?.lesson?.name) {
    details.push({
      label: t("local.lesson"),
      value: result.value.meta.lesson.name,
    });
  }
  if (result.value.meta?.course?.name) {
    details.push({
      label: t("local.course"),
      value: result.value.meta.course.name,
    });
  }
  if (result.value.started_at) {
    details.push({
      label: t("local.started_at"),
      value: formatDate(result.value.started_at),
    });
  }
  if (result.value.finished_at) {
    details.push({
      label: t("local.finished_at"),
      value: formatDate(result.value.finished_at),
    });
  }
  if (result.value.duration) {
    details.push({ label: t("local.duration"), value: result.value.duration });
  }

  return details;
});

const questionDetails = computed(() => {
  if (!result.value?.details?.length) return [];

  return result.value.details.map((item) => {
    const submittedTexts = Array.isArray(item.submitted)
      ? item.submitted
          .map((submittedId) => {
            const answer = item.answers?.find(
              (answer) => answer.id === submittedId,
            );
            return answer ? answer.text : submittedId;
          })
          .filter(Boolean)
      : [];

    const correctTexts = Array.isArray(item.answers)
      ? item.answers
          .filter((answer) => answer.is_correct)
          .map((answer) => answer.text)
      : [];

    return {
      ...item,
      submittedText: submittedTexts.join(", "),
      correctText: correctTexts.join(", "),
    };
  });
});

const getResult = async () => {
  try {
    const res = await useApi().ssr({
      url: `/tests/${route.params.id}/results`,
      method: "get",
      query: { lesson_id: route.query?.lesson_id },
    });

    result.value = res;
    useSeo({ title: t("local.test_results") });
    titleStore.setTitle(t("local.test_results"), "/panel/courses");
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || t("local.something_went_wrong");
  } finally {
    isLoading.value = false;
  }
};

await getResult();

const goLesson = () => {
  if (route.query?.lesson_id) {
    router.push({
      path: `/panel/lesson/${route.query.lesson_id}`,
      query: { ...route.query },
    });
    return;
  }
  router.push({ path: "/panel/courses", query: {} });
};

const goCourses = () => {
  router.push({ path: "/panel/courses", query: {} });
};
</script>

<style lang="scss" scoped>
.test-result {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
    width: 100%;
  }

  &__top {
    display: flex;
    align-items: center;
    gap: $gap-md;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 32px;
    margin: 0;
  }

  &__subtitle {
    margin: 0;
    color: var(--surface-500);
  }

  &__status {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $gap-lg;
  }

  &__questions {
    display: flex;
    flex-direction: column;
    &-grid {
      display: flex;
      flex-direction: column;
      gap: $gap-md;
    }
  }

  &__body {
    display: grid;
    gap: $gap-lg;
  }

  &__summary {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $gap-md;
  }

  &__metric {
    padding: $padding-md;
    border-radius: $border-r-lg;
    background-color: var(--surface-100);
    display: flex;
    flex-direction: column;
    gap: $gap-xs;
  }

  &__metric-label {
    color: var(--surface-500);
    font-size: 0.95rem;
  }

  &__metric-value {
    font-size: 1.5rem;
    color: var(--black-fixed);
  }

  &__section-title {
    margin: 0 0 $gap-md;
    font-size: 20px;
    font-weight: 600;
  }

  &__details-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $gap-md;
  }

  &__detail {
    display: flex;
    flex-direction: column;
    gap: $gap-xxs;
    padding: $padding-md;
    border-radius: $border-r-lg;
    background-color: var(--surface-100);
  }

  &__detail-label {
    color: var(--surface-500);
    font-size: 0.9rem;
  }

  &__detail-value {
    font-size: 1rem;
    color: var(--black-fixed);
  }

  &__metric--status {
    background-color: $surface-100;
  }

  &__metric-value--passed {
    color: $green-700;
  }

  &__metric-value--failed {
    color: $red-700;
  }

  &__question {
    &-s {
      display: grid;
      gap: $gap-md;
    }

    &-card {
      padding: $padding-md;
      border-radius: $border-r-lg;
      background-color: var(--surface-100);
      display: flex;
      flex-direction: column;
      gap: $gap-sm;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $gap-sm;
      font-weight: 600;
    }

    &-status {
      padding: 4px 8px;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
    }

    &-status--correct {
      color: $green-700;
      background-color: $green-100;
    }

    &-status--incorrect {
      color: $red-700;
      background-color: $red-100;
    }

    &-text {
      margin: 0;
      color: var(--surface-700);
    }

    &-row {
      display: flex;
      flex-wrap: wrap;
      gap: $gap-xs;
      align-items: center;
    }

    &-label {
      color: var(--surface-500);
      font-size: 0.9rem;
    }

    &-value {
      color: var(--surface-800);
      font-weight: 600;
    }
  }

  &__actions {
    display: flex;
    gap: $gap-md;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .test-result {
    &__summary,
    &__details-grid {
      grid-template-columns: 1fr;
    }

    &__top {
      align-items: flex-start;
    }
  }
}
</style>
