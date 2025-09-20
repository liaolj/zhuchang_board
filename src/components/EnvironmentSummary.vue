<template>
  <div class="grid gap-3 md:grid-cols-5">
    <div
      v-for="item in environment"
      :key="item.label"
      class="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4"
    >
      <div class="flex items-center justify-between text-sm text-slate-300">
        <span>{{ item.label }}</span>
        <span :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span>
      </div>
      <div class="mt-2 flex items-baseline gap-1 text-2xl font-semibold text-white">
        <span>{{ formatValue(item.value) }}</span>
        <span v-if="item.unit" class="text-sm text-slate-400">{{ item.unit }}</span>
      </div>
      <div class="mt-1 text-xs text-slate-400">
        <span v-if="item.threshold.min !== undefined">≥ {{ item.threshold.min }} </span>
        <span v-if="item.threshold.max !== undefined">≤ {{ item.threshold.max }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ThresholdValue } from '@/types/dashboard';

defineProps<{ environment: ThresholdValue[] }>();

const statusLabel = (status: ThresholdValue['status']) => {
  if (status === 'normal') return '正常';
  if (status === 'warning') return '关注';
  return '超标';
};

const statusClass = (status: ThresholdValue['status']) => {
  if (status === 'normal') return 'text-emerald-400';
  if (status === 'warning') return 'text-warning';
  return 'text-danger';
};

const formatValue = (value: number | null) => (value === null ? 'N/A' : value);
</script>
