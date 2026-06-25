<template>
  <div class="radio">
    <div
      class="radio__wrapper"
      :class="{ 'radio__wrapper--horizontal': type === 'horizontal' }"
    >
      <label
        class="radio__label"
        v-for="variant in variants"
        :key="variant.id"
        :for="`radio-${variant.id}`"
      >
        <input
          type="radio"
          class="radio__input"
          :class="{
            'radio__input--success':
              status && variant.id === correctAnswers?.id,

            'radio__input--error':
              status === 'fail' &&
              variant.id === mValue?.id &&
              variant.id !== correctAnswers?.id,
          }"
          :id="`radio-${variant.id}`"
          v-model="mValue"
          :value="variant"
          :disabled="disabled"
        />

        <UiMathjax :formula="variant[show]" />
      </label>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  variants: Array,
  modelValue: Object,
  disabled: Boolean,
  correctAnswers: Object,
  status: [String, null],
  userAnswers: Object,
  show: { type: String, default: "text" },
  type: { type: String, default: "" },
});

const mValue = ref(props.modelValue);

watch(mValue, (val) => emit("update:modelValue", val));
watch(
  () => props.modelValue,
  (val) => (mValue.value = val),
);
</script>

<style lang="scss" scoped>
.radio {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
    &--horizontal {
      flex-direction: row;
    }
  }
  &__label {
    display: flex;
    align-items: center;
    gap: $gap-md;
    cursor: pointer;
  }
  &__input {
    appearance: none;
    width: 25px;
    height: 25px;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    border: 3px solid var(--surface-300);

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 14px;
      height: 14px;
      background: transparent;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &:checked {
      border: 3px solid $primary-color;
      background: $primary-color;
    }
    &:checked::after {
      background: var(--white);
    }

    &--error {
      border-color: $red-300;
      border: 3px solid $red-300;
    }
    &--error:checked {
      background: $red-300;
      border: 3px solid $red-300;
    }

    &--success {
      border-color: $green-500;
      border: 3px solid $green-500;
    }
    &--success:checked {
      background: $green-500;
      border: 3px solid $green-500;
    }
  }
}
</style>
