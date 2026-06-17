<template>
  <section class="login">
    <div class="login__wrapper">
      <UiLogo class="login__logo" />

      <h1 class="login__title">{{ t("local.login") }}</h1>

      <UiInput
        :label="t('local.email')"
        placeholder="example@test.com"
        name="tel"
        v-model="email"
        :max-length="255"
        :is-error="!!errorMessage"
        @keyup.enter="postAuthLogin"
      />
      <UiInput
        :label="t('local.password')"
        placeholder=""
        name="password"
        type="password"
        v-model="password"
        icon-size="size-20"
        :max-length="255"
        :is-error="!!errorMessage"
        @keyup.enter="postAuthLogin"
      />
      <p class="login__error">{{ errorMessage }}</p>
      <!-- <p class="login__text">
        {{ t("local.do_not_you_have_an_account") }}
        <nuxt-link class="login__link" to="/register">
          {{ t("local.register") }}</nuxt-link
        >
      </p> -->
      <div class="login__box">
        <UiButton
          :label="t('local.send')"
          class="login__btn primary-btn"
          :is-loading="isLoading"
          @action="postAuthLogin"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const authStore = useAuthStore();

definePageMeta({
  layout: "landing",
});

useSeo({
  title: t("local.login"),
});

const email = ref(null);
const password = ref(null);
const errorMessage = ref(null);

const isLoading = ref(false);

const postAuthLogin = async () => {
  isLoading.value = true;

  await useApi()
    .client({
      url: "auth/login",
      method: "post",
      body: { email: email.value, password: password.value },
      isLoading: false,
    })
    .then(async (res) => {
      await authStore.setToken(res.token, "/panel");
    })
    .catch((error) => {
      errorMessage.value = error._data.message;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

watch(
  () => email.value,
  () => {
    errorMessage.value = null;
  },
);

watch(
  () => password.value,
  () => {
    errorMessage.value = null;
  },
);
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: $padding-md;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    max-width: 480px;
    width: 100%;
    box-shadow: $box-shadow-md;
    background-color: var(--white);
    padding: $padding-xxl $padding-md $padding-md $padding-md;
    border-radius: $border-r-md;
  }
  &__logo {
    margin: 0 auto;
  }
  &__title {
    text-align: center;
    margin-top: 12px;
  }
  &__error {
    font-size: 14px;
    color: $red-300;
  }
  &__btn {
    margin-left: auto;
  }
  &__box {
    display: flex;
    align-items: center;
  }
  &__text {
    color: var(--surface-300);
    font-size: 14px;
  }
  &__link {
    text-decoration: underline;
    &:hover {
      color: $blue-500;
    }
  }
}
</style>
