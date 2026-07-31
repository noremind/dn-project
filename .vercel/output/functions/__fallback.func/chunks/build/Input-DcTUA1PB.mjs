import { _ as _export_sfc, h as __nuxt_component_1$1 } from './server.mjs';
import { ref, resolveDirective, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';

const _sfc_main = {
  __name: "UiInput",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "text"
    },
    modelValue: [String, Number],
    maska: {
      type: String,
      default: ""
    },
    isEmptyLabel: Boolean,
    label: String,
    placeholder: String,
    beforeIcon: String,
    afterIcon: String,
    iconSize: String,
    iconColor: {
      type: String,
      default: () => ""
    },
    customClass: String,
    isCenter: Boolean,
    isError: Boolean,
    name: String,
    disabled: Boolean,
    maxLength: {
      type: Number,
      default: 254
    }
  },
  setup(__props) {
    const props = __props;
    const typeInput = ref(props.type);
    const changeType = () => {
      typeInput.value = typeInput.value === "password" ? "text" : "password";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiIcon = __nuxt_component_1$1;
      const _directive_maska = resolveDirective("maska");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "input" }, _attrs))} data-v-228227c2>`);
      if (__props.label || __props.isEmptyLabel) {
        _push(`<label${ssrRenderAttr("for", __props.name)} class="${ssrRenderClass([{ "input__label--empty": __props.isEmptyLabel }, "input__label"])}" data-v-228227c2>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([(__props.customClass, { "input__field--error": __props.isError }), "input__wrapper"])}" data-v-228227c2>`);
      if (__props.beforeIcon) {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: __props.beforeIcon,
          color: __props.iconColor,
          size: __props.iconSize
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttrs(mergeProps({
        class: ["input__field", {
          "input__field--center": __props.isCenter,
          "input__field--disabled": __props.disabled
        }],
        type: unref(typeInput),
        name: __props.name,
        value: __props.modelValue,
        placeholder: __props.placeholder,
        disabled: __props.disabled,
        id: __props.name,
        "data-maska": __props.maska,
        maxlength: __props.maxLength
      }, ssrGetDirectiveProps(_ctx, _directive_maska)))} data-v-228227c2>`);
      if (__props.afterIcon) {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: __props.afterIcon,
          color: __props.iconColor,
          size: __props.iconSize
        }, null, _parent));
      } else if (__props.type === "password") {
        _push(ssrRenderComponent(_component_UiIcon, {
          icon: unref(typeInput) === "password" ? "eye-close-i" : "eye-i",
          onClick: changeType,
          color: __props.iconColor,
          size: __props.iconSize
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/Input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-228227c2"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Input-DcTUA1PB.mjs.map
