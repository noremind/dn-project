<template>
  <section class="certificates">
    <div class="certificates__wrapper">
      <header class="certificates__header">
        <div>
          <!-- <h1>{{ t("local.my_certificates") }}</h1> -->
          <p>{{ t("local.certificates_subtitle") }}</p>
        </div>
        <div class="certificates__summary">
          <div>
            <b
              class="certificates__summary-value certificates__summary-value--valid"
              >{{ validCount }}</b
            ><small>{{ t("local.certificates_valid") }}</small>
          </div>
          <div>
            <b
              class="certificates__summary-value certificates__summary-value--soon"
              >{{ soonCount }}</b
            ><small>{{ t("local.certificates_expiring_soon") }}</small>
          </div>
        </div>
      </header>

      <div class="certificates__filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="{
            'certificates__filter--active': activeFilter === filter.value,
          }"
          class="certificates__filter"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <div v-if="certificates.length" class="certificates__cards">
        <article
          v-for="certificate in filteredCertificates"
          :key="certificate.id"
          class="certificates__card"
          :class="`certificates__card--${certificateState(certificate).tone}`"
        >
          <div class="certificates__visual">
            <span class="certificates__state"
              ><i />{{ certificateState(certificate).label }}</span
            >
            <UiIcon
              icon="certificate-star-i"
              color="white-fixed"
              size="size-52"
            />
          </div>

          <div class="certificates__content">
            <h2 class="certificates__name">
              {{ certificate.course?.name || certificate.course?.title }}
            </h2>
            <p class="certificates__issued">
              {{ t("local.certificates_issued") }}
              {{ formatDateToDots(certificate.created_at) }}
            </p>
            <div class="certificates__expiry">
              <span>{{ t("local.certificates_expires_in") }}</span
              ><b>{{ certificateState(certificate).daysText }}</b>
            </div>
            <div class="certificates__bar">
              <i
                :style="{ width: `${certificateState(certificate).percent}%` }"
              />
            </div>
            <footer class="certificates__footer">
              <span
                >⚑
                {{
                  certificate.number ||
                  certificate.serial_number ||
                  `DN-${certificate.id}`
                }}</span
              ><button
                type="button"
                @click="getCertificatesIdDownload(certificate.id)"
              >
                ⇩ {{ t("local.download_certificate") }}
              </button>
            </footer>
          </div>
        </article>
      </div>

      <UiStatusRequest
        v-if="!certificates.length || !filteredCertificates.length"
        :status="status"
      />
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const titleStore = useTitleStore();

const certificates = ref([]);
const status = ref("pending");
const activeFilter = ref("all");

const filters = computed(() => [
  { value: "all", label: t("local.all") },
  { value: "valid", label: t("local.certificates_valid") },
  { value: "expired", label: t("local.certificates_expired") },
]);

