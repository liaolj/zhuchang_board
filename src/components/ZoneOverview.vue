<template>
  <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="zone in zones"
      :key="zone.id"
      class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4"
    >
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium text-white">{{ zone.name }}</span>
        <span :class="healthClass(zone.healthIndex)">健康 {{ zone.healthIndex }}%</span>
      </div>
      <div class="mt-2 flex items-center gap-2 text-xs text-slate-400">
        <span>告警 {{ zone.alerts }}</span>
        <span>设备 在线 {{ zone.equipment.online }} / 故障 {{ zone.equipment.fault }}</span>
      </div>
      <div class="mt-2 rounded-xl bg-slate-900/40 p-3 text-xs text-slate-300">
        <div class="flex items-center justify-between">
          <span>{{ zone.environment.label }}</span>
          <span :class="statusClass(zone.environment.status)">
            {{ statusLabel(zone.environment.status) }}
          </span>
        </div>
        <div class="mt-1 text-lg font-semibold text-white">
          {{ zone.environment.value ?? 'N/A' }}
        </div>
        <div class="mt-2 text-slate-400">存栏 {{ zone.livestock.toLocaleString('zh-CN') }} 头</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ZoneSummary } from '@/types/dashboard';

defineProps<{ zones: ZoneSummary[] }>();

const healthClass = (value: number) => {
  if (value >= 85) return 'text-emerald-400';
  if (value >= 70) return 'text-warning';
  return 'text-danger';
};

const statusLabel = (status: ZoneSummary['environment']['status']) => {
  if (status === 'normal') return '正常';
  if (status === 'warning') return '关注';
  return '超标';
};

const statusClass = (status: ZoneSummary['environment']['status']) => {
  if (status === 'normal') return 'text-emerald-400';
  if (status === 'warning') return 'text-warning';
  return 'text-danger';
};
</script>
