import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './ProgressBar-Cr5RjvE8.mjs';
import { _ as __nuxt_component_2$1 } from './Button-BBNNwGkn.mjs';
import { ref, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, f as useI18n, i as useRoute, a as useRouter, o as useFetchSsr, h as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-JVcuMwSA.mjs';
import { u as useTitleStore } from './title-BndfFPR5.mjs';
import { u as useSeo } from './useSeo-C1p0zVML.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
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

const _sfc_main$2 = {
  __name: "TheCourseInfo",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    const redirectToLesson = (slug) => {
      router.push(`/panel/lesson/${slug}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiProgressBar = __nuxt_component_2;
      const _component_UiButton = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "info" }, _attrs))} data-v-432aea94><div class="info__wrapper" data-v-432aea94>`);
      _push(ssrRenderComponent(_component_UiProgressBar, {
        percent: __props.info.user_progress?.progress
      }, null, _parent));
      if (__props.info.user_progress) {
        _push(`<hr class="info__hr"${ssrRenderAttr("percent", __props.info.user_progress?.progress)} data-v-432aea94>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.info.user_status === "buy") {
        _push(ssrRenderComponent(_component_UiButton, {
          class: "info__btn primary-btn primary-btn--green",
          label: unref(t)("local.buy")
        }, null, _parent));
      } else if (__props.info.user_status === "start") {
        _push(ssrRenderComponent(_component_UiButton, {
          class: "info__btn primary-btn",
          onAction: ($event) => redirectToLesson(__props.info.current_lesson_slug),
          label: unref(t)("local.start")
        }, null, _parent));
      } else if (__props.info.user_status === "continue") {
        _push(ssrRenderComponent(_component_UiButton, {
          class: "info__btn primary-btn",
          label: unref(t)("local.continue"),
          "after-icon": "chevron",
          "icon-size": "size-20",
          "icon-deg": "right",
          onAction: ($event) => redirectToLesson(__props.info.current_lesson_slug)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Course/Info.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-432aea94"]]);
const _sfc_main$1 = {
  __name: "TheCourseAccordion",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const isOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1$1;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "accordion" }, _attrs))} data-v-330160bc><div class="accordion__wrapper" data-v-330160bc><div class="accordion__header" data-v-330160bc><p class="accordion__name" data-v-330160bc>${ssrInterpolate(__props.info.name)}</p><div class="accordion__box" data-v-330160bc><p class="accordion__lessons" data-v-330160bc>${ssrInterpolate(__props.info.lessons?.length)}</p>`);
      _push(ssrRenderComponent(_component_UiIcon, {
        icon: "chevron",
        size: "size-20",
        color: "surface-500",
        deg: unref(isOpen) ? "right" : "down"
      }, null, _parent));
      _push(`</div></div>`);
      if (unref(isOpen)) {
        _push(`<div class="accordion__content" data-v-330160bc><!--[-->`);
        ssrRenderList(__props.info.lessons, (lesson) => {
          _push(ssrRenderComponent(_component_nuxt_link, {
            class: ["accordion__content-link", { "accordion__content-link--active": lesson.is_completed }],
            key: lesson.id,
            to: `/panel/lesson/${lesson.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiIcon, {
                  icon: lesson.is_completed ? "checkmark-i" : "play-i",
                  size: "size-16",
                  color: lesson.is_completed ? "white" : "black"
                }, null, _parent2, _scopeId));
                _push2(`<p class="accordion__content-text" data-v-330160bc${_scopeId}>${ssrInterpolate(lesson.name)}</p>`);
              } else {
                return [
                  createVNode(_component_UiIcon, {
                    icon: lesson.is_completed ? "checkmark-i" : "play-i",
                    size: "size-16",
                    color: lesson.is_completed ? "white" : "black"
                  }, null, 8, ["icon", "color"]),
                  createVNode("p", { class: "accordion__content-text" }, toDisplayString(lesson.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Course/Accordion.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-330160bc"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const route = useRoute();
    useRouter();
    const titleStore = useTitleStore();
    const course = ref(null);
    titleStore.setTitle(t("local.courses"), "/panel/courses");
    [__temp, __restore] = withAsyncContext(() => useFetchSsr({
      url: `/courses/${route.params.slug}`,
      method: "get"
    }).then((res) => {
      course.value = res.data;
    })), await __temp, __restore();
    useSeo({
      title: course.value.name,
      description: course.value.description
    });
    const infos = computed(() => [
      {
        id: 1,
        icon: "module-i",
        text: `${course.value.modules_count} ${course.value.modules_count > 0 ? t("local.module").toLocaleLowerCase() : t("local.modules").toLocaleLowerCase()}`
      },
      {
        id: 2,
        icon: "circle-i",
        text: `${course.value.lessons_count} ${course.value.lessons_count > 0 ? t("local.lesson").toLocaleLowerCase() : t("local.lessons").toLocaleLowerCase()}`
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiNoImage = __nuxt_component_0;
      const _component_TheCourseInfo = __nuxt_component_1;
      const _component_UiIcon = __nuxt_component_1$1;
      const _component_TheCourseAccordion = __nuxt_component_3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "course" }, _attrs))} data-v-cd658bed><div class="course__wrapper" data-v-cd658bed><h2 class="course__title" data-v-cd658bed>${ssrInterpolate(unref(course).name)}</h2><div class="course__box" data-v-cd658bed><div class="course__content" data-v-cd658bed>`);
      if (unref(course).image) {
        _push(`<img class="course__preview"${ssrRenderAttr("src", unref(course).image)} alt="Preview" data-v-cd658bed>`);
      } else {
        _push(ssrRenderComponent(_component_UiNoImage, { class: "course__no-image" }, null, _parent));
      }
      _push(ssrRenderComponent(_component_TheCourseInfo, {
        class: "course__info course__info--mobile",
        info: unref(course)
      }, null, _parent));
      _push(`<section class="course__program" data-v-cd658bed><div class="course__program-header" data-v-cd658bed><h3 class="course__program-title" data-v-cd658bed>${ssrInterpolate(unref(t)("local.course_program"))}</h3><div class="course__program-box" data-v-cd658bed><!--[-->`);
      ssrRenderList(unref(infos), (item) => {
        _push(`<div class="course__program-inner" data-v-cd658bed>`);
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: item.icon,
          size: "size-16"
        }, null, _parent));
        _push(`<p class="course__program-text" data-v-cd658bed>${ssrInterpolate(item.text)}</p></div>`);
      });
      _push(`<!--]--></div></div><hr class="course__hr" data-v-cd658bed><div class="course__accordions" data-v-cd658bed><!--[-->`);
      ssrRenderList(unref(course).modules, (accordion) => {
        _push(ssrRenderComponent(_component_TheCourseAccordion, {
          key: accordion.id,
          info: accordion
        }, null, _parent));
      });
      _push(`<!--]--></div></section></div>`);
      _push(ssrRenderComponent(_component_TheCourseInfo, {
        class: "course__info",
        info: unref(course)
      }, null, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panel/course/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cd658bed"]]);

export { index as default };
//# sourceMappingURL=index-DbIWj8WS.mjs.map
