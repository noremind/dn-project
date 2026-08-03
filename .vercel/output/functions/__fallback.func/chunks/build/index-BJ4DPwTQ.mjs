import { _ as __nuxt_component_2$1 } from './Button-BBNNwGkn.mjs';
import { ref, computed, withAsyncContext, watch, unref, isRef, withCtx, createVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc, f as useI18n, i as useRoute, a as useRouter, j as useApi, g as __nuxt_component_0$2, h as __nuxt_component_1$1 } from './server.mjs';
import { u as useTitleStore } from './title-BndfFPR5.mjs';
import { u as useSeo } from './useSeo-C1p0zVML.mjs';
import { u as useNotify } from './useNotify-Zw0dZA8p.mjs';
import './nuxt-link-JVcuMwSA.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'pinia';
import 'perfect-debounce';
import '@vue/shared';
import 'maska';
import '@capacitor/core';
import '@capacitor/preferences';
import '@capacitor/push-notifications';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './project-GeJXWS_c.mjs';

const _sfc_main$9 = {
  __name: "TheTestQuestionCount",
  __ssrInlineRender: true,
  props: {
    current: Number,
    total: Number
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "count" }, _attrs))} data-v-d6eb59ea><div class="count__wrapper" data-v-d6eb59ea><p class="count__text" data-v-d6eb59ea>${ssrInterpolate(unref(t)("local.question"))} ${ssrInterpolate(__props.current)} / ${ssrInterpolate(__props.total || 0)}</p></div></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Test/QuestionCount.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-d6eb59ea"]]);
const _sfc_main$8 = {
  __name: "UiMathjax",
  __ssrInlineRender: true,
  props: {
    formula: String
  },
  setup(__props) {
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Mathjax.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "TheTestQuestion",
  __ssrInlineRender: true,
  props: {
    question: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiMathjax = _sfc_main$8;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "question" }, _attrs))} data-v-cb3ddef6><div class="question__wrapper" data-v-cb3ddef6>`);
      _push(ssrRenderComponent(_component_UiMathjax, {
        class: "question__name",
        formula: __props.question
      }, null, _parent));
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Test/Question.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-cb3ddef6"]]);
const _sfc_main$6 = {
  __name: "UiTestRadio",
  __ssrInlineRender: true,
  props: {
    variants: Array,
    modelValue: Object,
    disabled: Boolean,
    correctAnswers: Object,
    status: [String, null],
    userAnswers: Object,
    show: { type: String, default: "text" },
    type: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const mValue = ref(props.modelValue);
    watch(mValue, (val) => emit("update:modelValue", val));
    watch(
      () => props.modelValue,
      (val) => mValue.value = val
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiMathjax = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "radio" }, _attrs))} data-v-1882d9b7><div class="${ssrRenderClass([{ "radio__wrapper--horizontal": __props.type === "horizontal" }, "radio__wrapper"])}" data-v-1882d9b7><!--[-->`);
      ssrRenderList(__props.variants, (variant) => {
        _push(`<label class="radio__label"${ssrRenderAttr("for", `radio-${variant.id}`)} data-v-1882d9b7><input type="radio" class="${ssrRenderClass([{
          "radio__input--success": __props.status && variant.id === __props.correctAnswers?.id,
          "radio__input--error": __props.status === "fail" && variant.id === unref(mValue)?.id && variant.id !== __props.correctAnswers?.id
        }, "radio__input"])}"${ssrRenderAttr("id", `radio-${variant.id}`)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(mValue), variant)) ? " checked" : ""}${ssrRenderAttr("value", variant)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-1882d9b7>`);
        _push(ssrRenderComponent(_component_UiMathjax, {
          formula: variant[__props.show]
        }, null, _parent));
        _push(`</label>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/TestRadio.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-1882d9b7"]]);
const _sfc_main$5 = {
  __name: "TheTestTimer",
  __ssrInlineRender: true,
  props: {
    timer: String
  },
  emits: ["time-up"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const props = __props;
    const remaining = ref(0);
    ref(null);
    const formattedTime = computed(() => {
      if (!remaining.value || remaining.value <= 0) return "00:00:00";
      const hours = Math.floor(remaining.value / 3600);
      const minutes = Math.floor(remaining.value % 3600 / 60);
      const seconds = remaining.value % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    });
    watch(
      () => props.timer,
      (newVal) => {
        if (newVal) {
          new Date(newVal).getTime();
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "timer" }, _attrs))} data-v-4c23a23f><div class="timer__wrapper" data-v-4c23a23f><p class="timer__text" data-v-4c23a23f>${ssrInterpolate(unref(t)("local.expired_at"))}</p><p class="timer__time" data-v-4c23a23f>${ssrInterpolate(unref(formattedTime))}</p></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Test/Timer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-4c23a23f"]]);
const _sfc_main$4 = {
  __name: "TheTestPagination",
  __ssrInlineRender: true,
  props: {
    total: {
      type: Array,
      default: []
    },
    isLastSubject: Boolean,
    current: Number,
    workOnMistakes: Boolean
  },
  emits: ["update", "nextSubject"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const props = __props;
    computed(
      () => props.total?.length ? props.total[props.total?.length - 1]?.id : false
    );
    const isAnswered = (question) => Boolean(question?.answered || question?.user_answer?.length);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination" }, _attrs))} data-v-22cceabe><div class="pagination__wrapper" data-v-22cceabe><p class="pagination__text" data-v-22cceabe>${ssrInterpolate(unref(t)("local.all_questions"))}</p><div class="pagination__btns" data-v-22cceabe><!--[-->`);
      ssrRenderList(__props.total, (num, index2) => {
        _push(`<button class="${ssrRenderClass([{
          "pagination__btn--current": __props.current === num.id,
          "pagination__btn--answered": isAnswered(num),
          "pagination__btn--error": false,
          "pagination__btn--success": false
        }, "pagination__btn"])}" type="button" data-v-22cceabe>${ssrInterpolate(index2 + 1)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (__props.workOnMistakes) {
        _push(ssrRenderComponent(_component_UiButton, {
          "after-icon": "chevron",
          class: "tertiary-btn",
          "icon-deg": "down",
          label: unref(t)("Перейти к результатам"),
          onAction: ($event) => emit("redirect")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Test/Pagination.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-22cceabe"]]);
const _sfc_main$3 = {
  __name: "UiModal",
  __ssrInlineRender: true,
  props: {
    isOpen: Boolean,
    maxWidth: String,
    fullScreen: {
      type: Boolean,
      default: false
    },
    hideClose: {
      type: Boolean,
      default: false
    },
    title: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Modal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-223c057a"]]);
const _sfc_main$2 = {
  __name: "UiAlertText",
  __ssrInlineRender: true,
  props: {
    text: String,
    status: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "alert" }, _attrs))} data-v-8fd525a1><div class="${ssrRenderClass([{ "alert__wrapper--warning": __props.status === "warning" }, "alert__wrapper"])}" data-v-8fd525a1>`);
      _push(ssrRenderComponent(_component_UiIcon, {
        icon: "i-circle",
        color: "blue-500",
        size: "size-24"
      }, null, _parent));
      _push(`<p class="alert__text" data-v-8fd525a1>${ssrInterpolate(__props.text)}</p></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/AlertText.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8fd525a1"]]);
const _sfc_main$1 = {
  __name: "ModalsFinishTest",
  __ssrInlineRender: true,
  props: {
    isLoading: Boolean
  },
  emits: ["close", "finish"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiAlertText = __nuxt_component_0;
      const _component_UiButton = __nuxt_component_2$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "finish" }, _attrs))} data-v-d6363f6c><div class="finish__wrapper" data-v-d6363f6c><h4 class="finish__title" data-v-d6363f6c>${ssrInterpolate(unref(t)("local.will_you_complete_the_testing"))}</h4>`);
      _push(ssrRenderComponent(_component_UiAlertText, {
        text: unref(t)("local.finish_the_test_alert_information"),
        status: "info"
      }, null, _parent));
      _push(`<div class="finish__btns" data-v-d6363f6c>`);
      _push(ssrRenderComponent(_component_UiButton, {
        onAction: ($event) => emit("close"),
        label: unref(t)("local.cancel"),
        class: "finish__btn finish__btn--cancel secondary-btn"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        onAction: ($event) => emit("finish"),
        label: unref(t)("local.finish"),
        class: "finish__btn finish__btn--finish secondary-btn",
        "is-loading": __props.isLoading,
        "after-icon": "checkmark-i",
        "icon-size": "size-20",
        "icon-color": "green-500"
      }, null, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modals/FinishTest.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d6363f6c"]]);
function getQuestionNumber(questions, questionId) {
  if (!Array.isArray(questions) || !questionId) return 0;
  const index2 = questions.findIndex((item) => item.id === questionId);
  return index2 >= 0 ? index2 + 1 : 0;
}
function getNextQuestionId(questions, currentQuestionId) {
  if (!Array.isArray(questions) || !currentQuestionId) return null;
  const index2 = questions.findIndex((item) => item.id === currentQuestionId);
  if (index2 < 0 || index2 >= questions.length - 1) return null;
  return questions[index2 + 1]?.id ?? null;
}
function markQuestionAsAnswered(questions, questionId, answer) {
  if (!Array.isArray(questions) || !questionId) return questions;
  const index2 = questions.findIndex((item) => item.id === questionId);
  if (index2 < 0) return questions;
  const updatedQuestions = [...questions];
  updatedQuestions[index2] = {
    ...updatedQuestions[index2],
    user_answer: answer ? [answer] : [],
    answered: Boolean(answer)
  };
  return updatedQuestions;
}
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
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
    const getErrorMessage = (error) => {
      const serverMessage = error?.data?.message || error?.message || error?.statusMessage;
      return serverMessage || t("local.something_went_wrong");
    };
    const getTestsStart = async () => {
      try {
        const res = await useApi().client({
          url: `/tests/${route.params.id}`,
          method: "get",
          query: { lesson_id: route.query?.lesson_id }
        });
        test.value = res.data;
        questions.value = Array.isArray(res.data?.questions) ? res.data.questions : [];
        currentQuestion.value = questions.value?.[0] || null;
        currentUserAnswer.value = currentQuestion.value?.user_answer?.[0] ? currentQuestion.value.user_answer[0] : null;
        useSeo({ title: test.value?.title });
      } catch (error) {
        useNotify({
          title: t("local.error"),
          text: getErrorMessage(error),
          status: "error"
        });
      }
    };
    [__temp, __restore] = withAsyncContext(() => getTestsStart()), await __temp, __restore();
    titleStore.setTitle(
      test.value?.lesson?.name || "",
      test.value?.lesson?.name ? "/panel/courses" : null
    );
    const postTestsIdQuestionsIdAnswer = async () => {
      if (!currentQuestion.value?.id || !currentUserAnswer.value?.id) {
        useNotify({
          title: t("local.error"),
          text: t("local.please_choose_an_answer"),
          status: "error"
        });
        return;
      }
      isSubmittingAnswer.value = true;
      try {
        await useApi().client({
          url: `/tests/${route.params.id}/questions/${currentQuestion.value.id}/answer`,
          method: "post",
          body: { answer_ids: [currentUserAnswer.value.id] }
        });
        questions.value = markQuestionAsAnswered(
          questions.value,
          currentQuestion.value.id,
          currentUserAnswer.value
        );
        const nextQuestionId = getNextQuestionId(
          questions.value,
          currentQuestion.value.id
        );
        if (nextQuestionId) {
          currentQuestion.value = questions.value.find(
            (item) => item.id === nextQuestionId
          );
          currentUserAnswer.value = currentQuestion.value?.user_answer?.[0] || null;
          return;
        }
        currentQuestion.value = null;
        currentUserAnswer.value = null;
      } catch (error) {
        useNotify({
          title: t("local.error"),
          text: getErrorMessage(error),
          status: "error"
        });
      } finally {
        isSubmittingAnswer.value = false;
      }
    };
    const postTestIdSubmit = async () => {
      isFinishLoadingBtn.value = true;
      try {
        await useApi().client({
          url: `/tests/${route.params.id}/submit`,
          method: "post",
          body: { lesson_id: route.query?.lesson_id }
        });
        await router.push({ path: "/panel/courses", query: {} });
      } catch (error) {
        useNotify({
          title: t("local.error"),
          text: getErrorMessage(error),
          status: "error"
        });
      } finally {
        isFinishLoadingBtn.value = false;
      }
    };
    const changeQuestion = (questionId) => {
      const selectedQuestion = questions.value.find(
        (item) => item.id === questionId
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
      if ([1].includes(currentQuestion.value?.question_type) && !currentUserAnswer.value?.id) {
        return true;
      }
      return false;
    });
    watch(
      () => currentNumberQuestion.value,
      () => {
        currentUserAnswer.value = currentQuestion.value?.user_answer?.[0] || null;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = __nuxt_component_2$1;
      const _component_TheTestQuestionCount = __nuxt_component_1;
      const _component_TheTestQuestion = __nuxt_component_2;
      const _component_UiTestRadio = __nuxt_component_3;
      const _component_TheTestTimer = __nuxt_component_4;
      const _component_TheTestPagination = __nuxt_component_5;
      const _component_UiModal = __nuxt_component_6;
      const _component_ModalsFinishTest = __nuxt_component_7;
      _push(`<!--[--><section class="test" data-v-7fd0b836><div class="test__wrapper" data-v-7fd0b836><div class="test__top" data-v-7fd0b836>`);
      _push(ssrRenderComponent(_component_UiButton, {
        class: "secondary-btn",
        label: unref(t)("local.back"),
        "before-icon": "chevron",
        "icon-size": "size-20",
        "icon-color": "primary-color",
        "icon-deg": "left",
        onAction: redirectToBack
      }, null, _parent));
      _push(`<h2 class="test__title" data-v-7fd0b836>${ssrInterpolate(unref(test)?.title)}</h2></div><div class="test__box" data-v-7fd0b836><div class="test__content" data-v-7fd0b836>`);
      _push(ssrRenderComponent(_component_TheTestQuestionCount, {
        class: "test__total",
        current: unref(currentNumberQuestion),
        total: unref(questions)?.length
      }, null, _parent));
      _push(ssrRenderComponent(_component_TheTestQuestion, {
        question: unref(currentQuestion)?.text
      }, null, _parent));
      if (unref(currentQuestion)?.question_type === 1) {
        _push(ssrRenderComponent(_component_UiTestRadio, {
          variants: unref(currentQuestion).answers,
          modelValue: unref(currentUserAnswer),
          "onUpdate:modelValue": ($event) => isRef(currentUserAnswer) ? currentUserAnswer.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="test__btns" data-v-7fd0b836>`);
      if (unref(hasNextQuestion)) {
        _push(ssrRenderComponent(_component_UiButton, {
          label: unref(t)("local.next"),
          class: "test__btn test__btn--next primary-btn",
          "after-icon": "chevron",
          "icon-color": "white-fixed",
          "icon-size": "size-20",
          "icon-deg": "right",
          disabled: unref(disabledPostAnswerBtn),
          onAction: postTestsIdQuestionsIdAnswer
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        label: unref(t)("local.finish"),
        class: "test__btn test__btn--finish test__btn--finish-mobile secondary-btn",
        onAction: ($event) => setFinishModal(true)
      }, null, _parent));
      _push(`</div><div class="test__info" data-v-7fd0b836>`);
      if (unref(test)?.expired_at) {
        _push(ssrRenderComponent(_component_TheTestTimer, {
          class: "test__timer",
          timer: unref(test)?.expired_at,
          onTimeUp: postTestIdSubmit
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_TheTestPagination, {
        total: unref(questions),
        current: unref(currentQuestion)?.id,
        onUpdate: changeQuestion,
        "work-on-mistakes": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiButton, {
        label: unref(t)("local.finish"),
        class: "test__btn test__btn--finish secondary-btn",
        onAction: ($event) => setFinishModal(true)
      }, null, _parent));
      _push(`</div></div></div></section>`);
      _push(ssrRenderComponent(_component_UiModal, {
        "is-open": unref(isOpenFinishModal),
        "max-width": "500px",
        "hide-close": true,
        onClose: ($event) => setFinishModal(false)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ModalsFinishTest, {
              onClose: ($event) => setFinishModal(false),
              onFinish: postTestIdSubmit,
              "is-loading": unref(isFinishLoadingBtn)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ModalsFinishTest, {
                onClose: ($event) => setFinishModal(false),
                onFinish: postTestIdSubmit,
                "is-loading": unref(isFinishLoadingBtn)
              }, null, 8, ["onClose", "is-loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panel/lesson/test/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7fd0b836"]]);

export { index as default };
//# sourceMappingURL=index-BJ4DPwTQ.mjs.map
