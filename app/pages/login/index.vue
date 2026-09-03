<template>
  <section class="login-page">
    <div class="login-card">
      <aside class="login-card__intro">
        <UiLogo
          class="login-card__logo"
          type="vertical"
          :is-text-hide="false"
        />

        <div class="intro-illustration" aria-hidden="true">
          <div class="intro-illustration__orb"></div>
          <div class="intro-illustration__shape"></div>
          <div class="intro-illustration__head"></div>
          <div class="intro-illustration__body"></div>
          <div class="intro-illustration__shadow"></div>
        </div>

        <div class="intro-copy">
          <h2>Обучение сотрудников в едином пространстве</h2>
          <p>
            Проходите курсы, отслеживайте прогресс и получайте сертификаты — всё
            в одном личном кабинете.
          </p>
        </div>
      </aside>

      <main class="login-card__form">
        <div class="form-heading">
          <h1>{{ t("local.login") }}</h1>
          <p>Введите данные для входа в систему</p>
        </div>

        <form class="login-form" @submit.prevent="postAuthLogin">
          <label class="field">
            <span class="field__label">{{ t("local.email") }}</span>
            <span
              class="field__control"
              :class="{ 'field__control--error': !!errorMessage }"
            >
              <svg class="field__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 6.5h16v11H4z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="m5 7.5 7 5 7-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
              <input
                v-model="email"
                name="email"
                type="email"
                autocomplete="username"
                placeholder="you@example.com"
                maxlength="255"
                @input="errorMessage = null"
              />
            </span>
          </label>

          <label class="field">
            <span class="field__label">{{ t("local.password") }}</span>
            <span
              class="field__control"
              :class="{ 'field__control--error': !!errorMessage }"
            >
              <svg class="field__icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M8 10V7.5a4 4 0 0 1 8 0V10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
              <input
                v-model="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                maxlength="255"
                @input="errorMessage = null"
              />
              <button
                class="field__action"
                type="button"
                :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
                @click="showPassword = !showPassword"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    v-if="!showPassword"
                    d="M3.5 12s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <circle
                    v-if="!showPassword"
                    cx="12"
                    cy="12"
                    r="2.2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                  />
                  <path
                    v-else
                    d="m4 4 16 16M10.6 6.9A9.7 9.7 0 0 1 12 6.8c5.3 0 8.5 5.2 8.5 5.2a15.6 15.6 0 0 1-2.4 2.8M7.1 7.8C4.6 9.2 3.5 12 3.5 12s3.2 5.2 8.5 5.2c1 0 1.9-.2 2.7-.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </span>
          </label>

          <p v-if="errorMessage" class="login-form__error" role="alert">
            {{ errorMessage }}
          </p>

          <UiButton
            :label="t('local.enter')"
            class="login-form__button primary-btn"
            @action="postAuthLogin"
          />
        </form>

        <div class="login-footer">
          <span>Доступ к системе предоставляется администратором</span>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const authStore = useAuthStore();

definePageMeta({ layout: "landing" });

useSeo({ title: t("local.login") });

const email = ref(null);
const password = ref(null);
const errorMessage = ref(null);
const isLoading = ref(false);
const showPassword = ref(false);

