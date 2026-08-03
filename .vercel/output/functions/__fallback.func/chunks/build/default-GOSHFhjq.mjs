import { _ as __nuxt_component_0$2 } from './Logo-BK56tkzd.mjs';
import { watch, unref, withCtx, createVNode, mergeProps, computed, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderTeleport, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, m as useAuthStore, i as useRoute, a as useRouter, h as __nuxt_component_1$1, f as useI18n } from './server.mjs';
import { u as useTitleStore } from './title-BndfFPR5.mjs';
import { u as useAsideStore } from './aside-Dstl3f0L.mjs';
import { _ as __nuxt_component_0$3 } from './nuxt-link-JVcuMwSA.mjs';
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
import './project-GeJXWS_c.mjs';
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

const _sfc_main$6 = {
  __name: "UiLocale",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale, locales, setLocale, t } = useI18n();
    ref(0);
    const currentLang = computed(
      () => locales.value?.find((item) => item.code === locale.value)
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lang" }, _attrs))} data-v-eb6f073f><div class="lang__wrapper" data-v-eb6f073f><div class="${ssrRenderClass([{ "lang__info--ru": unref(currentLang).code === "ru" }, "lang__info"])}" style="${ssrRenderStyle(unref(currentLang) ? null : { display: "none" })}" data-v-eb6f073f><img class="lang__flag"${ssrRenderAttr("src", unref(currentLang).flag || "Flag")}${ssrRenderAttr("alt", unref(currentLang).name)} data-v-eb6f073f><p class="lang__text" data-v-eb6f073f>${ssrInterpolate(unref(currentLang).name)}</p></div></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Locale.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-eb6f073f"]]);
const dark = "data:image/svg+xml,%3c?xml%20version='1.0'%20?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23fff'%20width='800px'%20height='800px'%20viewBox='0%200%2035%2035'%20data-name='Layer%202'%20id='Layer_2'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z'/%3e%3c/svg%3e";
const light = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%203V4M12%2020V21M4%2012H3M6.31412%206.31412L5.5%205.5M17.6859%206.31412L18.5%205.5M6.31412%2017.69L5.5%2018.5001M17.6859%2017.69L18.5%2018.5001M21%2012H20M16%2012C16%2014.2091%2014.2091%2016%2012%2016C9.79086%2016%208%2014.2091%208%2012C8%209.79086%209.79086%208%2012%208C14.2091%208%2016%209.79086%2016%2012Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const _sfc_main$5 = {
  __name: "UiDarkMode",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = ref("light");
    const isDark = computed(() => theme.value === "dark");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mode" }, _attrs))} data-v-9672b569><div class="${ssrRenderClass([{ "mode__wrapper--dark": unref(isDark) }, "mode__wrapper"])}" data-v-9672b569><div class="mode__circle" data-v-9672b569><img class="mode__icon"${ssrRenderAttr("src", unref(isDark) ? unref(dark) : unref(light))} data-v-9672b569></div></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/DarkMode.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9672b569"]]);
