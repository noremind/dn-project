<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="safePercent"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress-bar__header">
      <span class="progress-bar__label">{{ t("local.progress") }}</span>
      <span class="progress-bar__percent">{{ displayPercent }}</span>
    </div>

    <div class="progress-bar__track">
      <div
        class="progress-bar__fill"
        :style="{
          width: `${safePercent}%`,
          '--progress-bar-fill-opacity': fillOpacity,
          '--progress-bar-color': progressColor,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  percent: {
    type: Number,
    default: 0,
  },
  tone: {
    type: String,
    default: "primary",
  },
});

const safePercent = computed(() => {
  if (props.percent < 0) return 0;
  if (props.percent > 100) return 100;

  return props.percent;
});

const displayPercent = computed(() => `${Math.round(safePercent.value)}%`);

const fillOpacity = computed(() => {
  const minOpacity = 0.28;
  const maxOpacity = 1;

  return minOpacity + (safePercent.value / 100) * (maxOpacity - minOpacity);
});

const progressColor = computed(() =>
  props.tone === "success" ? "#4db988" : "#f5ac35",
);
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $gap-sm;
    margin-bottom: 6px;
  }

  &__label {
    font-size: 11px;
    font-weight: 500;
    color: var(--surface-400);
    line-height: 1;
  }

  &__percent {
    color: var(--surface-600);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
  }

  &__track {
    width: 100%;
    height: 8px;
    overflow: hidden;
    padding: 1px;
    border: 1px solid var(--surface-250);
    border-radius: 4px;
    background-color: var(--surface-150);
  }

  &__fill {
    height: 100%;
    min-width: 0;
    border-radius: 2px;
    background: repeating-linear-gradient(
      90deg,
      var(--progress-bar-color) 0,
      var(--progress-bar-color) calc(33.333% - 3px),
      transparent calc(33.333% - 3px),
      transparent 33.333%
    );
    opacity: var(--progress-bar-fill-opacity);
    transition:
      width 0.3s ease,
      opacity 0.3s ease;
  }
}
</style>
