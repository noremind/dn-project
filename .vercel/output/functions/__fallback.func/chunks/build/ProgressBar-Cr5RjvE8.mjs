import { mergeProps, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { _ as _export_sfc } from './server.mjs';

const _imports_0 = publicAssetsURL("/assets/images/content/no-image.png");
const _sfc_main$1 = {
  __name: "UiNoImage",
  __ssrInlineRender: true,
  props: {
    borderRadius: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["load", { "load--borderless": __props.borderRadius === "none" }]
      }, _attrs))} data-v-814c7b5f><div class="load__wrapper" data-v-814c7b5f><img class="load__image"${ssrRenderAttr("src", _imports_0)} alt="No Image" data-v-814c7b5f></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/NoImage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-814c7b5f"]]);
const _sfc_main = {
  __name: "UiProgressBar",
  __ssrInlineRender: true,
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const safePercent = computed(() => {
      if (props.percent < 0) return 0;
      if (props.percent > 100) return 100;
      return props.percent;
    });
    const fillOpacity = computed(() => {
      const minOpacity = 0.28;
      const maxOpacity = 1;
      return minOpacity + safePercent.value / 100 * (maxOpacity - minOpacity);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "progress-bar",
        role: "progressbar",
        "aria-valuenow": unref(safePercent),
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, _attrs))} data-v-d29d263e><div class="progress-bar__track" data-v-d29d263e><div class="progress-bar__fill" style="${ssrRenderStyle({
        width: `${unref(safePercent)}%`,
        "--progress-bar-fill-opacity": unref(fillOpacity)
      })}" data-v-d29d263e></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Ui/ProgressBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d29d263e"]]);

export { __nuxt_component_0 as _, __nuxt_component_2 as a };
//# sourceMappingURL=ProgressBar-Cr5RjvE8.mjs.map
