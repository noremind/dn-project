<template>
  <aside
    class="aside"
    :class="{
      'aside--mobile': asideStore.isMobileOpen,
      'aside--hide': asideStore.isOpen,
    }"
  >
    <div class="aside__wrapper">
      <nav class="aside__nav">
        <ul class="aside__list aside__list--block">
          <li class="aside__group" v-for="list in navs" :key="list.name">
            <button
              type="button"
              class="aside__group-title"
              :class="{ 'aside__group-title--collapsed': asideStore.isOpen && !asideStore.isMobileOpen }"
              :aria-expanded="isGeneralOpen"
              @click="isGeneralOpen = !isGeneralOpen"
            >
              <span>{{ asideStore.isOpen && !asideStore.isMobileOpen ? "------" : list.name }}</span>
              <UiIcon
                class="aside__aside-toggle"
                icon="chevron"
                color="black"
                size="size-16"
                :deg="asideStore.isOpen && !asideStore.isMobileOpen ? 'right' : 'left'"
                @click.stop="asideStore.toggle()"
              />
            </button>
            <ul v-show="isGeneralOpen" class="aside__list">
              <li
                class="aside__li"
                :class="{
                  'aside__li--active':
                    innerList.path === titleStore.currentActiveRoute,
                }"
                v-for="innerList in list.lists"
                :key="innerList.id"
              >
                <nuxt-link :to="innerList.route" class="aside__link">
                  <UiIcon
                    :icon="innerList.icon"
                    size="size-20"
                    :color="
                      innerList.path === titleStore.currentActiveRoute
                        ? 'white-fixed'
                        : 'black'
                    "
                  />
                  <p
                    class="aside__text"
                    :class="{ 'aside__text--hide': asideStore.isOpen }"
                  >
                    {{ innerList.name }}
                  </p>
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
const route = useRoute();
const asideStore = useAsideStore();
const titleStore = useTitleStore();
const authStore = useAuthStore();
const user = computed(() => authStore.getUser);
const { t } = useI18n();
const isGeneralOpen = ref(true);

const navs = computed(() => {
  let showNav = [
    {
      id: 1,
      name: t("local.general"),
      lists: [
        {
          name: t("local.main"),
          route: { path: "/panel" },
          path: "/panel",
          icon: "menu-i",
        },
        {
          name: t("local.courses"),
          route: { path: "/panel/courses" },
          path: "/panel/courses",
          icon: "monitor-i",
        },
        {
          name: t("local.my_certificates"),
          route: { path: "/panel/certificates" },
          path: "/panel/certificates",
          icon: "certificate-star-i",
        },
      ],
    },
  ];

  return showNav;
});

onMounted(() => {
  !localStorage.getItem("isOpenAside") ? asideStore.setOpen(true) : null;
});

const closeMobileAside = () => {
  asideStore.isMobileOpen = false;
};

watch(
  () => route.fullPath,
  () => {
    closeMobileAside();
  },
);
</script>

<style lang="scss" scoped>
.aside {
  max-width: 270px;
  width: 100%;
  transition: 0.225s max-width;
  &--hide {
    max-width: 61px;
  }
  &__wrapper {
    width: 100%;
    background-color: var(--white);
    border-radius: $border-r-md;
    padding: $padding-sm 0;
    box-shadow: $box-shadow;
    overflow-y: scroll;
    max-height: 97vh;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0ch;
      height: 0px;
    }
  }
  &__dark {
    &--mobile {
      display: none;
    }
  }
  &__group {
    padding: $padding-sm;
  }
  &__group-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0 0 16px;
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: var(--surface-400);
    white-space: nowrap;
    &--collapsed {
      justify-content: center;
      span { display: none; }
    }
  }
  &__aside-toggle {
    flex-shrink: 0;
  }
  &__list {
    display: flex;
    flex-direction: column;
    // gap: $gap-xs;
  }
  &__link {
    display: flex;
    gap: $gap-md;
    align-items: center;
  }
  &__locale {
    visibility: hidden;
  }
  &__icon {
    &--mobile {
      display: none;
    }
  }
  &__text {
    font-weight: 500;
    color: var(--surface-400);
    white-space: nowrap;
    transition: 0.2s opacity;
    &--hide {
      display: none;
    }
  }
  &__li {
    padding: $padding-sm;
    border-radius: $border-r-md;
    &--first {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    &--end {
      justify-content: space-between;
    }
    &--active {
      background-color: $primary-color; // ???
      & .aside__text {
        color: var(--white-fixed);
      }
    }
  }
}

@media (max-width: 768px) {
  .aside {
    display: none;
    &--mobile {
      max-width: 100%;
      width: 100%;
      // height: 100vh;
      // background-color: var(--white);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__wrapper {
      max-width: 450px;
    }
    &__dark {
      &--mobile {
        display: block;
      }
    }
    &__text {
      &--hide {
        display: block;
      }
    }
    &__locale {
      visibility: visible;
      display: block;
    }
    &__icon {
      display: none;
      &--mobile {
        display: block;
      }
    }
  }
}
</style>
