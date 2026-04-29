<template>
  <nav class="bottom-nav">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="bottom-nav__tab"
      :class="{ 'bottom-nav__tab--active': activeTab === tab.key }"
      @click="activeTab = tab.key"
    >
      <img class="bottom-nav__tab-bg" :src="activeTab === tab.key ? bgActive : bgInactive" alt="" />
      <span class="bottom-nav__tab-label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import bgActive   from '@/assets/images/tab选中背景.png'
import bgInactive from '@/assets/images/tab未选中背景.png'

const tabs = [
  { key: 'overview',  label: '综合态势' },
  { key: 'access',    label: '通行态势' },
  { key: 'security',  label: '安全态势' },
  { key: 'energy',    label: '设备能耗' },
]
const activeTab = ref('overview')
</script>

<style lang="scss" scoped>
.bottom-nav {
  width: 100%;
  height: $bottom-nav-h;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-xl;
  background: linear-gradient(0deg, rgba(0,15,40,0.9) 0%, transparent 100%);

  &__tab {
    position: relative;
    width: 154px;
    height: 39px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: filter 0.2s;

    &:hover { filter: brightness(1.2); }

    &-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    &-label {
      position: relative;
      z-index: 1;
      font-family: 'AlimamaShuHeiTi', 'Alimama ShuHeiTi', sans-serif;
      font-size: 1.23rem;
      font-weight: bold;
      line-height: normal;
      text-align: center;
      letter-spacing: 0.003125em;
      white-space: nowrap;
      background: linear-gradient(182deg, #FFFFFF 35%, #52C0FF 114%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    &--active &-label {
      color: $color-text-1;
      text-shadow: 0 0 8px rgba(0, 174, 255, 0.8);
    }
  }
}
</style>
