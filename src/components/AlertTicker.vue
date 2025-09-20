<template>
  <div class="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/60">
    <div class="flex items-center gap-2 border-b border-slate-700/60 px-4 py-2 text-sm text-slate-300">
      <span class="rounded bg-rose-500/20 px-2 py-0.5 text-rose-300">告警</span>
      <span>最近 {{ alerts.length }} 条</span>
      <span class="ml-auto text-xs text-slate-500">刷新周期：{{ refreshInterval }}s</span>
    </div>
    <div class="flex flex-col gap-1 p-3 text-sm">
      <transition-group name="ticker" tag="div" class="flex flex-col gap-1">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="flex items-center gap-3 rounded-xl bg-slate-900/40 px-3 py-2"
        >
          <span :class="levelClass(alert.level)">{{ levelLabel(alert.level) }}</span>
          <span class="text-slate-400">{{ alert.timestamp }}</span>
          <span class="text-slate-200">{{ alert.module }} · {{ alert.location }}</span>
          <span class="ml-auto text-primary">{{ alert.message }}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AlertItem } from '@/types/dashboard';

defineProps<{
  alerts: AlertItem[];
  refreshInterval: number;
}>();

const levelLabel = (level: AlertItem['level']) => {
  if (level === 'critical') return '严重';
  if (level === 'warning') return '预警';
  return '提示';
};

const levelClass = (level: AlertItem['level']) => {
  if (level === 'critical') return 'rounded bg-danger/20 px-2 py-0.5 text-danger text-xs';
  if (level === 'warning') return 'rounded bg-warning/20 px-2 py-0.5 text-warning text-xs';
  return 'rounded bg-slate-600/40 px-2 py-0.5 text-slate-200 text-xs';
};
</script>

<style scoped>
.ticker-enter-active,
.ticker-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.ticker-enter-from,
.ticker-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
