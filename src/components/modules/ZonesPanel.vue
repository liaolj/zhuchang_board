<template>
  <ModuleCard title="分区与地图" subtitle="栋舍运行摘要" :active="active">
    <div class="flex flex-col gap-6 lg:flex-row">
      <aside class="w-full max-w-xs space-y-2">
        <button
          v-for="zone in zones"
          :key="zone.name"
          type="button"
          class="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left text-sm transition"
          :class="selectedZone.name === zone.name ? 'bg-primary/30 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'"
          @click="selectedZone = zone"
        >
          <span>{{ zone.name }}</span>
          <span class="text-xs text-white/60">健康 {{ zone.healthIndex }}</span>
        </button>
      </aside>
      <div class="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 class="text-lg font-semibold text-white">{{ selectedZone.name }}</h3>
        <p class="mt-1 text-sm text-white/60">存栏 {{ selectedZone.livestock }} · 告警 {{ selectedZone.alerts }}</p>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-white/10 p-4 text-center">
            <p class="text-xs text-white/60">健康指数</p>
            <p class="text-3xl font-semibold text-success">{{ selectedZone.healthIndex }}</p>
          </div>
          <div class="rounded-xl bg-white/10 p-4 text-center">
            <p class="text-xs text-white/60">温湿度</p>
            <p class="text-lg font-semibold text-white">
              {{ selectedZone.environment.temperature.toFixed(1) }}°C /
              {{ selectedZone.environment.humidity.toFixed(0) }}%
            </p>
          </div>
        </div>
        <p class="mt-6 text-sm text-white/70">
          环境状态：
          <span :class="statusClass(selectedZone.environment.temperature, 'temperature')">
            温度 {{ selectedZone.environment.temperature.toFixed(1) }}°C
          </span>
          ，
          <span :class="statusClass(selectedZone.environment.humidity, 'humidity')">
            湿度 {{ selectedZone.environment.humidity.toFixed(0) }}%
          </span>
          。
        </p>
      </div>
    </div>
  </ModuleCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ModuleCard from '../common/ModuleCard.vue';
import { zoneList } from '../../data/mock';
import type { ThresholdConfig } from '../../types/config';

const props = defineProps<{ active?: boolean; thresholds: ThresholdConfig }>();

const zones = zoneList;
const selectedZone = ref(zones[0]);

const thresholds = computed(() => props.thresholds);

function statusClass(value: number, key: keyof ThresholdConfig) {
  const range = thresholds.value[key];
  if (range.min != null && value < range.min) return 'text-warning';
  if (range.max != null && value > range.max) return 'text-danger';
  return 'text-success';
}
</script>
