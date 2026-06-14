<template>
  <teleport to="body">
    <transition name="partial">
      <div
        class="partial"
        v-if="isShow"
        ref="partialBlock"
        @click="closePartial($event)"
      >
        <div class="partial__wrapper" :style="{ height: height }">
          <span class="partial__line" @click="emit('close')"></span>

          <div class="partial__content">
            <p v-if="!!title" class="partial__title">{{ title }}</p>
            <slot name="body"></slot>
          </div>

          <div class="partial__fixed">
            <slot name="fixed"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
const partialBlock = ref(null);
const emit = defineEmits(["close"]);
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "75%",
  },
  darkBg: {
    type: Boolean,
    default: true,
  },
  title: String,
});

const closePartial = (event) => {
  if (event?.target && event?.target.classList[0] === "partial") {
    emit("close");
  }
};

onMounted(() => {});

watch(
  () => props.isShow,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        partialBlock.value?.classList.add("partial--bg");
      }, 250);
    } else {
      partialBlock.value?.classList.remove("partial--bg");
    }
  },
  { immediate: true },
);

// onMounted(() => {
//   if (partialBlock.value) {
//     document.body.style.overflow = "hidden";
//   }
// });

// onUnmounted(() => {
//   partialBlock.value = null;
// });

// watch(
//   () => partialBlock.value,
//   () => {
//     if (process.client) {
//       document.body.style.overflow = "hidden";
//     }
//   },
//   { immediate: true }
// );
</script>

<style lang="scss" scoped>
.partial {
  display: none;
  position: relative;
}
.partial:hover body {
  overflow: hidden;
}
.partial-enter-active {
  animation: partial 0.3s;
}
.partial-leave-active {
  animation: partial 0.3s reverse;
}

@keyframes partial {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}

.partial {
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  overflow: clip;

  &--bg {
    transition: 0.25s;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &--transparent {
    background-color: transparent;
  }

  &__wrapper {
    box-shadow: $box-shadow;
    position: absolute;
    background-color: var(--white);
    width: 100%;
    bottom: 0;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    overflow-y: scroll;
    z-index: 301;
  }
  &__line {
    width: 100px;
    height: 4px;
    border-radius: 4px;
    background-color: var(--surface-300);
    position: inherit;
    left: 50%;
    transform: translateX(-50%);
    top: 16px;
  }
  &__content {
    padding: 30px 16px 16px 16px;
  }
  &__title {
    font-weight: 600;
    text-align: center;
  }
  &__fixed {
    padding: 0 16px;
    position: absolute;
    bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
