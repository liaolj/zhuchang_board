<template>
  <ModuleCard title="生产与繁殖" subtitle="阶段存栏与繁殖效率" :active="active">
    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 class="mb-3 text-sm font-semibold uppercase tracking-widest text-white/60">分阶段存栏</h3>
        <ul class="space-y-2 text-sm" role="list">
          <li
            v-for="item in inventory"
            :key="item.stage"
            class="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2"
          >
            <span class="text-white/70">{{ item.stage }}</span>
            <span class="font-semibold text-white">{{ item.value.toLocaleString() }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="mb-3 text-sm font-semibold uppercase tracking-widest text-white/60">繁殖漏斗</h3>
        <div class="space-y-3">
          <div v-for="step in funnel" :key="step.step" class="space-y-1">
            <div class="flex items-center justify-between text-xs text-white/60">
              <span>{{ step.step }}</span>
              <span>{{ step.value }}</span>
            </div>
            <div class="h-3 rounded-full bg-white/10">
              <div
                class="h-3 rounded-full bg-gradient-to-r from-primary to-cyan-400"
                :style="{ width: funnelWidth(step.value) }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <IndicatorCard label="分娩率" :value="`${indicators.farrowingRate.toFixed(1)}%`" status="good" />
      <IndicatorCard label="窝均活产" :value="indicators.litterLive.toFixed(1)" status="good" />
      <IndicatorCard label="窝均断奶" :value="indicators.litterWeaned.toFixed(1)" status="warning" />
      <IndicatorCard label="返情率" :value="`${indicators.returnRate.toFixed(1)}%`" status="warning" />
      <IndicatorCard label="死胎率" :value="`${indicators.stillbornRate.toFixed(1)}%`" status="good" />
    </div>
  </ModuleCard>
</template>

<script setup lang="ts">
import ModuleCard from '../common/ModuleCard.vue';
import IndicatorCard from '../common/IndicatorCard.vue';
import {
  productionInventory as inventory,
  reproductionFunnel as funnel,
  reproductionIndicators as indicators
} from '../../data/mock';

defineProps<{ active?: boolean }>();

function funnelWidth(value: number) {
  const base = funnel[0]?.value ?? 1;
  return `${Math.round((value / base) * 100)}%`;
}
</script>
