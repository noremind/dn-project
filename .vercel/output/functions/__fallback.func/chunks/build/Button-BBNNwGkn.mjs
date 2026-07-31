import { _ as _export_sfc, a as useRouter, h as __nuxt_component_1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-JVcuMwSA.mjs';
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "UiButton",
  __ssrInlineRender: true,
  props: {
    label: String,
    beforeIcon: String,
    afterIcon: String,
    iconSize: String,
    iconColor: String,
    iconDeg: String,
    disabled: Boolean,
    isLoading: Boolean,
    href: String,
    color: String,
    type: {
      type: String,
      default: "button"
    },
    tag: {
      type: String,
      default: "button"
    }
  },
  emits: ["action"],
  setup(__props, { emit: __emit }) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1;
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["button", {
          disabled: __props.disabled,
          loading: __props.isLoading
        }]
      }, _attrs))} data-v-a43bf991>`);
      if (__props.beforeIcon && !(__props.disabled || __props.isLoading)) {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: __props.beforeIcon,
          color: __props.iconColor,
          size: __props.iconSize,
          deg: __props.iconDeg
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.tag === "button") {
        _push(`<button${ssrIncludeBooleanAttr(__props.disabled || __props.isLoading) ? " disabled" : ""}${ssrRenderAttr("type", __props.type)} class="${ssrRenderClass([[__props.color], "button__btn"])}" data-v-a43bf991>${ssrInterpolate(__props.label)}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.tag === "a") {
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: ["button__btn", [__props.color]],
          to: __props.href,
          disabled: __props.disabled || __props.isLoading
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.label), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.afterIcon && !(__props.disabled || __props.isLoading)) {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: __props.afterIcon,
          color: __props.iconColor,
          size: __props.iconSize,
          deg: __props.iconDeg
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a43bf991"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=Button-BBNNwGkn.mjs.map
