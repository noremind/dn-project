<template>
  <section class="courses">
    <div class="courses__wrapper">
      <h2 class="courses__title hidden">{{ t("local.courses") }}</h2>

      <transition-group
        tag="div"
        name="card-list"
        class="courses__cards"
        :class="{ 'courses__cards--aside': asideStore.isOpen }"
      >
        <TheCoursesCard
          v-for="course in courses"
          :key="course.id"
          :info="course"
        />
      </transition-group>

      <UiStatusRequest v-if="!!status" :status="status" />

      <UiPagination
        v-if="!!pagination && pagination?.last_page !== 1"
        v-model="currentPage"
        :total="pagination?.total"
      />
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();
const asideStore = useAsideStore();
const route = useRoute();

useSeo({
  title: t("local.courses"),
  description: t("local.courses"),
});

const courses = ref(null);

const pagination = ref(null);
const currentPage = ref(+route.query?.page || 1);

const status = ref(null);

const getCourses = async () => {
  status.value = "pending";
  await useApi()
    .client({
      url: "/courses",
      method: "get",
      query: {
        per_page: 12,
        page: currentPage.value,
      },
    })
    .then((res) => {
      courses.value = res.data;
      pagination.value = res.meta;
      courses.value?.length ? (status.value = "completed") : "empty";
    })
    .catch(() => {
      status.value = "error";
    });
};
getCourses();
</script>

<style lang="scss" scoped>
.courses {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: $gap-xxl;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $gap-md;
    &--aside {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  &__preview {
    object-fit: cover;
    border-radius: $border-r-md;
  }
}

@media (max-width: 1024px) {
  .courses {
    &__cards {
      grid-template-columns: repeat(2, 1fr);
      &--aside {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media (max-width: 768px) {
  .courses {
    &__cards {
      grid-template-columns: repeat(2, 1fr);
      &--aside {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media (max-width: 560px) {
  .courses {
    &__cards {
      grid-template-columns: repeat(1, 1fr);
      &--aside {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}
</style>
