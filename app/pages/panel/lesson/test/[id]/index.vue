<template>
  <section class="test">
    <div class="test__wrapper">
      <div class="test__top">
        <UiButton
          class="secondary-btn"
          :label="t('local.back')"
          before-icon="chevron"
          icon-size="size-20"
          icon-color="primary-color"
          icon-deg="left"
          @action="redirectToBack"
        />
        <h2 class="test__title">{{ test?.title }}</h2>
      </div>

      <!-- <h2 class="test__title test__title--mobile">{{ test?.title }}</h2> -->

      <div class="test__box">
        <div class="test__content">
          <TheTestQuestionCount
            class="test__total"
            :current="currentNumberQuestion"
            :total="questions?.length"
          />

          <TheTestQuestion :question="currentQuestion?.text" />

          <UiTestRadio
            v-if="currentQuestion?.question_type === 1"
            :variants="currentQuestion.answers"
            v-model="currentUserAnswer"
          />

          <div class="test__btns">
            <UiButton
              :label="submitButtonLabel"
              class="test__btn test__btn--next primary-btn"
              after-icon="chevron"
              icon-color="white-fixed"
              icon-size="size-20"
              icon-deg="right"
              :disabled="disabledPostAnswerBtn"
              @action="handleAnswerAction"
            />
          </div>

          <UiButton
            :label="t('local.finish')"
            class="test__btn test__btn--finish test__btn--finish-mobile secondary-btn"
            @action="setFinishModal(true)"
          />
        </div>
        <div class="test__info">
          <TheTestTimer
            v-if="test?.expired_at"
            class="test__timer"
            :timer="test?.expired_at"
            @time-up="postTestIdSubmit"
          />

          <TheTestPagination
            :total="questions"
            :current="currentQuestion?.id"
            @update="changeQuestion"
            :work-on-mistakes="false"
          />

          <UiButton
            :label="t('local.finish')"
            class="test__btn test__btn--finish secondary-btn"
            @action="setFinishModal(true)"
          />
        </div>
      </div>
    </div>
  </section>

  <UiModal
    :is-open="isOpenFinishModal"
    max-width="500px"
    :hide-close="true"
    @close="setFinishModal(false)"
  >
    <ModalsFinishTest
      @close="setFinishModal(false)"
      @finish="postTestIdSubmit"
      :is-loading="isFinishLoadingBtn"
    />
  </UiModal>
</template>

<script setup>
import {
  getNextQuestionId,
  getQuestionNumber,
  markQuestionAsAnswered,
} from "~/utils/testFlow";

const { t } = useI18n();
const titleStore = useTitleStore();

const route = useRoute();
const router = useRouter();

const test = ref(null);

const questions = ref([]);
const currentQuestion = ref(null);
const currentUserAnswer = ref(null);

const isOpenFinishModal = ref(false);
const isFinishLoadingBtn = ref(false);
const isSubmittingAnswer = ref(false);

const currentNumberQuestion = computed(() => {
  return getQuestionNumber(questions.value, currentQuestion.value?.id);
});

const hasNextQuestion = computed(() => {
  if (!questions.value?.length || !currentQuestion.value?.id) return false;

  return Boolean(getNextQuestionId(questions.value, currentQuestion.value.id));
});

const submitButtonLabel = computed(() => {
  return hasNextQuestion.value ? t("local.next") : t("local.send");
});

const getErrorMessage = (error) => {
  const serverMessage =
    error?.data?.message || error?.message || error?.statusMessage;
  return serverMessage || t("local.something_went_wrong");
};

const getTestsStart = async () => {
  try {
    const res = await useApi().client({
      url: `/tests/${route.params.id}`,
      method: "get",
      query: { lesson_id: route.query?.lesson_id },
    });

    test.value = res.data;
    questions.value = Array.isArray(res.data?.questions)
      ? res.data.questions
      : [];
    currentQuestion.value = questions.value?.[0] || null;
    currentUserAnswer.value = currentQuestion.value?.user_answer?.[0]
      ? currentQuestion.value.user_answer[0]
      : null;

    useSeo({ title: test.value?.title });
  } catch (error) {
    useNotify({
      title: t("local.error"),
      text: getErrorMessage(error),
      status: "error",
    });
  }
};

await getTestsStart();

titleStore.setTitle(
  test.value?.lesson?.name || "",
  test.value?.lesson?.name ? "/panel/courses" : null,
);

