<template>
  <section class="card">
    <div class="card__wrapper">
      <img
        v-if="info.image"
        class="card__preview"
        :src="info.image"
        alt="Preview"
        @click="checkStatus(info.user_status)"
      />

      <UiNoImage
        @click="checkStatus(info.user_status)"
        v-else
        class="card__no-image"
        border-radius="none"
      />

      <div class="card__content">
        <div class="card__content-top" @click="checkStatus(info.user_status)">
          <h3 class="card__title title-sm">{{ info.name }}</h3>
          <UiIcon
            class="card__icon"
            icon="chevron"
            size="size-20"
            deg="right"
          />
        </div>
        <!-- <p class="card__description" v-if="info.description">
          {{ info.description }}
        </p> -->

        <div class="card__info">
          <div
            class="card__box"
            v-for="(item, index) in infos"
            :key="item.id"
            v-show="item.show"
          >
            <p class="card__point" v-if="index === 1">·</p>
            <UiIcon :icon="item.icon" size="size-16" />
            <p class="card__info-text">{{ item.text }}</p>
          </div>
        </div>

        <UiProgressBar :percent="info.user_progress?.progress || 0" />

        <div class="card__footer">
          <p class="card__price">{{ formatDigits(10000) }} ₸</p>
        </div>

        <UiButton
          v-if="info.user_status === 'completed'"
          class="card__btn card__btn--certificate secondary-btn"
          label="Получить сертификат"
          before-icon="certificate-star-i"
          icon-size="size-20"
          icon-color="primary-color"
          @click="postCourseCertificate(info)"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();
const platform = usePlatformStore();
const props = defineProps({
  info: Object,
});

const infos = computed(() => [
  {
    id: 1,
    icon: "module-i",
    text: `${props.info.modules_count} ${
      props.info.modules_count === 1
        ? t("local.module").toLocaleLowerCase()
        : t("local.modules").toLocaleLowerCase()
    }`,
    show: props.info.modules_count > 0,
  },
  {
    id: 2,
    icon: "circle-i",
    text: `${props.info.lessons_count} ${
      props.info.lessons_count === 1
        ? t("local.lesson").toLocaleLowerCase()
        : t("local.lessons").toLocaleLowerCase()
    }`,
    show: props.info.lessons_count > 0,
  },
]);

const checkStatus = (status) => {
  if (status === "buy") {
  } else if (status === "start") {
    useApi()
      .client({
        url: `courses/${props.info.slug}/start`,
        method: "post",
      })
      .then(() => {
        router.push(`/panel/course/${props.info.slug}`);
      });
  } else if (status === "continue" || status === "completed") {
    router.push(`/panel/course/${props.info.slug}`);
  }
};

const getCertificatesIdDownload = (id) => {
  useApi()
    .client({
      url: `certificates/${id}/download`,
      mehtod: "get",
      header: {
        responseType: "blob",
      },
    })
    .then((res) => {
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `certificate-${id}.docx`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    });
};

const postCourseCertificate = (course) => {
  useApi()
    .client({
      url: `/courses/${course.slug}/get-certificate`,
      method: "post",
    })
    .then((res) => {
      getCertificatesIdDownload(res.data.id);
    });
};
</script>

<style lang="scss" scoped>
.card {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-md;
    box-shadow: $box-shadow;
    border-radius: $border-r-xl;
    border: 1px solid var(--surface-200);
    background-color: var(--surface-100);
    cursor: pointer;
    transition: 0.25s linear;
    &:hover {
      box-shadow: $box-shadow-md;
      transform: scale(1.0099);
    }
    &:hover .card__icon {
      transform: translateX(7.5px) rotate(90deg);
    }
  }
  &__description {
    color: $surface-400;
    font-size: 14px;
    padding-bottom: $padding-md;
  }
  &__icon {
    transition: 0.2s linear;
  }
  &__btn {
    width: 100%;
  }
  &__content {
    padding: 0 $padding-md $padding-md;
    display: flex;
    flex-direction: column;
    gap: $gap-sm;
    &-top {
      display: flex;
      justify-content: space-between;
      gap: $gap-md;
    }
  }
  &__no-image,
  &__preview {
    border-top-left-radius: $border-r-lg;
    border-top-right-radius: $border-r-lg;
  }
  &__info {
    display: flex;
    align-items: center;
    gap: $gap-md;
    border-top: 1.5px solid var(--surface-200);
    padding-top: $padding-md;
    &-text {
      font-size: 14px;
      color: var(--surface-400);
    }
  }
  &__point {
    color: var(--surface-400);
  }
  &__box {
    display: flex;
    align-items: center;
    gap: $gap-xs;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-md;
    margin-top: 12px;
  }
  &__btn {
    &--start {
      margin-left: auto;
    }
  }
}
</style>
