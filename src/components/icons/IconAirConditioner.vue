<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dei-ac-grad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#2ED0B0"/>
      </linearGradient>
    </defs>
    <!-- 空调主体 -->
    <rect x="6" y="12" width="36" height="16" rx="3" fill="url(#dei-ac-grad)" opacity="0.95"/>
    <rect x="6" y="12" width="36" height="6" rx="3" fill="#2ED0B0" opacity="0.4"/>
    <!-- 出风口 -->
    <rect x="10" y="22" width="28" height="1.4" rx="0.7" fill="#0A4D40" opacity="0.7"/>
    <rect x="10" y="25" width="28" height="1.4" rx="0.7" fill="#0A4D40" opacity="0.7"/>
    <!-- 控制面板 -->
    <circle cx="36" cy="15" r="1" fill="#4DF2FF"/>
    <!-- 风 -->
    <g stroke="#2ED0B0" stroke-width="1.4" stroke-linecap="round" fill="none">
      <path d="M14 32c1.5 1.5 1.5 4 0 5.5" opacity="0.85"/>
      <path d="M24 32c1.5 1.5 1.5 4 0 5.5" opacity="0.7"/>
      <path d="M34 32c1.5 1.5 1.5 4 0 5.5" opacity="0.55"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 42 })
</script>
