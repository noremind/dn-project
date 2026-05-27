<template>
  <section class="courses">
    <div class="courses__wrapper">
      <h2 class="courses__title hidden">{{ t("local.courses") }}</h2>

      <transition-group tag="div" name="card-list" class="courses__cards">
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
  }
  &__preview {
    object-fit: cover;
    border-radius: $border-r-md;
  }
}
</style>
