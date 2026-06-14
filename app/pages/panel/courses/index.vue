<template>
  <section class="courses">
    <div class="courses__wrapper">
      <h2 class="courses__title hidden">{{ t("local.courses") }}</h2>

      <UiTabs :tabs="tabs" v-model="oneTab" type="line-border" />

      <transition-group
        tag="div"
        name="card-list"
        class="courses__cards"
        :class="{ 'courses__cards--aside': asideStore.isOpen }"
        v-if="courses?.length"
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

const tabs = computed(() => [
  {
    id: 1,
    name: t("local.all_courses"),
  },
  {
    id: 2,
    name: t("local.my_courses"),
  },
]);
const oneTab = ref(tabs.value[0]);

useSeo({
  title: t("local.courses"),
  description: t("local.courses"),
});

const courses = ref(null);

const pagination = ref(null);
const currentPage = ref(+route.query?.page || 1);

const status = ref(null);

const getCourses = async () => {
  courses.value = null;
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

const getAuthProfileCourses = async () => {
  courses.value = null;
  status.value = "pending";
  await useApi()
    .client({
      url: "/auth/profile/courses",
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

watch(
  () => oneTab.value,
  (newVal) => {
    if (newVal.id === 1) {
      getCourses();
    }
    if (newVal.id === 2) {
      getAuthProfileCourses();
    }
  },
);
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
