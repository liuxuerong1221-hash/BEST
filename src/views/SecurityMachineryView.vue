<template>
  <div class="security-mach">
    <div class="security-mach__bg" />
    <img class="security-mach__frame security-mach__frame--left"  src="@/assets/images/left-左.png" alt="" />
    <img class="security-mach__frame security-mach__frame--right" src="@/assets/images/left-右.png" alt="" />

    <AppHeader class="security-mach__header" />

    <main class="security-mach__body">
      <!-- 左侧数据面板 -->
      <aside class="security-mach__left">
        <MachineryMonitorPanel />
        <MachineryAlertTrendPanel />
        <MachineryAlertRecordPanel />
      </aside>

      <!-- 返回 -->
      <button class="security-mach__back" type="button" @click="goBack">
        <span class="security-mach__back-icon" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="mach-back-stroke" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0C84FF" />
                <stop offset="1" stop-color="#1DEAFF" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="19.5" fill="rgba(2,37,79,0.6)" stroke="url(#mach-back-stroke)" />
            <path d="M22.5 13L15.5 20L22.5 27" stroke="#4DF2FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="security-mach__back-text">返回</span>
      </button>

      <!-- 中间留空（背景透出） -->
      <section class="security-mach__center" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import MachineryMonitorPanel     from '@/components/panels/MachineryMonitorPanel.vue'
import MachineryAlertTrendPanel  from '@/components/panels/MachineryAlertTrendPanel.vue'
import MachineryAlertRecordPanel from '@/components/panels/MachineryAlertRecordPanel.vue'

const router = useRouter()
function goBack() { router.push({ name: 'security' }) }
</script>

<style lang="scss" scoped>
.security-mach {
  width: $screen-width;
  height: $screen-height;
  position: relative;
  overflow: hidden;
  background-color: $color-bg;
  font-family: $font-body;

  &__bg {
    position: absolute;
    inset: 0;
    background-image: url('@/assets/images/bg-机房动环.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 0;
  }

  &__frame {
    position: absolute;
    top: 8px;
    bottom: 8px;
    height: calc(100% - 16px);
    width: auto;
    pointer-events: none;
    z-index: 30;

    &--left  { left: 0; }
    &--right { right: 0; }
  }

  &__header {
    position: relative;
    z-index: 10;
    height: $header-h;
  }

  &__body {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: $panel-left-w 1fr;
    height: calc($screen-height - $header-h);
    padding: 0 40px;
    gap: 8px;
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    padding: 24px 0 8px;
  }

  &__center {
    // 空白区域，透出背景
  }

  &__back {
    position: absolute;
    left: calc(40px + #{$panel-left-w} + 24px);
    top: 24px;
    z-index: 12;
    width: 105px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px 0 0;
    border: 0;
    border-radius: 20px;
    background: rgba(10, 15, 21, 0.5);
    color: $color-text-1;
    cursor: pointer;
    outline: none;
    transition: transform 0.18s ease, filter 0.18s ease;

    &:hover {
      transform: translateY(-1px);
      filter: drop-shadow(0 0 10px rgba(29, 234, 255, 0.34));
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(77, 242, 255, 0.45);
    }
  }

  &__back-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    svg { width: 40px; height: 40px; display: block; }
  }

  &__back-text {
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-text-1;
    white-space: nowrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .security-mach__back { transition: none; }
}
</style>
