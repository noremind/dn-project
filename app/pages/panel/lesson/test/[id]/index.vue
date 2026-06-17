<template>
  <section class="tests">
    <div class="tests__wrapper">
      <h2 class="tests__title">{{ test?.title }}</h2>

      <UiTestRadio
        v-if="currentQuestion?.question_type === 1"
        :variants="currentQuestion.answers"
        show="title"
        v-model="currentUserAnswer"
      />

      <pre>{{ currentQuestion.answers }}</pre>
    </div>
  </section>
</template>

<script setup>
const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const test = ref(null);

const questions = ref(null);
const currentQuestion = ref(null);
const currentUserAnswer = ref(null);

const getTestsStart = async () => {
  await useApi()
    .client({ url: `/tests/${route.params.id}`, method: "get" })
    .then((res) => {
      test.value = res.data;
      questions.value = test.value?.questions;
      currentQuestion.value = questions.value?.[0] || null;
    });
};
getTestsStart();
</script>

<style lang="scss" scoped>
.tests {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
}
</style>
