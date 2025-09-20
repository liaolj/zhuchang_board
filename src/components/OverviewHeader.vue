<template>
  <div class="flex flex-col gap-2 rounded-3xl border border-slate-700/60 bg-slate-800/70 p-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-white">智慧猪场生产运营总览</h1>
        <p class="text-sm text-slate-400">全场生产 · 环境 · 饲喂 · 设备 · 告警一屏尽览</p>
      </div>
      <div class="text-right text-sm text-slate-300">
        <div>当前时间：{{ now }}</div>
        <div>实时刷新：{{ config.refresh.realtime }}s ｜ 告警刷新：{{ config.refresh.alerts }}s</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { DashboardConfig } from '@/types/dashboard';

const props = defineProps<{ config: DashboardConfig }>();

const now = computed(() => new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'full',
  timeStyle: 'medium',
}).format(new Date()));
</script>
