import { _ as _export_sfc, h as __nuxt_component_1 } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "UiTabs",
  __ssrInlineRender: true,
  props: {
    tabs: Array,
    modelValue: Object,
    isScroll: Boolean,
    type: String
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tabs" }, _attrs))} data-v-f9a30490><div class="${ssrRenderClass([{
        "tabs__wrapper--scroll": __props.isScroll,
        "tabs__wrapper--line": __props.type === "line",
        "tabs__wrapper--line-border": __props.type === "line-border"
      }, "tabs__wrapper"])}" data-v-f9a30490><!--[-->`);
      ssrRenderList(__props.tabs, (tab) => {
        _push(`<button type="button" class="${ssrRenderClass([{
          "tabs__btn--active": tab?.id === __props.modelValue?.id,
          "tabs__btn--line": __props.type === "line",
          "tabs__btn--line-border": __props.type === "line-border"
        }, "tabs__btn"])}" data-v-f9a30490>`);
        if (tab.icon) {
          _push(ssrRenderComponent(_component_UiIcon, {
            icon: tab.icon,
            size: "size-24",
            color: tab?.id === __props.modelValue?.id ? "white" : ""
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="tabs__label" data-v-f9a30490>${ssrInterpolate(tab.name)}</span>`);
        if (tab.count !== void 0 && tab.count !== null) {
          _push(`<span class="tabs__count" data-v-f9a30490>${ssrInterpolate(tab.count)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Tabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f9a30490"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Tabs-DG-HPcjN.mjs.map
