<template>
  <div class="grid gap-3 md:grid-cols-3">
    <div
      v-for="metric in energy"
      :key="metric.label"
      class="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4"
    >
      <div class="text-sm text-slate-400">{{ metric.label }}</div>
      <div class="mt-2 text-3xl font-semibold text-white">
        {{ metric.value ?? 'N/A' }}
        <span class="ml-1 text-base text-slate-400">{{ metric.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EnergyMetric } from '@/types/dashboard';

defineProps<{ energy: EnergyMetric[] }>();
</script>
