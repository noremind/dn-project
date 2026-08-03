import { _ as __nuxt_component_0 } from './Logo-BK56tkzd.mjs';
import { _ as __nuxt_component_1 } from './Input-DcTUA1PB.mjs';
import { _ as __nuxt_component_2 } from './Button-BBNNwGkn.mjs';
import { ref, watch, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, f as useI18n, m as useAuthStore, j as useApi } from './server.mjs';
import { u as useSeo } from './useSeo-C1p0zVML.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    useSeo({
      title: t("local.login")
    });
    const email = ref(null);
    const password = ref(null);
    const errorMessage = ref(null);
    const isLoading = ref(false);
    const postAuthLogin = async () => {
      isLoading.value = true;
      await useApi().client({
        url: "auth/login",
        method: "post",
        body: { email: email.value, password: password.value },
        isLoading: false
      }).then(async (res) => {
        await authStore.setToken(res.token, "/panel");
      }).catch((error) => {
        errorMessage.value = error._data.message;
      }).finally(() => {
        isLoading.value = false;
      });
    };
    watch(
      () => email.value,
      () => {
        errorMessage.value = null;
      }
    );
    watch(
      () => password.value,
      () => {
        errorMessage.value = null;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiLogo = __nuxt_component_0;
      const _component_UiInput = __nuxt_component_1;
      const _component_UiButton = __nuxt_component_2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "login" }, _attrs))} data-v-33e9f44b><div class="login__wrapper" data-v-33e9f44b>`);
      _push(ssrRenderComponent(_component_UiLogo, { class: "login__logo" }, null, _parent));
      _push(`<h1 class="login__title" data-v-33e9f44b>${ssrInterpolate(unref(t)("local.login"))}</h1>`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: unref(t)("local.email"),
        placeholder: "example@test.com",
        name: "tel",
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        "max-length": 255,
        "is-error": !!unref(errorMessage),
        onKeyup: postAuthLogin
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: unref(t)("local.password"),
        placeholder: "",
        name: "password",
        type: "password",
        modelValue: unref(password),
        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
        "icon-size": "size-20",
        "max-length": 255,
        "is-error": !!unref(errorMessage),
        onKeyup: postAuthLogin
      }, null, _parent));
      _push(`<p class="login__error" data-v-33e9f44b>${ssrInterpolate(unref(errorMessage))}</p><div class="login__box" data-v-33e9f44b>`);
      _push(ssrRenderComponent(_component_UiButton, {
        label: unref(t)("local.enter"),
        class: "login__btn primary-btn",
        "is-loading": unref(isLoading),
        onAction: postAuthLogin
      }, null, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-33e9f44b"]]);

export { index as default };
//# sourceMappingURL=index-702m5HQs.mjs.map
