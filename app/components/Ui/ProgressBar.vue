<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="safePercent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress-bar__track">
      <div
        class="progress-bar__fill"
        :style="{
          width: `${safePercent}%`,
          '--progress-bar-fill-opacity': fillOpacity,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  percent: {
    type: Number,
    default: 0,
  },
});

const safePercent = computed(() => {
  if (props.percent < 0) return 0;
  if (props.percent > 100) return 100;

  return props.percent;
});

const fillOpacity = computed(() => {
  const minOpacity = 0.28;
  const maxOpacity = 1;

  return minOpacity + (safePercent.value / 100) * (maxOpacity - minOpacity);
});
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;

  &__track {
    width: 100%;
    height: 10px;
    overflow: hidden;
    border-radius: 999px;
    background-color: rgba($primary-color, 0.14);
  }

  &__fill {
    height: 100%;
    border-radius: inherit;
    background-color: rgba($primary-color, var(--progress-bar-fill-opacity));
    transition:
      width 0.3s ease,
      background-color 0.3s ease;
  }
}
</style>