const _sfc_main$4 = {
  __name: "TheHeaderProfile",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const user = computed(() => authStore.getUser || {});
    useRouter();
    ref(null);
    const isOpenDropdown = ref(false);
    const profileList = [
      {
        id: 1,
        name: t("local.profile"),
        icon: "user-i",
        route: "/panel/profile/edit"
      },
      {
        id: 2,
        name: t("local.logout"),
        icon: "logout-i",
        route: "/"
      }
    ];
    const avatarUrl = computed(
      () => user.value?.avatar?.url || user.value?.avatarUrl || ""
    );
    const userInitials = computed(() => {
      const first = user.value?.first_name?.trim()?.[0] || "";
      const name = user.value?.name?.trim();
      if (first) {
        return `${first}`.toUpperCase();
      }
      return name?.[0]?.toUpperCase() || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1$1;
      _push(`<!--[--><div class="profile" data-v-e1027312><div class="profile__wrapper" data-v-e1027312>`);
      if (unref(avatarUrl)) {
        _push(`<img class="profile__avatar"${ssrRenderAttr("src", unref(avatarUrl))}${ssrRenderAttr("alt", unref(user).name || "Пользователь")} data-v-e1027312>`);
      } else {
        _push(`<div class="profile__avatar profile__avatar--default" data-v-e1027312>${ssrInterpolate(unref(userInitials))}</div>`);
      }
      _push(`<div class="profile__user" data-v-e1027312><p class="profile__name" data-v-e1027312>${ssrInterpolate(unref(user).first_name)}</p><p class="profile__name profile__name--mobile" data-v-e1027312>${ssrInterpolate(unref(user).first_name?.trim().split(" ")[0].toUpperCase() || "")}</p><p class="profile__role" data-v-e1027312>${ssrInterpolate(unref(user).role)}</p></div><ul class="profile__list" style="${ssrRenderStyle(unref(isOpenDropdown) ? null : { display: "none" })}" data-v-e1027312><!--[-->`);
      ssrRenderList(profileList, (list) => {
        _push(`<li class="profile__li" data-v-e1027312>`);
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: list.icon,
          size: "size-24"
        }, null, _parent));
        _push(`<p class="profile__li-text" data-v-e1027312>${ssrInterpolate(list.name)}</p></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
      {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/The/Header/Profile.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e1027312"]]);
const _sfc_main$3 = {
  __name: "BaseHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const titleStore = useTitleStore();
    const asideStore = useAsideStore();
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiLogo = __nuxt_component_0$2;
      const _component_UiLocale = __nuxt_component_0$1;
      const _component_UiDarkMode = __nuxt_component_2$1;
      const _component_TheHeaderProfile = __nuxt_component_3;
      const _component_UiIcon = __nuxt_component_1$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-e71b48c0><div class="header__wrapper" data-v-e71b48c0><div class="header__box" data-v-e71b48c0>`);
      _push(ssrRenderComponent(_component_UiLogo, { class: "header__logo" }, null, _parent));
      _push(`<h1 class="${ssrRenderClass([{ "header__title--open": !unref(asideStore)?.isOpen }, "header__title"])}" data-v-e71b48c0>${ssrInterpolate(unref(titleStore).currentTitle)}</h1></div><div class="header__info" data-v-e71b48c0>`);
      _push(ssrRenderComponent(_component_UiLocale, { class: "header__locale" }, null, _parent));
      _push(ssrRenderComponent(_component_UiDarkMode, { class: "header__mode" }, null, _parent));
      _push(ssrRenderComponent(_component_TheHeaderProfile, null, null, _parent));
      _push(ssrRenderComponent(_component_UiIcon, {
        class: "header__hamburger",
        icon: "hamburger-i",
        color: "black",
        size: "size-24",
        onClick: ($event) => unref(asideStore).mobileToggle()
      }, null, _parent));
      _push(`</div></div></header>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e71b48c0"]]);
const _sfc_main$2 = {
  __name: "BaseAside",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const asideStore = useAsideStore();
    const titleStore = useTitleStore();
    const authStore = useAuthStore();
    computed(() => authStore.getUser);
    const { t } = useI18n();
    const navs = computed(() => {
      let showNav = [
        {
          id: 1,
          name: t("local.general"),
          lists: [
            {
              name: t("local.main"),
              route: { path: "/panel" },
              path: "/panel",
              icon: "menu-i"
            },
            {
              name: t("local.courses"),
              route: { path: "/panel/courses" },
              path: "/panel/courses",
              icon: "monitor-i"
            }
          ]
        }
      ];
      return showNav;
    });
    const closeMobileAside = () => {
      asideStore.isMobileOpen = false;
    };
    watch(
      () => route.fullPath,
      () => {
        closeMobileAside();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiLocale = __nuxt_component_0$1;
      const _component_UiIcon = __nuxt_component_1$1;
      const _component_UiDarkMode = __nuxt_component_2$1;
      const _component_nuxt_link = __nuxt_component_0$3;
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["aside", {
          "aside--mobile": unref(asideStore).isMobileOpen,
          "aside--hide": unref(asideStore).isOpen
        }]
      }, _attrs))} data-v-61923abf><div class="aside__wrapper" data-v-61923abf><nav class="aside__nav" data-v-61923abf><ul class="aside__list aside__list--block" data-v-61923abf><li class="${ssrRenderClass([{
        "aside__li--end": !unref(asideStore).isOpen || unref(asideStore).isMobileOpen
      }, "aside__li aside__li--first"])}" data-v-61923abf>`);
      if (!unref(asideStore).isOpen || unref(asideStore).isMobileOpen) {
        _push(ssrRenderComponent(_component_UiLocale, { class: "aside__locale" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-61923abf></div>`);
      _push(ssrRenderComponent(_component_UiIcon, {
        class: "aside__icon",
        icon: unref(asideStore).isOpen ? "hamburger-i" : "chevron",
        color: "black",
        size: "size-24",
        deg: unref(asideStore).isOpen ? "down" : "right",
        onClick: ($event) => unref(asideStore).toggle()
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiDarkMode, { class: "aside__dark aside__dark--mobile" }, null, _parent));
      _push(`</li><!--[-->`);
      ssrRenderList(unref(navs), (list) => {
        _push(`<li class="aside__li" data-v-61923abf><p class="${ssrRenderClass([{
          "aside__name--hide": false
        }, "aside__name"])}" data-v-61923abf>${ssrInterpolate(unref(asideStore).isOpen && !unref(asideStore).isMobileOpen ? "------" : list.name)}</p><ul class="aside__list" data-v-61923abf><!--[-->`);
        ssrRenderList(list.lists, (innerList) => {
          _push(`<li class="${ssrRenderClass([{
            "aside__li--active": innerList.path === unref(titleStore).currentActiveRoute
          }, "aside__li"])}" data-v-61923abf>`);
          _push(ssrRenderComponent(_component_nuxt_link, {
            to: innerList.route,
            class: "aside__link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiIcon, {
                  icon: innerList.icon,
                  size: "size-20",
                  color: innerList.path === unref(titleStore).currentActiveRoute ? "white-fixed" : "black"
                }, null, _parent2, _scopeId));
                _push2(`<p class="${ssrRenderClass([{ "aside__text--hide": unref(asideStore).isOpen }, "aside__text"])}" data-v-61923abf${_scopeId}>${ssrInterpolate(innerList.name)}</p>`);
              } else {
                return [
                  createVNode(_component_UiIcon, {
                    icon: innerList.icon,
                    size: "size-20",
                    color: innerList.path === unref(titleStore).currentActiveRoute ? "white-fixed" : "black"
                  }, null, 8, ["icon", "color"]),
                  createVNode("p", {
                    class: ["aside__text", { "aside__text--hide": unref(asideStore).isOpen }]
                  }, toDisplayString(innerList.name), 3)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></li>`);
      });
      _push(`<!--]--></ul></nav></div></aside>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Base/Aside.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-61923abf"]]);
const _sfc_main$1 = {
  __name: "UiPartialModal",
  __ssrInlineRender: true,
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "75%"
    },
    darkBg: {
      type: Boolean,
      default: true
    },
    title: String
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const partialBlock = ref(null);
    const props = __props;
    watch(
      () => props.isShow,
      (newVal) => {
        if (newVal) {
          setTimeout(() => {
            partialBlock.value?.classList.add("partial--bg");
          }, 250);
        } else {
          partialBlock.value?.classList.remove("partial--bg");
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.isShow) {
          _push2(`<div class="partial" data-v-1f68bebd><div class="partial__wrapper" style="${ssrRenderStyle({ height: __props.height })}" data-v-1f68bebd><span class="partial__line" data-v-1f68bebd></span><div class="partial__content" data-v-1f68bebd>`);
          if (!!__props.title) {
            _push2(`<p class="partial__title" data-v-1f68bebd>${ssrInterpolate(__props.title)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          ssrRenderSlot(_ctx.$slots, "body", {}, null, _push2, _parent);
          _push2(`</div><div class="partial__fixed" data-v-1f68bebd>`);
          ssrRenderSlot(_ctx.$slots, "fixed", {}, null, _push2, _parent);
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/PartialModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1f68bebd"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useTitleStore();
    const asideStore = useAsideStore();
    const authStore = useAuthStore();
    useRoute();
    const router = useRouter();
    watch(
      () => authStore?.isAuth,
      (newVal) => {
        !newVal ? router.push("/") : null;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseHeader = __nuxt_component_0;
      const _component_BaseAside = __nuxt_component_1;
      const _component_UiPartialModal = __nuxt_component_2;
      _push(`<!--[--><div class="layouts" data-v-cc05c09d><div class="layouts__wrapper" data-v-cc05c09d>`);
      _push(ssrRenderComponent(_component_BaseHeader, null, null, _parent));
      _push(`<div class="layouts__content" data-v-cc05c09d>`);
      _push(ssrRenderComponent(_component_BaseAside, {
        class: ["layouts__aside", { "layouts__aside--mobile": unref(asideStore)?.isMobileOpen }]
      }, null, _parent));
      _push(`<main class="layouts__main" data-v-cc05c09d>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div></div>`);
      _push(ssrRenderComponent(_component_UiPartialModal, {
        "is-show": unref(asideStore).isMobileOpen,
        onClose: unref(asideStore).mobileClose
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BaseAside, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BaseAside)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc05c09d"]]);

export { _default as default };
//# sourceMappingURL=default-GOSHFhjq.mjs.map
