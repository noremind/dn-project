<template>
  <section class="certificates">
    <div class="certificates__wrapper">
      <div v-if="certificates.length" class="certificates__cards">
        <article
          v-for="certificate in certificates"
          :key="certificate.id"
          class="certificates__card"
        >
          <img
            v-if="certificate.course?.image"
            class="certificates__image"
            :src="certificate.course.image"
            :alt="certificate.course.name"
          />
          <UiNoImage v-else class="certificates__image" />

          <div class="certificates__content">
            <div class="certificates__heading">
              <UiIcon
                icon="certificate-star-i"
                color="primary-color"
                size="size-24"
              />
              <h2 class="certificates__name">{{ certificate.course?.name }}</h2>
            </div>

            <div class="certificates__dates">
              <p>
                {{ t("local.certificate_received_at") }}:
                {{ formatDateToDots(certificate.created_at) }}
              </p>
              <p>
                {{ t("local.certificate_expires_at") }}:
                {{ formatDateToDots(certificate.expires_at) }}
              </p>
            </div>

            <UiButton
              class="certificates__download secondary-btn"
              :label="t('local.download_certificate')"
              before-icon="download-i"
              icon-color="primary-color"
              icon-size="size-20"
              @action="getCertificatesIdDownload(certificate.id)"
            />
          </div>
        </article>
      </div>

      <UiStatusRequest v-else :status="status" />
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const titleStore = useTitleStore();

const certificates = ref([]);
const status = ref("pending");

titleStore.setTitle(t("local.my_certificates"), "/panel/certificates");

useSeo({ title: t("local.my_certificates") });

const getCertificates = async () => {
  try {
    const response = await useApi().client({
      url: "/auth/profile/certificates",
      method: "get",
    });

    certificates.value = Array.isArray(response.data) ? response.data : [];
    status.value = certificates.value.length ? "completed" : "empty";
  } catch {
    status.value = null;
  }
};

const getCertificatesIdDownload = (id) => {
  useApi()
    .client({
      url: `certificates/${id}/download`,
      mehtod: "get",
      responseType: "blob",

      headers: {
        responseType: "blob",
        Accept:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    })
    .then((res) => {
      const blob = new Blob([res], {
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

getCertificates();
</script>

<style lang="scss" scoped>
.certificates {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $gap-md;
  }
  &__card {
    overflow: hidden;
    border-radius: $border-r-lg;
    background-color: var(--surface-100);
    box-shadow: $box-shadow;
  }
  &__image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  &__content,
  &__heading,
  &__dates {
    display: flex;
    flex-direction: column;
  }
  &__content {
    gap: $gap-lg;
    padding: $padding-lg;
  }
  &__heading {
    gap: $gap-sm;
  }
  &__name {
    font-size: 18px;
    line-height: 140%;
  }
  &__dates {
    gap: $gap-xs;
    color: var(--surface-400);
    font-size: 14px;
  }
  &__download {
    width: fit-content;
    border: 1px solid $primary-color;
    color: $primary-color;
  }
}

@media (max-width: 1024px) {
  .certificates {
    &__cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 560px) {
  .certificates {
    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
