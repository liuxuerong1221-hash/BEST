<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dei-supply-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#5AA8FF"/>
      </linearGradient>
    </defs>
    <!-- 风口外框 -->
    <rect x="6" y="14" width="16" height="20" rx="2" stroke="#5AA8FF" stroke-width="1.6" fill="rgba(90,168,255,0.15)"/>
    <!-- 风口百叶 -->
    <line x1="9" y1="19" x2="19" y2="19" stroke="#5AA8FF" stroke-width="1.2"/>
    <line x1="9" y1="24" x2="19" y2="24" stroke="#5AA8FF" stroke-width="1.2"/>
    <line x1="9" y1="29" x2="19" y2="29" stroke="#5AA8FF" stroke-width="1.2"/>
    <!-- 出风箭头：从风口向外 -->
    <g stroke="url(#dei-supply-grad)" stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M26 18 L40 18"/>
      <path d="M36 14 L40 18 L36 22"/>
      <path d="M26 24 L42 24"/>
      <path d="M38 20 L42 24 L38 28"/>
      <path d="M26 30 L40 30"/>
      <path d="M36 26 L40 30 L36 34"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 42 })
</script>
