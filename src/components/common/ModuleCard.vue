<template>
  <section
    :class="[
      'rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-primary/5 transition-all duration-500',
      active ? 'ring-2 ring-primary/80' : 'opacity-90'
    ]"
  >
    <header class="mb-4 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold tracking-wide text-white/90">{{ title }}</h2>
        <p v-if="subtitle" class="text-sm text-white/60">{{ subtitle }}</p>
      </div>
      <slot name="action" />
    </header>
    <div class="space-y-4 text-sm text-white/80">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  active?: boolean;
}>();
</script>
