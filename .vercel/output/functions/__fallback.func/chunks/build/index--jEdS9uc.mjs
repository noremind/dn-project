import { _ as __nuxt_component_0 } from './Tabs-DG-HPcjN.mjs';
import { _ as __nuxt_component_0$1, a as __nuxt_component_2$1 } from './ProgressBar-Cr5RjvE8.mjs';
import { _ as _export_sfc, f as useI18n, i as useRoute, j as useApi, a as useRouter, h as __nuxt_component_1$1 } from './server.mjs';
import { computed, ref, watch, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { u as useAsideStore } from './aside-Dstl3f0L.mjs';
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

function formatDigits(price) {
  let amountStr = Math.floor(price).toString();
  return amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const _sfc_main$3 = {
  __name: "TheCoursesCard",
  __ssrInlineRender: true,
  props: {
    info: Object
  },
  setup(__props) {
    const { t } = useI18n();
    useRouter();
    const props = __props;
    const infos = computed(() => [
      {
        id: 1,
        icon: "module-i",
        text: `${props.info.modules_count} ${props.info.modules_count === 1 ? t("local.module").toLocaleLowerCase() : t("local.modules").toLocaleLowerCase()}`,
        show: props.info.modules_count > 0
      },
      {
        id: 2,
        icon: "circle-i",
        text: `${props.info.lessons_count} ${props.info.lessons_count === 1 ? t("local.lesson").toLocaleLowerCase() : t("local.lessons").toLocaleLowerCase()}`,
        show: props.info.lessons_count > 0
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiNoImage = __nuxt_component_0$1;
      const _component_UiIcon = __nuxt_component_1$1;
      const _component_UiProgressBar = __nuxt_component_2$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-2aeb3137><div class="card__wrapper" data-v-2aeb3137>`);
      if (__props.info.image) {
        _push(`<img class="card__preview"${ssrRenderAttr("src", __props.info.image)} alt="Preview" data-v-2aeb3137>`);
      } else {
        _push(ssrRenderComponent(_component_UiNoImage, {
          class: "card__no-image",
          "border-radius": "none"
        }, null, _parent));
      }
      _push(`<div class="card__content" data-v-2aeb3137><div class="card__content-top" data-v-2aeb3137><h3 class="card__title title-sm" data-v-2aeb3137>${ssrInterpolate(__props.info.name)}</h3>`);
      _push(ssrRenderComponent(_component_UiIcon, {
        class: "card__icon",
        icon: "chevron",
        size: "size-20",
        deg: "right"
      }, null, _parent));
      _push(`</div>`);
      if (__props.info.description) {
        _push(`<p class="card__description" data-v-2aeb3137>${ssrInterpolate(__props.info.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card__info" data-v-2aeb3137><!--[-->`);
      ssrRenderList(unref(infos), (item, index2) => {
        _push(`<div class="card__box" style="${ssrRenderStyle(item.show ? null : { display: "none" })}" data-v-2aeb3137>`);
        if (index2 === 1) {
          _push(`<p class="card__point" data-v-2aeb3137>·</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: item.icon,
          size: "size-16"
        }, null, _parent));
        _push(`<p class="card__info-text" data-v-2aeb3137>${ssrInterpolate(item.text)}</p></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UiProgressBar, {
        percent: __props.info.user_progress?.progress || 0
      }, null, _parent));
      _push(`<div class="card__footer" data-v-2aeb3137><p class="card__price" data-v-2aeb3137>${ssrInterpolate(("formatDigits" in _ctx ? _ctx.formatDigits : unref(formatDigits))(1e4))} ₸</p></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Courses/Card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2aeb3137"]]);
const _sfc_main$2 = {
  __name: "UiStatusRequest",
  __ssrInlineRender: true,
  props: {
    status: {
      type: [String, null],
      default: null
    }
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "status" }, _attrs))} data-v-412f6045><div class="status__wrapper" data-v-412f6045>`);
      if (__props.status === "pending") {
        _push(`<p class="${ssrRenderClass([{ "status__info--pending": __props.status === "pending" }, "status__info loading-dots"])}" data-v-412f6045>${ssrInterpolate(unref(t)("local.loading"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.status === "empty") {
        _push(`<p class="${ssrRenderClass([{ "status__info--pending": __props.status === "empty" }, "status__info"])}" data-v-412f6045>${ssrInterpolate(unref(t)("local.still_empty"))}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/StatusRequest.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-412f6045"]]);
const _sfc_main$1 = {
  __name: "UiPagination",
  __ssrInlineRender: true,
  props: {
    total: Number,
    modelValue: Number,
    position: {
      type: String,
      default: "center"
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const router = useRouter();
    const route = useRoute();
    const emit = __emit;
    const props = __props;
    const setPagination = (num) => {
      emit("update:modelValue", num);
      router.push({ path: route.path, query: { ...route.query, page: num } });
    };
    const visiblePages = computed(() => {
      const total = props.total;
      const current = props.modelValue;
      const maxVisible = 7;
      if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }
      if (current <= 4) {
        return [1, 2, 3, 4, "...", total - 2, total - 1, total];
      }
      if (current >= total - 3) {
        return [1, 2, 3, "...", total - 3, total - 2, total - 1, total];
      }
      return [
        current - 2,
        current - 1,
        current,
        "...",
        total - 2,
        total - 1,
        total
      ];
    });
    setPagination(props.modelValue);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pagination" }, _attrs))} data-v-be3cc5b7><div class="${ssrRenderClass([{ "pagination__wrapper--center": __props.position === "center" }, "pagination__wrapper"])}" data-v-be3cc5b7>`);
      if (__props.modelValue > 1) {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: "chevron",
          class: "pagination__icon",
          hover: true,
          onClick: ($event) => setPagination(__props.modelValue - 1)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pagination__numbers" data-v-be3cc5b7><!--[-->`);
      ssrRenderList(unref(visiblePages), (num, idx) => {
        _push(`<p class="${ssrRenderClass([{ "pagination__number--active": num === __props.modelValue }, "pagination__number"])}" data-v-be3cc5b7>${ssrInterpolate(num)}</p>`);
      });
      _push(`<!--]--></div>`);
      if (__props.modelValue < __props.total) {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: "chevron",
          class: "pagination__icon",
          deg: "down",
          hover: true,
          onClick: ($event) => setPagination(__props.modelValue + 1)
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-be3cc5b7"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const asideStore = useAsideStore();
    const route = useRoute();
    const tabs = computed(() => [
      {
        id: 1,
        name: t("local.all_courses")
      },
      {
        id: 2,
        name: t("local.my_courses")
      }
    ]);
    const oneTab = ref(tabs.value[0]);
    useSeo({
      title: t("local.courses"),
      description: t("local.courses")
    });
    const courses = ref(null);
    const pagination = ref(null);
    const currentPage = ref(+route.query?.page || 1);
    const status = ref(null);
    const getCourses = async () => {
      courses.value = null;
      status.value = "pending";
      await useApi().ssr({
        url: "/courses",
        method: "get",
        query: {
          per_page: 12,
          page: currentPage.value
        }
      }).then((res) => {
        courses.value = res.data;
        pagination.value = res.meta;
        courses.value?.length ? status.value = "completed" : "empty";
      }).catch(() => {
        status.value = "error";
      });
    };
    getCourses();
    const getAuthProfileCourses = async () => {
      courses.value = null;
      status.value = "pending";
      await useApi().client({
        url: "/auth/profile/courses",
        method: "get",
        query: {
          per_page: 12,
          page: currentPage.value
        }
      }).then((res) => {
        courses.value = res.data;
        pagination.value = res.meta;
        courses.value?.length ? status.value = "completed" : "empty";
      }).catch(() => {
        status.value = "error";
      });
    };
    watch(
      () => oneTab.value,
      (newVal) => {
        if (newVal.id === 1) {
          getCourses();
        }
        if (newVal.id === 2) {
          getAuthProfileCourses();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiTabs = __nuxt_component_0;
      const _component_TheCoursesCard = __nuxt_component_1;
      const _component_UiStatusRequest = __nuxt_component_2;
      const _component_UiPagination = __nuxt_component_3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "courses" }, _attrs))} data-v-14d029c6><div class="courses__wrapper" data-v-14d029c6><h2 class="courses__title hidden" data-v-14d029c6>${ssrInterpolate(unref(t)("local.courses"))}</h2>`);
      _push(ssrRenderComponent(_component_UiTabs, {
        tabs: unref(tabs),
        modelValue: unref(oneTab),
        "onUpdate:modelValue": ($event) => isRef(oneTab) ? oneTab.value = $event : null,
        type: "line-border"
      }, null, _parent));
      if (unref(courses)?.length) {
        _push(`<div${ssrRenderAttrs({
          name: "card-list",
          class: ["courses__cards", { "courses__cards--aside": unref(asideStore).isOpen }]
        })} data-v-14d029c6>`);
        ssrRenderList(unref(courses), (course) => {
          _push(ssrRenderComponent(_component_TheCoursesCard, {
            key: course.id,
            info: course
          }, null, _parent));
        });
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!!unref(status)) {
        _push(ssrRenderComponent(_component_UiStatusRequest, { status: unref(status) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!!unref(pagination) && unref(pagination)?.last_page !== 1) {
        _push(ssrRenderComponent(_component_UiPagination, {
          modelValue: unref(currentPage),
          "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
          total: unref(pagination)?.total
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panel/courses/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-14d029c6"]]);

export { index as default };
//# sourceMappingURL=index--jEdS9uc.mjs.map
