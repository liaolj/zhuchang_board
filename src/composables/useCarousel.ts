import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import type { CarouselConfig, ModuleFlags } from '../types/config';

export function useCarousel(config: CarouselConfig, modules: ModuleFlags) {
  const activeModule = ref<keyof ModuleFlags>('overview');
  let timer: number | null = null;

  const start = () => {
    stop();
    if (!config.enabled || config.interval <= 0) {
      return;
    }
    const enabledOrder = config.order.filter((key) => modules[key]);
    if (!enabledOrder.length) {
      return;
    }
    let index = enabledOrder.indexOf(activeModule.value);
    if (index === -1) {
      index = 0;
      activeModule.value = enabledOrder[0];
    }
    activeModule.value = enabledOrder[index];
    timer = window.setInterval(() => {
      index = (index + 1) % enabledOrder.length;
      activeModule.value = enabledOrder[index];
    }, config.interval);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const setActive = (module: keyof ModuleFlags) => {
    activeModule.value = module;
    start();
  };

  onMounted(() => {
    start();
  });

  onBeforeUnmount(() => {
    stop();
  });

  watch(
    () => [config.enabled, config.interval, JSON.stringify(config.order), JSON.stringify(modules)],
    () => {
      start();
    }
  );

  return { activeModule, setActive, stop, start };
}
