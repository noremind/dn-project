<template>
  <div class="textarea">
    <div class="textarea__wrapper">
      <label class="textarea__label" v-if="label">{{ label }}</label>
      <textarea
        class="textarea__field"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :maxlength="maxLength"
      ></textarea>
      <p class="textarea__limit">{{ modelValue?.length }} / {{ maxLength }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: { type: String, default: "..." },
  maxLength: { type: Number, default: 255 },
  modelValue: { type: String, default: "" },
  label: String,
});
</script>

<style lang="scss" scoped>
.textarea {
  &__wrapper {
    width: 100%;
    position: relative;
  }
  &__field {
    border: 1px solid var(--surface-200);
    padding: $padding-md;
    border-radius: $border-r-md;
    box-shadow: $box-shadow;
    width: 100%;
    height: max-content;
    border: none;
    outline: none;
    resize: none;
    font-family: inherit;
    min-height: 150px;
    font-size: 16px;
  }
  &__limit {
    position: absolute;
    bottom: 16px;
    font-size: 14px;
    right: 16px;
  }
  &__label {
    color: var(--surface-600);
    font-weight: 500;
    font-size: 14px;
    &--empty {
      &::before {
        content: "0";
        opacity: 0;
      }
    }
  }
}
</style>
