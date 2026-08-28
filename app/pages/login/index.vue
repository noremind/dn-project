<template>
  <section class="login-page">
    <div class="login-card">
      <aside class="login-card__intro">
        <div class="brand">
          <div class="brand__mark">DN</div>
          <div class="brand__name">Project <span>· LMS</span></div>
        </div>

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

        <div class="auth-tabs" role="tablist" aria-label="Авторизация">
          <button class="auth-tabs__item auth-tabs__item--active" type="button">
            {{ t("local.enter") }}
          </button>
          <button class="auth-tabs__item" type="button" disabled>
            {{ t("local.register") }}
          </button>
        </div>

        <form class="login-form" @submit.prevent="postAuthLogin">
          <label class="field">
            <span class="field__label">{{ t("local.email") }}</span>
            <span class="field__control" :class="{ 'field__control--error': !!errorMessage }">
              <svg class="field__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6.5h16v11H4z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                <path d="m5 7.5 7 5 7-5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
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
            <span class="field__control" :class="{ 'field__control--error': !!errorMessage }">
              <svg class="field__icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.7" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
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
              <button class="field__action" type="button" :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.5 12s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z" fill="none" stroke="currentColor" stroke-width="1.7" />
                  <circle cx="12" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7" />
                </svg>
                <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m4 4 16 16M10.6 6.9A9.7 9.7 0 0 1 12 6.8c5.3 0 8.5 5.2 8.5 5.2a15.6 15.6 0 0 1-2.4 2.8M7.1 7.8C4.6 9.2 3.5 12 3.5 12s3.2 5.2 8.5 5.2c1 0 1.9-.2 2.7-.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </span>
          </label>

          <div class="form-options">
            <label class="remember">
              <input v-model="rememberMe" type="checkbox" />
              <span class="remember__box"></span>
              <span>{{ rememberMeText }}</span>
            </label>
            <button class="forgot" type="button" disabled>Забыли пароль?</button>
          </div>

          <p v-if="errorMessage" class="login-form__error" role="alert">{{ errorMessage }}</p>

          <UiButton
            :label="t('local.enter')"
            class="login-form__button primary-btn"
            :is-loading="isLoading"
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
const showPassword = ref(false);
const rememberMe = ref(false);

const rememberMeText = computed(() => {
  if (t("local.remember_me") !== "local.remember_me") {
    return t("local.remember_me");
  }

  return "Запомнить меня";
});

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
      isLoading: false,
      notify: false,
    })
    .then(async (res) => {
      await authStore.setToken(res.token, "/panel");
    })
    .catch((error) => {
      errorMessage.value = error?._data?.message || "Не удалось выполнить вход. Проверьте данные и попробуйте снова.";
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
    radial-gradient(circle at 84% 12%, rgba(232, 78, 16, 0.12), transparent 28%),
    radial-gradient(circle at 10% 92%, rgba(0, 160, 227, 0.08), transparent 25%),
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

  &__form {
    display: flex;
    flex-direction: column;
    padding: 56px 46px 38px;
    background: #151e2e;
  }
}

.brand {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;

  &__mark {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: #f7ad35;
    color: #111827;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.8px;
  }

  &__name {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.3px;

    span {
      color: #8994a9;
      font-weight: 600;
    }
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
    background: #e5a13a;
  }

  &__head {
    position: absolute;
    width: 78px;
    height: 78px;
    top: 150px;
    left: calc(50% - 39px);
    border-radius: 50%;
    background: #e7c98f;
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
    background: #4c8df5;
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
    letter-spacing: -0.25px;
  }

  p {
    margin: 0;
    color: #8994a9;
    font-size: 16px;
    line-height: 1.55;
  }
}

.form-heading {
  margin-bottom: 28px;

  h1 {
    margin: 0 0 8px;
    color: #f4f6fb;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 29px;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  p {
    margin: 0;
    color: #8d97aa;
    font-size: 15px;
  }
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 52px;
  padding: 4px;
  margin-bottom: 30px;
  border: 1px solid #3a465a;
  border-radius: 12px;
  background: #202a3c;

  &__item {
    border: 0;
    border-radius: 9px;
    background: transparent;
    color: #8d97aa;
    font: inherit;
    font-size: 15px;
    font-weight: 700;

    &--active {
      color: #111827;
      background: #f7ad35;
      box-shadow: 0 3px 10px rgba(247, 173, 53, 0.18);
    }

    &:disabled {
      cursor: default;
      opacity: 1;
    }
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
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus-within {
      border-color: #f7ad35;
      box-shadow: 0 0 0 3px rgba(247, 173, 53, 0.1);
    }

    &--error {
      border-color: #c95656;
    }

    input {
      min-width: 0;
      width: 100%;
      height: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: #edf1f8;
      font: inherit;
      font-size: 15px;

      &::placeholder {
        color: #7d879a;
      }
    }
  }

  &__icon,
  &__action svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    color: #8290a6;
  }

  &__action {
    width: 28px;
    height: 32px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;

    &:hover svg {
      color: #c4cbd7;
    }
  }
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: -1px;
}

.remember {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #8994a9;
  font-size: 14px;
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  &__box {
    width: 20px;
    height: 20px;
    border: 1px solid #435067;
    border-radius: 6px;
    background: #202a3c;
  }

  input:checked + &__box {
    border-color: #f7ad35;
    background: #f7ad35;
    box-shadow: inset 0 0 0 4px #202a3c;
  }
}

.forgot {
  padding: 0;
  border: 0;
  background: transparent;
  color: #f7ad35;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: default;
}

.login-footer {
  margin-top: auto;
  padding-top: 30px;
  color: #68758b;
  font-size: 12px;
  line-height: 1.45;
  text-align: center;
}

:deep(.primary-btn) {
  border-color: #f7ad35 !important;
  background: #f7ad35 !important;
  color: #111827 !important;
  font-weight: 700;
  border-radius: 11px;

  &:hover:not(:disabled) {
    background: #ffb947 !important;
  }
}

@media (max-width: 850px) {
  .login-page {
    padding: 24px 16px;
  }

  .login-card {
    grid-template-columns: 1fr;
    min-height: auto;
    max-width: 560px;

    &__intro {
      min-height: 290px;
      padding: 30px;
    }

    &__form {
      padding: 34px 30px 30px;
    }
  }

  .intro-illustration {
    display: none;
  }

  .intro-copy {
    margin-top: 55px;
  }
}

@media (max-width: 480px) {
  .login-page {
    min-height: 100dvh;
    padding: 0;
  }

  .login-card {
    min-height: 100dvh;
    border: 0;
    border-radius: 0;
    box-shadow: none;

    &__intro {
      min-height: 215px;
      padding: 24px 20px;
    }

    &__form {
      padding: 28px 20px 24px;
    }
  }

  .brand__mark {
    width: 40px;
    height: 40px;
  }

  .intro-copy {
    margin-top: 34px;

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }
  }

  .form-heading h1 {
    font-size: 26px;
  }

  .auth-tabs {
    margin-bottom: 24px;
  }

  .form-options {
    align-items: flex-start;
  }
}
</style>
