<template>
  <div class="player">
    <div class="player__wrapper">
      <div
        ref="player"
        class="player__video"
        data-plyr-provider="youtube"
        :data-plyr-embed-id="videoId"
      ></div>
    </div>
  </div>
</template>

<script setup>
const { $plyr } = useNuxtApp();

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
});

const player = ref(null);

onMounted(() => {
  new $plyr(player.value, {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
      "pip",
      "fullscreen",
    ],
    settings: ["quality", "speed"],
    keyboard: { focused: true, global: true },
    youtube: {
      noCookie: false,
      rel: 0,
      showinfo: 0,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      enablejsapi: 1,
      hd: 1,
      fs: 1,
    },
  });
});
</script>

<style lang="scss" scoped>
.plyr {
  &__player {
    border-radius: $border-r-md;
    overflow: hidden;
    box-shadow: $box-shadow;
  }
}
</style>
