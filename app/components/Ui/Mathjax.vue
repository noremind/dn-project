<template>
  <client-only>
    <VueMathjax
      v-if="loaded"
      :formula="formula"
      :options="options"
      :safe="false"
    />
    <p v-else class="laoding-dots"></p>
  </client-only>
</template>

<script setup>
import VueMathjax from "vue-mathjax-next";

const props = defineProps({
  formula: String,
});

const loaded = ref(false);

const options = {
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
};

onMounted(() => {
  if (!window.MathJax) {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML";
    script.async = true;
    script.onload = () => {
      loaded.value = true;
    };
    document.head.appendChild(script);
  } else {
    loaded.value = true;
  }
});
</script>
