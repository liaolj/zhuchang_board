<template>
  <div
    class="flex flex-col rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 shadow-lg shadow-slate-900/40"
  >
    <div class="flex items-center justify-between text-sm font-medium text-slate-300">
      <span>{{ title }}</span>
      <slot name="badge"></slot>
    </div>
    <div class="mt-2 flex items-end gap-2">
      <span class="text-3xl font-semibold text-white">
        <slot name="value">{{ valueDisplay }}</slot>
      </span>
      <span v-if="unit" class="pb-1 text-sm text-slate-400">{{ unit }}</span>
    </div>
    <div v-if="trendLabel" class="mt-3 flex items-center gap-2 text-xs text-slate-400">
      <svg v-if="trend === 'up'" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-emerald-400">
        <path
          fill-rule="evenodd"
          d="M14.707 10.707a1 1 0 01-1.414 0L11 8.414V15a1 1 0 11-2 0V8.414L6.707 10.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <svg v-else-if="trend === 'down'" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-rose-400">
        <path
          fill-rule="evenodd"
          d="M5.293 9.293a1 1 0 011.414 0L9 11.586V5a1 1 0 112 0v6.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <svg v-else viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 text-slate-400">
        <path d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" />
      </svg>
      <span>{{ trendLabel }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  value?: number | null;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  delta?: number;
}>();

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('zh-CN');
  }
  return value.toString();
};

const valueDisplay = computed(() => formatNumber(props.value));

const trendLabel = computed(() => {
  if (props.delta === undefined || props.delta === null) return undefined;
  const suffix = props.unit ? (props.unit === '%' ? '个百分点' : props.unit) : '';
  const formatted = Math.abs(props.delta).toString();
  if (props.trend === 'up') return `较昨日提升 ${formatted}${suffix}`;
  if (props.trend === 'down') return `较昨日下降 ${formatted}${suffix}`;
  return `较昨日持平 (${formatted}${suffix})`;
});
</script>