const daysUntilExpiry = (certificate) => {
  if (!certificate.expires_at) return null;
  return Math.ceil(
    (new Date(certificate.expires_at).getTime() - Date.now()) / 86400000,
  );
};
const certificateState = (certificate) => {
  const days = daysUntilExpiry(certificate);
  if (days === null)
    return {
      tone: "valid",
      label: t("local.certificates_valid"),
      daysText: "—",
      percent: 100,
    };
  if (days <= 0)
    return {
      tone: "expired",
      label: t("local.certificates_expired"),
      daysText: t("local.certificates_expired"),
      percent: 0,
    };
  if (days <= 30)
    return {
      tone: "danger",
      label: t("local.certificates_expires_soon"),
      daysText: t("local.certificates_days", { count: days }),
      percent: Math.max(8, (days / 365) * 100),
    };
  if (days <= 60)
    return {
      tone: "soon",
      label: t("local.certificates_expires_soon"),
      daysText: t("local.certificates_days", { count: days }),
      percent: (days / 365) * 100,
    };
  return {
    tone: "valid",
    label: t("local.certificates_valid"),
    daysText: t("local.certificates_days", { count: days }),
    percent: Math.min(100, (days / 365) * 100),
  };
};
const filteredCertificates = computed(() =>
  activeFilter.value === "all"
    ? certificates.value
    : certificates.value.filter((certificate) => {
        const days = daysUntilExpiry(certificate);
        return activeFilter.value === "expired"
          ? days !== null && days <= 0
          : days === null || days > 0;
      }),
);
const validCount = computed(
  () =>
    certificates.value.filter((certificate) => {
      const days = daysUntilExpiry(certificate);
      return days === null || days > 0;
    }).length,
);
const soonCount = computed(
  () =>
    certificates.value.filter((certificate) => {
      const days = daysUntilExpiry(certificate);
      return days !== null && days > 0 && days <= 60;
    }).length,
);

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
      method: "get",
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
  --certificate-card: var(--white);
  --certificate-content: var(--white);
  --certificate-preview: linear-gradient(105deg, var(--surface-100), var(--surface-150));
  --certificate-preview-valid:
    radial-gradient(circle at 78% 16%, #47d89433, transparent 44%),
    linear-gradient(105deg, var(--surface-100), var(--surface-150));
  --certificate-preview-soon:
    radial-gradient(circle at 78% 16%, #f4b03c33, transparent 44%),
    linear-gradient(105deg, var(--surface-100), var(--surface-150));
  --certificate-preview-danger:
    radial-gradient(circle at 78% 16%, #fa725f30, transparent 44%),
    linear-gradient(105deg, var(--surface-100), var(--surface-150));
  --certificate-title: var(--surface-600);
  --certificate-muted: var(--surface-400);
  --certificate-track: var(--surface-250);
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
  }
  &__header h1 {
    font-size: 30px;
    line-height: 1.2;
    color: var(--surface-600);
  }
  &__header p {
    margin-top: 7px;
    color: var(--surface-400);
    font-size: 16px;
  }
  &__summary {
    display: flex;
    gap: 12px;
  }
  &__summary > div {
    display: flex;
    flex-direction: column;
    min-width: 118px;
    padding: 14px 18px;
    border: 1px solid var(--surface-200);
    border-radius: 14px;
    background: var(--surface-100);
  }
  &__summary-value {
    font-size: 26px;
    line-height: 1;
  }
  &__summary-value--valid {
    color: #3fc783;
  }
  &__summary-value--soon {
    color: #fa6d59;
  }
  &__summary small {
    margin-top: 6px;
    color: var(--surface-400);
    font-size: 13px;
  }
  &__filters {
    display: flex;
    gap: 10px;
  }
  &__filter {
    padding: 11px 21px;
    color: var(--surface-400);
    border: 1px solid var(--surface-250);
    border-radius: 12px;
    background: transparent;
    font-size: 15px;
    cursor: pointer;
  }
  &__filter--active {
    border-color: $primary-color;
    background: $primary-color;
    color: var(--white-fixed);
    font-weight: 700;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $gap-md;
  }
  &__card {
    overflow: hidden;
    border-radius: $border-r-lg;
    border: 1px solid var(--surface-200);
    background: var(--certificate-card);
    box-shadow: 0 8px 20px #02050d18;
  }
  &__visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 170px;
    color: #43d89b;
    background: var(--certificate-preview-valid);
  }
  &__state {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 7px 10px;
    border-radius: 7px;
    background: #3fd3931f;
    color: #4bdb9e;
    font-size: 13px;
    font-weight: 700;
  }
  &__state i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
  &__content {
    padding: 22px;
    background: var(--certificate-content);
  }
  &__name {
    font-size: 18px;
    min-height: 50px;
    line-height: 140%;
    color: var(--certificate-title);
  }
  &__issued {
    margin-top: 10px;
    color: var(--certificate-muted);
    font-size: 14px;
  }
  &__expiry {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;
    color: var(--certificate-muted);
    font-size: 14px;
  }
  &__expiry b {
    color: #4bdb9e;
  }
  &__bar {
    height: 8px;
    overflow: hidden;
    margin-top: 10px;
    border-radius: 99px;
    background: var(--certificate-track);
  }
  &__bar i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: #48d99b;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
    color: var(--certificate-muted);
    font-size: 13px;
  }
  &__footer button {
    padding: 10px 14px;
    border: 0;
    border-radius: 9px;
    background: #f4ae36;
    color: #1b1a19;
    font-weight: 700;
    cursor: pointer;
  }
  &__card--soon .certificates__visual {
    color: #f4b03c;
    background: var(--certificate-preview-soon);
  }
  &__card--soon .certificates__state {
    color: #f4b03c;
    background: #f4b03c1c;
  }
  &__card--soon .certificates__expiry b,
  &__card--soon .certificates__bar i {
    color: #f4b03c;
    background: #f4b03c;
  }
  &__card--danger .certificates__visual,
  &__card--expired .certificates__visual {
    color: #fa725f;
    background: var(--certificate-preview-danger);
  }
  &__card--danger .certificates__state,
  &__card--expired .certificates__state {
    color: #fa725f;
    background: #fa725f1c;
  }
  &__card--danger .certificates__expiry b,
  &__card--danger .certificates__bar i,
  &__card--expired .certificates__expiry b,
  &__card--expired .certificates__bar i {
    color: #fa725f;
    background: #fa725f;
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
    &__header {
      flex-direction: column;
    }
    &__summary {
      width: 100%;
    }
    &__summary > div {
      flex: 1;
    }
    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
