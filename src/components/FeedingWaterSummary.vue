<template>
  <div class="grid gap-3 md:grid-cols-2">
    <div class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
      <div class="flex items-center justify-between text-sm text-slate-300">
        <span>今日饲料下发</span>
        <span>计划 {{ feeding.planned }} 吨</span>
      </div>
      <div class="mt-2 text-3xl font-semibold text-white">{{ feeding.issued }} 吨</div>
      <div class="mt-1 text-xs text-slate-400">达成率 {{ achievementRate }}%</div>
    </div>
    <div class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
      <div class="flex items-center justify-between text-sm text-slate-300">
        <span>今日用水量</span>
        <span>近7天均值 {{ weeklyAverage }} 吨</span>
      </div>
      <div class="mt-2 text-3xl font-semibold text-white">{{ waterToday }} 吨</div>
      <div class="mt-1 text-xs text-slate-400">已接入水表 · 正常运行</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { TrendPoint } from '@/types/dashboard';

const props = defineProps<{
  feeding: { planned: number; issued: number };
  waterToday: number;
  waterTrend: TrendPoint[];
}>();

const achievementRate = computed(() =>
  props.feeding.planned === 0
    ? 0
    : Math.round((props.feeding.issued / props.feeding.planned) * 100)
);

const weeklyAverage = computed(() => {
  if (!props.waterTrend.length) return 0;
  const total = props.waterTrend.reduce((sum, point) => sum + (point.value ?? 0), 0);
  return Math.round((total / props.waterTrend.length) * 10) / 10;
});
</script>
