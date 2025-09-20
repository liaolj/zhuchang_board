<template>
  <div class="flex flex-col gap-3">
    <div class="grid gap-3 md:grid-cols-3">
      <div class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 text-center">
        <div class="text-sm text-slate-400">在线</div>
        <div class="mt-2 text-3xl font-semibold text-emerald-400">{{ summary.normal }}</div>
      </div>
      <div class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 text-center">
        <div class="text-sm text-slate-400">关注</div>
        <div class="mt-2 text-3xl font-semibold text-warning">{{ summary.warning }}</div>
      </div>
      <div class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 text-center">
        <div class="text-sm text-slate-400">异常</div>
        <div class="mt-2 text-3xl font-semibold text-danger">{{ summary.critical }}</div>
      </div>
    </div>
    <div class="grid gap-2">
      <div
        v-for="item in equipment"
        :key="item.name"
        class="flex items-center gap-3 rounded-2xl border border-slate-700/40 bg-slate-900/40 px-3 py-2 text-sm"
      >
        <span class="w-36 text-slate-200">{{ item.name }}</span>
        <span class="text-slate-400">{{ item.location ?? '未标注' }}</span>
        <span class="ml-auto" :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EquipmentStatus } from '@/types/dashboard';

defineProps<{
  equipment: EquipmentStatus[];
  summary: { normal: number; warning: number; critical: number };
}>();

const statusLabel = (status: EquipmentStatus['status']) => {
  if (status === 'online') return '在线';
  if (status === 'offline') return '离线';
  return '故障';
};

const statusClass = (status: EquipmentStatus['status']) => {
  if (status === 'online') return 'rounded bg-emerald-500/20 px-3 py-1 text-emerald-300';
  if (status === 'offline') return 'rounded bg-slate-600/40 px-3 py-1 text-slate-200';
  return 'rounded bg-danger/20 px-3 py-1 text-danger';
};
</script>