const postTestsIdQuestionsIdAnswer = async () => {
  if (!currentQuestion.value?.id || !currentUserAnswer.value?.id) {
    useNotify({
      title: t("local.error"),
      text: t("local.please_choose_an_answer"),
      status: "error",
    });
    return false;
  }

  isSubmittingAnswer.value = true;

  try {
    await useApi().client({
      url: `/tests/${route.params.id}/questions/${currentQuestion.value.id}/answer`,
      method: "post",
      body: {
        answer_ids: [currentUserAnswer.value.id],
        lesson_id: route.query?.lesson_id,
      },
    });

    questions.value = markQuestionAsAnswered(
      questions.value,
      currentQuestion.value.id,
      currentUserAnswer.value,
    );

    const nextQuestionId = getNextQuestionId(
      questions.value,
      currentQuestion.value.id,
    );

    if (nextQuestionId) {
      currentQuestion.value = questions.value.find(
        (item) => item.id === nextQuestionId,
      );
      currentUserAnswer.value = currentQuestion.value?.user_answer?.[0] || null;
      return true;
    }

    // Keep the final question visible after answering it so pagination
    // continues to show the last question information.
    currentUserAnswer.value = currentQuestion.value?.user_answer?.[0] || null;
    return true;
  } catch (error) {
    useNotify({
      title: t("local.error"),
      text: getErrorMessage(error),
      status: "error",
    });
    return false;
  } finally {
    isSubmittingAnswer.value = false;
  }
};

const handleAnswerAction = async () => {
  await postTestsIdQuestionsIdAnswer();
};

const postTestIdSubmit = async () => {
  isFinishLoadingBtn.value = true;

  try {
    await useApi().client({
      url: `/tests/${route.params.id}/submit`,
      method: "post",
      body: { lesson_id: route.query?.lesson_id },
    });

    await router.push({
      path: `/panel/lesson/test/${route.params.id}/result`,
      query: route.query?.lesson_id ? { lesson_id: route.query.lesson_id } : {},
    });
  } catch (error) {
    useNotify({
      title: t("local.error"),
      text: getErrorMessage(error),
      status: "error",
    });
  } finally {
    isFinishLoadingBtn.value = false;
  }
};

const changeQuestion = (questionId) => {
  const selectedQuestion = questions.value.find(
    (item) => item.id === questionId,
  );
  if (!selectedQuestion) return;

  currentQuestion.value = selectedQuestion;
  currentUserAnswer.value = selectedQuestion.user_answer?.[0] || null;
};

const setFinishModal = (value) => {
  isOpenFinishModal.value = value;
};

const redirectToBack = () => {
  if (test.value?.lesson?.slug) {
    router.push({ path: `/panel/lesson/${test.value.lesson.slug}` });
  } else {
    router.push("/panel/courses");
  }
};

const disabledPostAnswerBtn = computed(() => {
  if (
    [1].includes(currentQuestion.value?.question_type) &&
    !currentUserAnswer.value?.id
  ) {
    return true;
  }

  return false;
});

watch(
  () => currentNumberQuestion.value,
  () => {
    currentUserAnswer.value = currentQuestion.value?.user_answer?.[0] || null;
  },
);
</script>

<style lang="scss" scoped>
.test {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__title {
    flex-grow: 1;
    &--mobile {
      display: none;
    }
  }
  &__total {
    text-align: center;
  }
  &__top {
    display: flex;
    align-items: center;
    gap: $gap-md;
  }
  &__btns {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &__btn {
    &--finish {
      width: 100%;
      border: 1px solid $green-500;
      color: $green-500;
      &-mobile {
        display: none;
      }
    }
    &--next {
      margin-top: auto;
    }
  }
  &__box {
    display: flex;
    gap: $gap-xl;
  }
  &__timer {
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: $gap-xl;
    width: 100%;
    flex-grow: 1;
    height: 100%;
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    max-width: 300px;
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .test {
    &__box {
      flex-direction: column;
      width: 100%;
    }
    &__info {
      order: 0;
      max-width: 100%;
    }
    &__content {
      order: 1;
    }
    &__icon {
      display: none;
      &--mobile {
        display: block;
      }
    }
    &__timer {
      // margin: 0 0 0 auto;
      // width: 50%;
    }
    &__btn {
      &--finish {
        display: none;
        &-mobile {
          display: flex;
          margin-top: 40px;
        }
      }
      &--error {
        display: none;
      }
    }
    &__title {
      display: none;
      &--mobile {
        display: block;
      }
    }
  }
}
</style>
