<template>
  <div class="timer">
    <div class="timer__wrapper">
      <p class="timer__text">{{ t("local.expired_at") }}</p>
      <p class="timer__time">
        {{ formattedTime }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  timer: String,
});

const emit = defineEmits(["time-up"]);

const remaining = ref(0);
const interval = ref(null);

const formattedTime = computed(() => {
  if (!remaining.value || remaining.value <= 0) return "00:00:00";
  const hours = Math.floor(remaining.value / 3600);
  const minutes = Math.floor((remaining.value % 3600) / 60);
  const seconds = remaining.value % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
});

const startTimer = (endTime) => {
  if (process.client) {
    if (interval.value) {
      clearInterval(interval.value);
    }

    const updateTime = () => {
      const now = Date.now();
      const diff = Math.floor((endTime - now) / 1000);
      remaining.value = diff > 0 ? diff : 0;

      if (diff <= 0) {
        clearInterval(interval.value);
        emit("time-up");
      }
    };

    updateTime();
    interval.value = setInterval(updateTime, 1000);
  }
};

watch(
  () => props.timer,
  (newVal) => {
    if (newVal) {
      const endTime = new Date(newVal).getTime();
      startTimer(endTime);
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});
</script>

<style lang="scss" scoped>
.timer {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xs;
    border: 1px solid var(--surface-200);
    border-radius: $border-r-md;
    padding: $padding-md;
    width: 100%;
  }
  &__text {
    color: var(--surface-600);
    font-size: 16px;
  }
  &__time {
    font-weight: 600;
    font-size: 20px;
  }
}
</style>
