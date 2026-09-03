<template>
  <div
    class="button"
    @click="href ? router.push(href) : checkState()"
    :class="{
      disabled: disabled,
    }"
  >
    <UiIcon
      v-if="beforeIcon && !disabled"
      :icon="beforeIcon"
      :color="iconColor"
      :size="iconSize"
      :deg="iconDeg"
    />
    <button
      v-if="tag === 'button'"
      class="button__btn"
      :disabled="disabled"
      :type="type"
      :class="[color]"
    >
      {{ label }}
    </button>
    <nuxt-link
      v-if="tag === 'a'"
      class="button__btn"
      :to="href"
      :disabled="disabled"
      :class="[color]"
    >
      {{ label }}
    </nuxt-link>
    <UiIcon
      v-if="afterIcon && !disabled"
      :icon="afterIcon"
      :color="iconColor"
      :size="iconSize"
      :deg="iconDeg"
    />
  </div>
</template>

<script setup>
const router = useRouter();
const emit = defineEmits(["action"]);
const props = defineProps({
  label: String,
  beforeIcon: String,
  afterIcon: String,
  iconSize: String,
  iconColor: String,
  iconDeg: String,
  disabled: Boolean,
  href: String,
  color: String,
  type: {
    type: String,
    default: "button",
  },
  tag: {
    type: String,
    default: "button",
  },
});

const checkState = () => {
  if (props.disabled) {
    return;
  }
  emit("action");
};
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  cursor: pointer;
  height: 100%;
  display: flex;
  gap: $gap-xs;
  align-items: center;
  padding: $padding-sm $padding-md;
  &__btn {
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
  }
}

.disabled {
  pointer-events: none;
  opacity: 0.7;
  background-color: var(--surface-400);
}

</style>
