<template>
  <article class="module" :class="{ 'module--open': isOpen }">
    <button type="button" class="module__header" :aria-expanded="isOpen" @click="isOpen = !isOpen">
      <span>{{ info.name }}</span><span class="module__count">{{ info.lessons?.length || 0 }} <UiIcon icon="chevron" size="size-16" color="surface-400" :deg="isOpen ? '' : 'down'" /></span>
    </button>
    <div v-if="isOpen" class="module__lessons">
      <article v-for="lesson in info.lessons" :key="lesson.id" class="module__lesson" :class="lessonClass(lesson)" @click="openLesson(lesson)">
        <span class="module__lesson-icon">{{ lesson.is_completed ? '✓' : lesson.can_pass ? '▶' : '⌑' }}</span>
        <div class="module__lesson-main"><h4>{{ lesson.name }}</h4><p v-if="lesson.description">{{ lesson.description }}</p></div>
        <span v-if="lesson.is_completed" class="module__lesson-status">{{ t("local.completed") }}</span>
        <UiButton v-else-if="lesson.can_pass" class="module__lesson-button primary-btn" :label="t('local.start')" @action="openLesson(lesson)" />
        <span v-else class="module__lesson-locked">{{ t("local.locked") }}</span>
      </article>
    </div>
  </article>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();
const props = defineProps({ info: { type: Object, required: true } });
const isOpen = ref(false);
const lessonClass = (lesson) => lesson.is_completed ? 'module__lesson--completed' : lesson.can_pass ? 'module__lesson--available' : 'module__lesson--locked';
const openLesson = (lesson) => {
  if (!lesson.can_pass) {
    useNotify({ title: t("local.error"), text: t("local.complete_previous_lesson"), status: "error" });
    return;
  }
  router.push(`/panel/lesson/${lesson.slug}`);
};
</script>

<style lang="scss" scoped>
.module {--module-bg:var(--white);--module-head:var(--surface-100);--module-text:var(--surface-600);--module-muted:var(--surface-400);--module-border:var(--surface-200);--module-hover:rgba($primary-color,.06);overflow:hidden;border:1px solid var(--module-border);border-radius:16px;background:var(--module-bg);box-shadow:0 3px 10px rgba(21,32,51,.05);&__header{display:flex;width:100%;align-items:center;justify-content:space-between;gap:18px;padding:22px 26px;border:0;border-bottom:1px solid transparent;background:var(--module-head);color:var(--module-text);font-size:19px;font-weight:700;text-align:left;cursor:pointer}.module--open .module__header{border-bottom-color:var(--module-border)}&__count{display:flex;align-items:center;gap:10px;color:var(--module-muted);font-size:16px;font-weight:500}&__lessons{display:flex;flex-direction:column;gap:8px;padding:16px}&__lesson{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:16px;padding:15px 18px;border:1px solid transparent;border-radius:11px;color:var(--module-text);cursor:pointer;transition:.2s background}&__lesson:hover,&__lesson--available{background:var(--module-hover);border-color:rgba($primary-color,.16)}&__lesson--locked{opacity:.52;cursor:not-allowed}&__lesson-icon{display:grid;place-items:center;width:29px;height:29px;border-radius:50%;background:rgba($primary-color,.12);color:$primary-color;font-size:15px;font-weight:700}.module__lesson--locked .module__lesson-icon{background:var(--surface-200);color:var(--surface-400)}&__lesson-main h4{margin:0;color:var(--module-text);font-size:16px;line-height:1.35}&__lesson-main p{margin:5px 0 0;color:var(--module-muted);font-size:14px;line-height:1.45}&__lesson-status{color:$primary-color;font-size:14px;font-weight:700}&__lesson-locked{color:var(--module-muted);font-size:14px;font-weight:600}&__lesson-button{height:fit-content;white-space:nowrap}}
:global(html.dark) .module{--module-bg:#151b2d;--module-head:#1c2639;--module-text:#f1f4fa;--module-muted:#9eabc0;--module-border:#2c3850;--module-hover:rgba($primary-color,.13)}
@media(max-width:620px){.module__header{padding:18px;font-size:16px}.module__lessons{padding:10px}.module__lesson{grid-template-columns:auto minmax(0,1fr);padding:14px}.module__lesson-status,.module__lesson-locked,.module__lesson-button{grid-column:2}.module__lesson-button{justify-self:start}}
</style>