const postAuthLogin = async () => {
  if (isLoading.value) return;

  errorMessage.value = null;

  if (!email.value?.trim() || !password.value) {
    errorMessage.value = "Введите email и пароль";
    return;
  }

  isLoading.value = true;

  await useApi()
    .client({
      url: "auth/login",
      method: "post",
      body: { email: email.value.trim(), password: password.value },
      notify: false,
    })
    .then(async (res) => {
      await authStore.setToken(res.token, "/panel");
    })
    .catch((error) => {
      errorMessage.value =
        error?._data?.message ||
        "Не удалось выполнить вход. Проверьте данные и попробуйте снова.";
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background:
    radial-gradient(
      circle at 84% 12%,
      rgba($primary-color, 0.12),
      transparent 28%
    ),
    radial-gradient(
      circle at 10% 92%,
      rgba($primary-color, 0.08),
      transparent 25%
    ),
    #0d1422;
}

.login-card {
  width: min(1060px, 100%);
  min-height: 735px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: #141c2b;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  color: #f4f6fb;

  &__intro {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 46px 42px 42px;
    overflow: hidden;
    background: linear-gradient(145deg, #13223a 0%, #0d1728 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.09);
  }

  &__logo {
    position: relative;
    z-index: 3;
    align-self: flex-start;
    color: #f4f6fb;
  }

  &__logo :deep(.logo__wrapper) {
    color: #f4f6fb;
  }
  &__logo :deep(.logo__preview) {
    width: 44px !important;
    height: 44px;
    object-fit: contain;
  }
  &__logo :deep(.logo__text) {
    color: #f4f6fb;
  }
  &__logo :deep(.logo__baige) {
    background: $primary-color;
  }

  &__form {
    display: flex;
    flex-direction: column;
    padding: 56px 46px 38px;
    background: #151e2e;
  }
}

.intro-illustration {
  position: relative;
  flex: 1;
  min-height: 390px;
  margin: 10px -10px 0;

  &__orb {
    position: absolute;
    width: 126px;
    height: 126px;
    top: 62px;
    right: 65px;
    border-radius: 50%;
    background: rgba(76, 91, 117, 0.22);
  }
  &__shape {
    position: absolute;
    width: 270px;
    height: 270px;
    top: 95px;
    left: 50%;
    transform: translateX(-50%) rotate(-13deg);
    border-radius: 45% 55% 55% 40%;
    background: $primary-color;
  }
  &__head {
    position: absolute;
    width: 78px;
    height: 78px;
    top: 150px;
    left: calc(50% - 39px);
    border-radius: 50%;
    background: rgba($orange-600, 0.55);
    z-index: 2;
  }
  &__head::before {
    content: "";
    position: absolute;
    width: 112px;
    height: 66px;
    left: -17px;
    top: -1px;
    border-radius: 60px 60px 0 0;
    background: $orange-600;
  }
  &__body {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 228px;
    left: calc(50% - 75px);
    border-radius: 32px 32px 42px 42px;
    background: #1b2638;
    z-index: 3;
  }
  &__shadow {
    position: absolute;
    width: 250px;
    height: 28px;
    bottom: 38px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background: rgba(3, 8, 16, 0.42);
    filter: blur(6px);
  }
}

.intro-copy {
  position: relative;
  z-index: 2;
  max-width: 410px;
  h2 {
    margin: 0 0 14px;
    color: #f7f8fb;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 22px;
    line-height: 1.25;
  }
  p {
    margin: 0;
    color: #8994a9;
    font-size: 16px;
    line-height: 1.55;
  }
}

.form-heading {
  margin-bottom: 32px;
  h1 {
    margin: 0 0 8px;
    color: #f4f6fb;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 29px;
    line-height: 1.2;
  }
  p {
    margin: 0;
    color: #8d97aa;
    font-size: 15px;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 19px;
  &__button {
    width: 100%;
    min-height: 50px;
    margin-top: 1px;
  }
  &__error {
    margin: -6px 0 -4px;
    color: #ff7777;
    font-size: 13px;
    line-height: 1.4;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 9px;
  &__label {
    color: #8d97aa;
    font-size: 14px;
    font-weight: 600;
  }
  &__control {
    height: 52px;
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 0 14px;
    border: 1px solid #3b4659;
    border-radius: 11px;
    background: #202a3c;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
  }
  &__control:focus-within {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }
  &__control--error {
    border-color: #e55b5b;
  }
  &__icon {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    color: #7f8aa0;
  }
  input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: #eef1f7;
    font: inherit;
    font-size: 15px;
  }
  input::placeholder {
    color: #7f8aa0;
  }
  &__action {
    flex: 0 0 22px;
    width: 22px;
    height: 22px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #7f8aa0;
    cursor: pointer;
  }
  &__action svg {
    width: 20px;
    height: 20px;
    display: block;
  }
}

.login-footer {
  margin-top: auto;
  padding-top: 34px;
  text-align: center;
  color: #667287;
  font-size: 12px;
}

:deep(.primary-btn) {
  background: $primary-color !important;
  color: var(--white-fixed) !important;
  border-color: $primary-color !important;
}

@media (max-width: 768px) {
  .login-page {
    padding: 16px;
  }
  .login-card {
    min-height: auto;
    grid-template-columns: 1fr;
    border-radius: 18px;
  }
  .login-card__intro {
    min-height: 330px;
    padding: 28px 26px 30px;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  }
  .intro-illustration {
    min-height: 180px;
    margin: 0;
    display: none;
  }
  .intro-illustration__shape {
    width: 150px;
    height: 150px;
    top: 30px;
  }
  .intro-illustration__orb {
    width: 70px;
    height: 70px;
    top: 15px;
    right: 15%;
  }
  .intro-illustration__head {
    width: 48px;
    height: 48px;
    top: 55px;
    left: calc(50% - 24px);
  }
  .intro-illustration__head::before {
    width: 70px;
    height: 40px;
    left: -11px;
  }
  .intro-illustration__body {
    width: 90px;
    height: 90px;
    top: 103px;
    left: calc(50% - 45px);
  }
  .intro-illustration__shadow {
    bottom: 8px;
    width: 140px;
  }
  .intro-copy {
    font-size: 19px;
    display: none;
  }
  .intro-copy p {
    font-size: 14px;
  }
  .login-card__form {
    padding: 32px 26px 28px;
  }
  .login-card__intro {
    min-height: auto;
  }
}

@media (max-width: 420px) {
  .login-card__intro {
    min-height: auto;
  }
  .login-card__form {
    padding: 28px 20px 24px;
  }
  .form-heading h1 {
    font-size: 25px;
  }
}
</style>
