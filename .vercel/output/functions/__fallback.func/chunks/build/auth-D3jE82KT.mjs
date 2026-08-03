import { O as executeAsync } from '../nitro/nitro.mjs';
import { q as defineNuxtRouteMiddleware, m as useAuthStore, n as navigateTo } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import 'node:url';
import 'ipx';
import 'pinia';
import 'perfect-debounce';
import '@vue/shared';
import 'maska';
import 'vue/server-renderer';
import '@capacitor/core';
import '@capacitor/preferences';
import '@capacitor/push-notifications';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const auth = defineNuxtRouteMiddleware(async () => {
  let __temp, __restore;
  const authStore = useAuthStore();
  if (!authStore.initialized) {
    [__temp, __restore] = executeAsync(() => authStore.init()), await __temp, __restore();
  }
  if (!authStore.isToken) {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-D3jE82KT.mjs.map
