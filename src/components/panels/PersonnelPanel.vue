<template>
  <BasePanel class="personnel-panel" title="人员通行">
    <div class="personnel-panel__body">

      <!-- 左侧：圆环 + 总数 -->
      <div class="personnel-panel__left">
        <div class="personnel-panel__ring-wrap">
          <!-- 外虚线圈 -->
          <svg class="personnel-panel__ring-outer" viewBox="0 0 110 110" fill="none">
            <circle cx="55" cy="55" r="52" stroke="#00AEFF" stroke-width="1"
                    stroke-dasharray="5 4" stroke-opacity="0.5"/>
          </svg>
          <!-- 内实线圈 -->
          <svg class="personnel-panel__ring-inner" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="rgba(0,174,255,0.25)" stroke-width="1"/>
            <circle class="personnel-panel__ring-progress" cx="40" cy="40" r="36" fill="none" stroke="#00AEFF" stroke-width="1.5"
                    stroke-dasharray="175 50" stroke-dashoffset="20" stroke-linecap="round"
                    transform="rotate(-90 40 40)"/>
          </svg>
          <MetricBlock
            class="personnel-panel__ring-text"
            value="342"
            unit="人"
            unit-placement="below"
            tone="primary"
            size="lg"
            align="center"
          />
        </div>
        <span class="personnel-panel__total-label">人员通行总数</span>
      </div>

      <!-- 垂直分割线 -->
      <div class="personnel-panel__vdivider" />

      <!-- 右侧：进出统计 -->
      <div class="personnel-panel__stats">
        <div class="personnel-panel__stat-item">
          <img class="personnel-panel__stat-icon" src="@/assets/images/icon/今日进入次数.svg" alt="" />
          <div class="personnel-panel__stat-info">
            <span class="personnel-panel__stat-label">今日进入人次</span>
            <div class="personnel-panel__stat-value">
              <span class="personnel-panel__stat-key">总数：</span>
              <span class="personnel-panel__stat-num">200</span>
            </div>
          </div>
        </div>

        <div class="personnel-panel__hdivider" />

        <div class="personnel-panel__stat-item">
          <img class="personnel-panel__stat-icon" src="@/assets/images/icon/离开.svg" alt="" />
          <div class="personnel-panel__stat-info">
            <span class="personnel-panel__stat-label">今日离开人次</span>
            <div class="personnel-panel__stat-value">
              <span class="personnel-panel__stat-key">总数：</span>
              <span class="personnel-panel__stat-num">142</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import BasePanel from '@/components/common/BasePanel.vue'
import MetricBlock from '@/components/common/MetricBlock.vue'
</script>

<style lang="scss" scoped>
.personnel-panel {
  gap: $spacing-md;

  &__body {
    display: flex;
    align-items: stretch;
    min-height: 140px;
  }

  // 左侧区块
  &__left {
    flex-shrink: 0;
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    background: linear-gradient(135deg, rgba(0, 60, 120, 0.35) 0%, rgba(0, 30, 70, 0.2) 100%);
    border-radius: $radius-sm;
    padding: $spacing-sm 0;
    position: relative;

    // 左上角装饰角
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-left: 8px solid $color-primary;
      border-bottom: 8px solid transparent;
    }
  }

  &__ring-wrap {
    position: relative;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
      content: '';
      position: absolute;
      inset: 18px;
      border: 1px solid rgba(77, 242, 255, 0.28);
      border-radius: 50%;
      opacity: 0;
      transform: scale(0.82);
      animation: ring-ripple 2.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
      pointer-events: none;
    }

    &::after {
      animation-delay: 1.4s;
    }
  }

  &__ring-outer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    animation: ring-rotate 12s linear infinite;
    transform-origin: center;
  }

  &__ring-inner {
    position: absolute;
    width: 80px;
    height: 80px;
    filter: drop-shadow(0 0 8px rgba(0, 174, 255, 0.35));
  }

  &__ring-progress {
    animation: ring-flow 2.4s linear infinite;
  }

  &__ring-text {
    position: relative;
    z-index: 1;
    gap: 3px;
    animation: ring-text-pulse 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }

  &__total-label {
    font-size: $font-size-xxs;
    color: $color-text-2;
    white-space: nowrap;
  }

  // 垂直分割线
  &__vdivider {
    width: 1px;
    margin: 0 $spacing-md;
    background: $color-line;
    flex-shrink: 0;
  }

  // 右侧统计
  &__stats {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__hdivider {
    height: 1px;
    background: $color-line;
    margin: 0 0;
  }

  &__stat-item {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm 0;
  }

  &__stat-icon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  &__stat-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__stat-label {
    font-size: $font-size-xxs;
    color: $color-text-2;
    white-space: nowrap;
  }

  &__stat-value {
    display: flex;
    align-items: baseline;
    gap: 2px;
  }

  &__stat-key {
    font-size: $font-size-xxs;
    color: $color-text-2;
  }

  &__stat-num {
    font-family: $font-number;
    font-size: $font-size-lg;
    font-weight: bold;
    color: $color-primary-bright;
    line-height: 1;
  }
}

@keyframes ring-rotate {
  to { transform: rotate(360deg); }
}

@keyframes ring-flow {
  to { stroke-dashoffset: -205; }
}

@keyframes ring-ripple {
  0% {
    opacity: 0;
    transform: scale(0.82);
  }
  16% {
    opacity: 0.55;
  }
  100% {
    opacity: 0;
    transform: scale(1.18);
  }
}

@keyframes ring-text-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  45% {
    transform: scale(1.035);
    opacity: 0.92;
  }
}

@media (prefers-reduced-motion: reduce) {
  .personnel-panel {
    &__ring-wrap::before,
    &__ring-wrap::after,
    &__ring-outer,
    &__ring-progress,
    &__ring-text {
      animation: none;
    }
  }
}
</style>
