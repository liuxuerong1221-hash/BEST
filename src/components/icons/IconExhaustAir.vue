<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dei-exhaust-grad" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FF9D4D"/>
      </linearGradient>
    </defs>
    <!-- 风口外框（右侧） -->
    <rect x="26" y="14" width="16" height="20" rx="2" stroke="#FF9D4D" stroke-width="1.6" fill="rgba(255,157,77,0.15)"/>
    <!-- 风口百叶 -->
    <line x1="29" y1="19" x2="39" y2="19" stroke="#FF9D4D" stroke-width="1.2"/>
    <line x1="29" y1="24" x2="39" y2="24" stroke="#FF9D4D" stroke-width="1.2"/>
    <line x1="29" y1="29" x2="39" y2="29" stroke="#FF9D4D" stroke-width="1.2"/>
    <!-- 排风箭头：从外向风口 -->
    <g stroke="url(#dei-exhaust-grad)" stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M22 18 L8 18"/>
      <path d="M12 14 L8 18 L12 22"/>
      <path d="M22 24 L6 24"/>
      <path d="M10 20 L6 24 L10 28"/>
      <path d="M22 30 L8 30"/>
      <path d="M12 26 L8 30 L12 34"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 42 })
</script>
