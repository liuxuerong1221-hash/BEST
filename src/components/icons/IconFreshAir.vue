<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dei-fan-grad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FFE92B"/>
      </linearGradient>
    </defs>
    <!-- 中心圆 -->
    <circle cx="24" cy="24" r="4" fill="#FFE92B"/>
    <!-- 三叶扇 -->
    <g fill="url(#dei-fan-grad)" opacity="0.95">
      <path d="M24 6c-3.5 0-6.5 2.5-7.5 5.8 1.8 1.7 4.4 2.7 7.5 2.7 1.8 0 3.4-.4 4.8-1.1 1-3.4-.4-6.5-3.2-7.2-.5-.1-1-.2-1.6-.2z"/>
      <path d="M40.5 28c1.6-3.1.7-6.8-1.7-9-2.3.5-4.5 2-6.1 4.4-.9 1.4-1.4 3-1.6 4.4 2 2.9 5.2 4 7.9 2.8.6-.2 1.1-.5 1.5-.8z" transform="rotate(120 24 24)"/>
      <path d="M40.5 28c1.6-3.1.7-6.8-1.7-9-2.3.5-4.5 2-6.1 4.4-.9 1.4-1.4 3-1.6 4.4 2 2.9 5.2 4 7.9 2.8.6-.2 1.1-.5 1.5-.8z" transform="rotate(240 24 24)"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 42 })
</script>
