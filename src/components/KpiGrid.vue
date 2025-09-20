<template>
  <div class="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
    <MetricCard
      v-for="item in kpis"
      :key="item.label"
      :title="item.label"
      :value="item.value"
      :unit="item.unit"
      :trend="item.trend"
      :delta="item.delta"
    />
  </div>
</template>

<script lang="ts" setup>
import type { KpiMetric } from '@/types/dashboard';
import MetricCard from '@/components/cards/MetricCard.vue';

defineProps<{ kpis: KpiMetric[] }>();
</script>
