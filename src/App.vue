<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0b1e3c] via-[#0f2550] to-[#132b5d] p-8 text-white">
    <header class="flex flex-wrap items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-bold tracking-[0.3em] text-white/90">智慧猪场运营中枢</h1>
        <p class="mt-2 text-sm text-white/60">一屏掌握生产 · 环境 · 饲喂 · 设备 · 告警 · 分区</p>
      </div>
      <div class="flex flex-wrap items-center gap-4 text-sm text-white/70">
        <div class="flex items-center gap-2">
          <span class="text-white/50">当前时间</span>
          <span class="font-semibold">{{ now }}</span>
        </div>
        <div v-if="config.lastUpdated" class="flex items-center gap-2">
          <span class="text-white/50">配置更新</span>
          <span>{{ config.lastUpdated.toLocaleTimeString() }}</span>
        </div>
        <button
          type="button"
          class="rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20"
          @click="reloadConfig"
        >
          重新拉取配置
        </button>
      </div>
    </header>

    <section class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <span class="text-white/50">模块快捷切换</span>
        <button
          v-for="module in visibleModules"
          :key="module.key"
          type="button"
          class="rounded-full px-4 py-1 text-xs font-semibold transition"
          :class="module.key === activeModule ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-primary/40 hover:text-white'"
          @click="handleSelect(module.key)"
        >
          {{ module.label }}
        </button>
        <span v-if="!config.carousel.enabled" class="ml-auto text-xs text-white/40">轮播已关闭</span>
        <span v-else class="ml-auto text-xs text-white/40">轮播间隔 {{ (config.carousel.interval / 1000).toFixed(0) }}s</span>
      </div>
    </section>

    <main class="mt-6 space-y-8">
      <Transition name="fade" mode="out-in">
        <component
          :is="activeComponent?.component"
          v-if="activeComponent"
          :key="activeComponent.key"
          v-bind="activeComponent.props"
          :active="true"
        />
      </Transition>
    </main>

    <p v-if="config.error" class="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
      配置加载失败：{{ config.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import OverviewPanel from './components/modules/OverviewPanel.vue';
import ProductionPanel from './components/modules/ProductionPanel.vue';
import EnvironmentPanel from './components/modules/EnvironmentPanel.vue';
import FeedingPanel from './components/modules/FeedingPanel.vue';
import EquipmentPanel from './components/modules/EquipmentPanel.vue';
import AlertsPanel from './components/modules/AlertsPanel.vue';
import ZonesPanel from './components/modules/ZonesPanel.vue';
import { useConfigStore } from './stores/config';
import { useCarousel } from './composables/useCarousel';
import type { ModuleFlags } from './types/config';

const config = useConfigStore();

const now = ref(new Date().toLocaleString());
let clockTimer: number | null = null;

onMounted(() => {
  config.loadConfig();
  clockTimer = window.setInterval(() => {
    now.value = new Date().toLocaleString();
  }, 1000);
});

onBeforeUnmount(() => {
  if (clockTimer) {
    window.clearInterval(clockTimer);
  }
});

type ModuleKey = keyof ModuleFlags;

const moduleRegistry = computed(() => {
  const entries: Array<{
    key: ModuleKey;
    label: string;
    component: unknown;
    props: Record<string, unknown>;
  }> = [
    { key: 'overview', label: '总览', component: OverviewPanel, props: { thresholds: config.thresholds } },
    { key: 'production', label: '生产繁殖', component: ProductionPanel, props: {} },
    { key: 'environment', label: '环境舒适度', component: EnvironmentPanel, props: { thresholds: config.thresholds } },
    { key: 'feeding', label: '饲喂用水', component: FeedingPanel, props: { thresholds: config.thresholds } },
    { key: 'equipment', label: '设备能耗', component: EquipmentPanel, props: {} },
    { key: 'alerts', label: '告警中心', component: AlertsPanel, props: {} },
    { key: 'zones', label: '分区地图', component: ZonesPanel, props: { thresholds: config.thresholds } }
  ];
  return entries;
});

const visibleModules = computed(() =>
  moduleRegistry.value.filter((module) => config.modules[module.key])
);

const { activeModule, setActive } = useCarousel(config.carousel, config.modules);

const activeComponent = computed(() => visibleModules.value.find((module) => module.key === activeModule.value));

watch(
  () => visibleModules.value.map((module) => module.key).join('-'),
  (keys) => {
    if (!keys) return;
    const firstKey = visibleModules.value[0]?.key;
    if (firstKey && !visibleModules.value.some((module) => module.key === activeModule.value)) {
      setActive(firstKey);
    }
  },
  { immediate: true }
);

function handleSelect(key: ModuleKey) {
  setActive(key);
}

function reloadConfig() {
  config.loadConfig(true);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
