<template>
  <ModuleCard title="设备与能耗" subtitle="运行状态与健康指数" :active="active">
    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-widest text-white/60">关键设备状态</h3>
        <ul class="mt-3 space-y-2" role="list">
          <li
            v-for="device in devices"
            :key="device.name"
            class="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
          >
            <span class="text-white/70">{{ device.name }}</span>
            <span :class="['rounded-full px-3 py-1 text-xs font-semibold', statusClass(device.status)]">
              {{ statusLabel(device.status) }}
            </span>
          </li>
        </ul>
      </div>
      <div class="space-y-4">
        <div class="rounded-2xl bg-white/5 p-5">
          <p class="text-xs text-white/60">今日能耗</p>
          <div class="mt-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p class="text-xs text-white/60">电 (kWh)</p>
              <p class="text-xl font-semibold text-white">{{ energy.power }}</p>
            </div>
            <div>
              <p class="text-xs text-white/60">水 (m³)</p>
              <p class="text-xl font-semibold text-white">{{ energy.water }}</p>
            </div>
            <div>
              <p class="text-xs text-white/60">气 (Nm³)</p>
              <p class="text-xl font-semibold text-white">{{ energy.gas }}</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl bg-white/5 p-5">
          <p class="text-xs text-white/60">设备健康指数</p>
          <div class="mt-4 grid grid-cols-3 gap-3 text-center">
            <div class="rounded-xl bg-success/10 p-3">
              <p class="text-xs text-white/60">正常</p>
              <p class="text-xl font-semibold text-success">{{ health.normal }}</p>
            </div>
            <div class="rounded-xl bg-warning/10 p-3">
              <p class="text-xs text-white/60">关注</p>
              <p class="text-xl font-semibold text-warning">{{ health.attention }}</p>
            </div>
            <div class="rounded-xl bg-danger/10 p-3">
              <p class="text-xs text-white/60">异常</p>
              <p class="text-xl font-semibold text-danger">{{ health.abnormal }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModuleCard>
</template>

<script setup lang="ts">
import ModuleCard from '../common/ModuleCard.vue';
import { deviceHealth as health, energyUsage as energy, equipmentStatus as devices } from '../../data/mock';

defineProps<{ active?: boolean }>();

function statusClass(status: string) {
  if (status === 'online') return 'bg-success/20 text-success';
  if (status === 'warning') return 'bg-warning/20 text-warning';
  return 'bg-danger/20 text-danger';
}

function statusLabel(status: string) {
  if (status === 'online') return '在线';
  if (status === 'warning') return '关注';
  return '离线';
}
</script>
