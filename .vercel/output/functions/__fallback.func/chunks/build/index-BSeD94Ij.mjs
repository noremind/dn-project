import { _ as __nuxt_component_1 } from './Input-DcTUA1PB.mjs';
import { _ as __nuxt_component_2 } from './Button-BBNNwGkn.mjs';
import { computed, ref, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useTitleStore } from './title-BndfFPR5.mjs';
import { _ as _export_sfc, f as useI18n, m as useAuthStore, j as useApi } from './server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const titleStore = useTitleStore();
    const authStore = useAuthStore();
    const user = computed(() => authStore.getUser);
    titleStore.setTitle(t("local.profile"));
    useSeo({
      title: t("local.edit_profile")
    });
    const useProfileField = (key) => {
      const draft = ref();
      return computed({
        get: () => draft.value !== void 0 ? draft.value : user.value?.[key] || null,
        set: (value) => {
          draft.value = value;
        }
      });
    };
    const firstName = useProfileField("first_name");
    const secondName = useProfileField("second_name");
    const email = useProfileField("email");
    const birthDate = useProfileField("birthday");
    const phone = useProfileField("phone");
    const isLoading = ref(false);
    const disabled = computed(() => {
      if (!!firstName.value && !!secondName.value && email.value?.includes("@")) {
        return false;
      }
      return true;
    });
    const putAuthProfileUpdate = () => {
      isLoading.value = true;
      useApi().client({
        url: "/auth/profile/update",
        method: "put",
        body: {
          first_name: firstName.value,
          second_name: secondName.value,
          email: email.value,
          phone: phone.value?.replace(/\D/g, ""),
          birthday: birthDate.value
        }
      }).then(async (res) => {
        isLoading.value = true;
        await authStore.setUser();
        isLoading.value = false;
        useNotify({
          title: t("local.success"),
          text: t("local.profile_has_been_successfully_updated"),
          status: "success"
        });
      }).catch((error) => {
        useNotify({
          title: t("local.oops"),
          text: error,
          status: "error"
        });
      }).finally(() => {
        isLoading.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = __nuxt_component_1;
      const _component_UiButton = __nuxt_component_2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "edit" }, _attrs))} data-v-51d45fb0><div class="edit__wrapper" data-v-51d45fb0><h2 class="edit__title" data-v-51d45fb0>${ssrInterpolate(unref(t)("local.edit_profile"))}</h2><div class="edit__form" data-v-51d45fb0><div class="edit__top" data-v-51d45fb0><div class="edit__avatar" data-v-51d45fb0>${ssrInterpolate(unref(firstName)?.trim().split("")?.[0].toUpperCase() || "")}</div><p class="edit__name" data-v-51d45fb0>${ssrInterpolate(unref(firstName))}</p></div><div class="edit__box" data-v-51d45fb0>`);
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(firstName),
        "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
        label: unref(t)("local.first_name")
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(secondName),
        "onUpdate:modelValue": ($event) => isRef(secondName) ? secondName.value = $event : null,
        label: unref(t)("local.second_name")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(email),
        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
        label: unref(t)("local.email")
      }, null, _parent));
      _push(`<div class="edit__box" data-v-51d45fb0>`);
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(birthDate),
        "onUpdate:modelValue": ($event) => isRef(birthDate) ? birthDate.value = $event : null,
        label: unref(t)("local.birth_date"),
        placeholder: "dd-mm-yyyy",
        maska: "##-##-####"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        modelValue: unref(phone),
        "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
        label: unref(t)("local.phone_number"),
        placeholder: "+7 (_ _ _) - _ _ _ - _ _ - _ _",
        maska: "+7 (###) ### ## ##"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        label: unref(t)("local.send"),
        class: "edit__btn primary-btn",
        onAction: putAuthProfileUpdate,
        disabled: unref(disabled),
        "is-loading": unref(isLoading)
      }, null, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panel/profile/edit/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51d45fb0"]]);

export { index as default };
//# sourceMappingURL=index-BSeD94Ij.mjs.map
