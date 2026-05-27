<template>
  <section class="edit">
    <div class="edit__wrapper">
      <h2 class="edit__title">{{ t("local.edit_profile") }}</h2>

      <div class="edit__form">
        <div class="edit__top">
          <div class="edit__avatar">
            {{ firstName?.trim().split("")?.[0].toUpperCase() || "" }}
          </div>
          <p class="edit__name">{{ firstName }}</p>
        </div>

        <div class="edit__box">
          <UiInput v-model="firstName" :label="t('local.first_name')" />
          <UiInput v-model="secondName" :label="t('local.second_name')" />
        </div>
        <UiInput v-model="email" :label="t('local.email')" />

        <div class="edit__box">
          <UiInput
            v-model="birthDate"
            :label="t('local.birth_date')"
            placeholder="dd-mm-yyyy"
            maska="##-##-####"
          />
          <UiInput
            v-model="phone"
            :label="t('local.phone_number')"
            placeholder="+7 (_ _ _) - _ _ _ - _ _ - _ _"
            maska="+7 (###) ### ## ##"
          />
        </div>

        <UiButton
          :label="t('local.send')"
          class="edit__btn primary-btn"
          @action="putAuthProfileUpdate"
          :disabled="disabled"
          :is-loading="isLoading"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const titleStore = useTitleStore();
const authStore = useAuthStore();
const user = computed(() => authStore.getUser);

titleStore.setTitle(t("local.profile"));

useSeo({
  title: t("local.edit_profile"),
});

const useProfileField = (key) => {
  const draft = ref();

  return computed({
    get: () => (draft.value !== undefined ? draft.value : user.value?.[key] || null),
    set: (value) => {
      draft.value = value;
    },
  });
};

const firstName = useProfileField("first_name");
const secondName = useProfileField("second_name");
const email = useProfileField("email");
const birthDate = useProfileField("birthday");
const phone = useProfileField("phone");

const isLoading = ref(false);

const disabled = computed(() => {
  if (!!firstName.value && !!secondName.value && email.value?.includes("@")) {
    return false;
  }
  return true;
});

const putAuthProfileUpdate = () => {
  isLoading.value = true;
  useApi()
    .client({
      url: "/auth/profile/update",
      method: "put",
      body: {
        first_name: firstName.value,
        second_name: secondName.value,
        email: email.value,
        phone: phone.value?.replace(/\D/g, ""),
        birthday: birthDate.value,
      },
    })
    .then(async (res) => {
      isLoading.value = true;
      await authStore.setUser();
      isLoading.value = false;
      useNotify({
        title: t("local.success"),
        text: t("local.profile_has_been_successfully_updated"),
        status: "success",
      });
    })
    .catch((error) => {
      useNotify({
        title: t("local.oops"),
        text: error,
        status: "error",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<style lang="scss" scoped>
.edit {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: $gap-xl;
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
  }
  &__top {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: $gap-md;
    font-size: 28px;
    justify-content: center;
  }
  &__avatar {
    width: 60px;
    height: 60px;
    background-color: $primary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: var(--white);
  }
  &__box {
    display: flex;
    align-items: center;
    gap: $gap-md;
  }
  &__btn {
    margin-left: auto;
  }
}
</style>
