import { _ as __nuxt_component_0$3 } from './nuxt-link-JVcuMwSA.mjs';
import { _ as _export_sfc, f as useI18n, a as useRouter, i as useRoute, j as useApi, h as __nuxt_component_1, b as useNuxtApp, c as useRuntimeConfig } from './server.mjs';
import { ref, computed, withAsyncContext, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './Tabs-DG-HPcjN.mjs';
import { _ as __nuxt_component_0$2 } from './Logo-BK56tkzd.mjs';
import { _ as __nuxt_component_2$1 } from './Button-BBNNwGkn.mjs';
import { u as useTitleStore } from './title-BndfFPR5.mjs';
import { u as useSeo } from './useSeo-C1p0zVML.mjs';
import { u as useNotify } from './useNotify-Zw0dZA8p.mjs';
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
  __name: "UiBreadcrumb",
  __ssrInlineRender: true,
  props: {
    info: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$3;
      const _component_UiIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "breadcrumb" }, _attrs))} data-v-5b82c3e3><div class="breadcrumb__wrapper" data-v-5b82c3e3><ul class="breadcrumb__ul" data-v-5b82c3e3><!--[-->`);
      ssrRenderList(__props.info, (item, index2) => {
        _push(`<li class="breadcrumb__li" data-v-5b82c3e3>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: item?.route,
          class: ["breadcrumb__link", { "breadcrumb__link--hover": item?.route }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="breadcrumb__text" data-v-5b82c3e3${_scopeId}>${ssrInterpolate(item.name)}</p>`);
              if (index2 + 1 !== __props.info.length) {
                _push2(ssrRenderComponent(_component_UiIcon, {
                  class: "breadcrumb__icon",
                  icon: "chevron",
                  size: "size-12",
                  deg: "right"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("p", { class: "breadcrumb__text" }, toDisplayString(item.name), 1),
                index2 + 1 !== __props.info.length ? (openBlock(), createBlock(_component_UiIcon, {
                  key: 0,
                  class: "breadcrumb__icon",
                  icon: "chevron",
                  size: "size-12",
                  deg: "right"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Breadcrumb.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5b82c3e3"]]);
const _sfc_main$1 = {
  __name: "UiPlayer",
  __ssrInlineRender: true,
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const { $plyr } = useNuxtApp();
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "player" }, _attrs))} data-v-9cf20549><div class="player__wrapper" data-v-9cf20549><div class="player__video" data-plyr-provider="youtube"${ssrRenderAttr("data-plyr-embed-id", __props.videoId)} data-v-9cf20549></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Player.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9cf20549"]]);
async function useExportToPdf(id, name) {
  const { $html2pdf } = useNuxtApp();
  const element = (void 0).getElementById(id);
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `${name}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: { mode: ["css", "legacy"] }
  };
  await $html2pdf().set(opt).from(element).save();
}
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
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
        route: "/panel/courses"
      },
      {
        name: lesson.value?.course.name,
        route: `/panel/course/${lesson.value?.course.slug}`
      },
      {
        name: lesson.value?.name
      }
    ]);
    const tabsVideo = ref([]);
    const oneTabVideo = ref(null);
    [__temp, __restore] = withAsyncContext(() => useApi().ssr({ url: `/lessons/${route.params.slug}`, method: "get" }).then((res) => {
      lesson.value = res.data;
      lesson.value.lesson_videos?.length ? lesson.value.lesson_videos.forEach(
        (item) => tabsVideo.value?.push({
          id: item.id,
          name: item.title,
          url: item.url
        })
      ) : null;
      oneTabVideo.value = tabsVideo.value?.[0] || null;
    })), await __temp, __restore();
    titleStore.setTitle(lesson.value?.course.name, "/panel/courses");
    useSeo({
      title: `${lesson.value.course.name} > ${lesson.value.name}`
    });
    const downloadContectus = async () => {
      isConverting.value = true;
      await useExportToPdf(
        "conspectus",
        `${config.public.projectName} - ${lesson.value.course.name} > ${lesson.value.name}`
      );
      isConverting.value = false;
    };
    const redirectToTest = (test) => {
      router.push(`/panel/lesson/test/${test.id}?lesson_id=${lesson.value.id}`);
    };
    const redirectToNextLesson = async () => {
      const passedTests = lesson.value?.lesson_tests?.filter((test) => test?.passed);
      const hasPassedCurrentTest = Boolean(passedTests?.length);
      if (!hasPassedCurrentTest) {
        useNotify({
          title: t("local.error"),
          text: t("local.first_need_to_take_the_test"),
          status: "error"
        });
        return;
      }
      isLoading.value = true;
      try {
        await useApi().client({
          url: `/lessons/${lesson.value.slug}/finish`,
          method: "post"
        });
        await router.push(`/panel/lesson/${lesson.value.next}`);
      } catch (error) {
        useNotify({
          title: t("local.error"),
          text: error?.data?.message || error?.message || t("local.something_went_wrong"),
          status: "error"
        });
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiBreadcrumb = __nuxt_component_0;
      const _component_UiTabs = __nuxt_component_0$1;
      const _component_UiPlayer = __nuxt_component_2;
      const _component_UiLogo = __nuxt_component_0$2;
      const _component_UiButton = __nuxt_component_2$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "lesson" }, _attrs))} data-v-3f4cf132><div class="lesson__wrapper" data-v-3f4cf132>`);
      if (unref(lesson)) {
        _push(ssrRenderComponent(_component_UiBreadcrumb, { info: unref(breadcrumb) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h2 class="lesson__title" data-v-3f4cf132>${ssrInterpolate(unref(lesson).name)}</h2>`);
      if (unref(tabsVideo)?.length > 1) {
        _push(ssrRenderComponent(_component_UiTabs, {
          tabs: unref(tabsVideo),
          modelValue: unref(oneTabVideo),
          "onUpdate:modelValue": ($event) => isRef(oneTabVideo) ? oneTabVideo.value = $event : null,
          type: "line"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UiPlayer, {
        class: "lesson__player",
        "video-id": "https://youtu.be/Y_8mUx4VOmo?si=SUNB4RcpiFklyPJN"
      }, null, _parent));
      _push(`<div class="lesson__materials" data-v-3f4cf132><p class="lesson__text" data-v-3f4cf132>${ssrInterpolate(unref(t)("local.materials"))}:</p>`);
      if (unref(isConverting)) {
        _push(ssrRenderComponent(_component_UiLogo, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div id="conspectus" class="lesson__conspectus" data-v-3f4cf132>${unref(lesson).content ?? ""}</div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        class: "secondary-btn",
        label: unref(t)("local.download_conspectus"),
        "before-icon": "download-i",
        "icon-size": "size-20",
        "icon-color": "primary-color",
        onAction: downloadContectus,
        "is-loading": unref(isConverting)
      }, null, _parent));
      _push(`</div><div class="lesson__btns" data-v-3f4cf132><div class="lesson__btns-box" data-v-3f4cf132><!--[-->`);
      ssrRenderList(unref(lesson).lesson_tests, (test) => {
        _push(ssrRenderComponent(_component_UiButton, {
          key: test.id,
          class: "primary-btn primary-btn--green",
          label: `${unref(t)("local.take_test")}(${test.title})`,
          onAction: ($event) => redirectToTest(test)
        }, null, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_UiButton, {
        class: "primary-btn",
        label: unref(t)("local.next_lesson"),
        "after-icon": "chevron",
        "icon-size": "size-20",
        "icon-deg": "right",
        onAction: redirectToNextLesson,
        "is-loading": unref(isLoading)
      }, null, _parent));
      _push(`</div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panel/lesson/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f4cf132"]]);

export { index as default };
//# sourceMappingURL=index-BYXy9G3-.mjs.map
