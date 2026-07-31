import { l as useNotifyStore } from './server.mjs';

function useNotify({ title, text, status }) {
  const notifyStore = useNotifyStore();
  notifyStore.addNotification({ title, text, status });
}

export { useNotify as u };
//# sourceMappingURL=useNotify-Zw0dZA8p.mjs.map
