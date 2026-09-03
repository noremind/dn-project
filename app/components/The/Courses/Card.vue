<template>
  <article class="course-card" :class="`course-card--${courseState.tone}`">
    <div class="course-card__visual" @click="openCourse">
      <span class="course-card__status">{{ courseState.label }}</span>
      <span class="course-card__symbol" aria-hidden="true">{{ courseState.symbol }}</span>
    </div>
    <div class="course-card__content">
      <h3 class="course-card__title" @click="openCourse">{{ info.name }}</h3>
      <div class="course-card__meta"><span>{{ info.modules_count || 0 }} {{ t("local.modules").toLocaleLowerCase() }}</span><span>{{ info.lessons_count || 0 }} {{ t("local.lessons").toLocaleLowerCase() }}</span></div>
      <div class="course-card__progress"><div><span>{{ t("local.progress") }}</span><b>{{ safeProgress }}%</b></div><div class="course-card__track"><i :style="{ width: `${safeProgress}%` }" /></div></div>
      <footer class="course-card__footer"><b class="course-card__price">{{ formatDigits(info.price || 10000) }} ₸</b><button type="button" class="course-card__action" @click="checkStatus(info.user_status)">{{ courseState.action }}</button></footer>
    </div>
  </article>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();
const props = defineProps({ info: { type: Object, required: true } });
const safeProgress = computed(() => Math.max(0, Math.min(100, Math.round(props.info.user_progress?.progress || 0))));
const courseState = computed(() => {
  const status = props.info.user_status;
  if (status === "completed") return { tone: "completed", symbol: "⌑", label: t("local.completed"), action: t("local.certificate") };
  if (status === "continue" || status === "in_progress") return { tone: "progress", symbol: "♨", label: t("local.in_progress"), action: t("local.continue") };
  return { tone: "new", symbol: "ϟ", label: t("local.not_started"), action: t("local.start") };
});
const openCourse = () => { if (props.info.user_status !== "buy") router.push(`/panel/course/${props.info.slug}`); };
const checkStatus = async (status) => {
  if (status === "buy") return;
  if (status === "start" || status === "not_started") await useApi().client({ url: `courses/${props.info.slug}/start`, method: "post" });
  router.push(`/panel/course/${props.info.slug}`);
};
</script>

<style lang="scss" scoped>
.course-card {--card-bg:#fff;--card-visual:#edf3fb;--card-title:#1d2434;--card-muted:#778196;--card-track:#dce4ef;--card-border:#e2e8f1;--card-accent:#8993a7;overflow:hidden;border:1px solid var(--card-border);border-radius:18px;background:var(--card-bg);box-shadow:0 8px 22px rgba(21,31,47,.09);transition:transform .2s ease,box-shadow .2s ease;&:hover{transform:translateY(-3px);box-shadow:0 13px 28px rgba(21,31,47,.15)}&__visual{position:relative;display:grid;height:180px;place-items:center;cursor:pointer;background:var(--card-visual)}&__status{position:absolute;top:14px;right:14px;padding:6px 10px;border-radius:7px;color:var(--card-accent);background:color-mix(in srgb,var(--card-accent) 14%,transparent);font-size:13px;font-weight:700}&__symbol{color:var(--card-accent);font-size:59px;line-height:1;font-family:Georgia,serif}&__content{padding:21px 20px 18px;background:var(--card-bg)}&__title{min-height:50px;margin:0;color:var(--card-title);font-family:Georgia,"Times New Roman",serif;font-size:18px;line-height:1.38;cursor:pointer}&__meta{display:flex;gap:17px;margin-top:12px;color:var(--card-muted);font-size:14px}&__meta span+span::before{content:"•";margin-right:17px}&__progress{margin-top:20px}&__progress>div:first-child{display:flex;justify-content:space-between;color:var(--card-muted);font-size:13px}&__progress b{color:var(--card-title)}&__track{height:10px;overflow:hidden;margin-top:9px;padding:1px;border:1px solid var(--card-track);border-radius:99px}&__track i{display:block;height:100%;border-radius:5px;background:repeating-linear-gradient(90deg,$primary-color 0,$primary-color calc(33.333% - 4px),transparent calc(33.333% - 4px),transparent 33.333%)}&__footer{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:26px;padding-top:10px;border-top:1px solid var(--card-border)}&__price{color:var(--card-title);font-size:17px}&__action{padding:11px 16px;border:1px solid color-mix(in srgb,var(--card-accent) 55%,var(--card-border));border-radius:10px;background:transparent;color:var(--card-accent);font-size:14px;font-weight:700;cursor:pointer}&--progress{--card-accent:#efad37;--card-visual:#fff8e8}&--progress .course-card__action{border:0;background:$primary-color;color:var(--white-fixed)}&--completed{--card-accent:#42bd83;--card-visual:#eaf9f1}&--completed .course-card__action{border:0;background:#e1f6eb}}
:global(html.dark) .course-card{--card-bg:#151b2d;--card-visual:#202940;--card-title:#f3f5fb;--card-muted:#9aa4b7;--card-track:#303b54;--card-border:#29344a;--card-accent:#7f8a9f;box-shadow:0 8px 22px rgba(0,0,0,.22)}
:global(html.dark) .course-card--progress{--card-visual:#202940}:global(html.dark) .course-card--completed{--card-visual:#202940}@media(max-width:560px){.course-card__visual{height:155px}}
</style>
