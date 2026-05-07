<template>
  <BasePanel class="parking-panel" title="车位概况">
    <div class="parking-panel__body">
      <!-- 顶部：图标 + 指标 -->
      <div class="parking-panel__top">
        <div class="parking-panel__icon">
          <svg viewBox="0 0 56 46" fill="none">
            <path d="M8 12L14 4H42L48 12M8 12V38C8 40.2 9.8 42 12 42H44C46.2 42 48 40.2 48 38V12M8 12H48M18 22V32M38 22V32"
                  stroke="#4DF2FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="18" cy="38" r="3" fill="#4DF2FF"/>
            <circle cx="38" cy="38" r="3" fill="#4DF2FF"/>
          </svg>
        </div>
        <div class="parking-panel__metrics">
          <div class="parking-panel__metric">
            <div class="parking-panel__metric-value">
              <span class="parking-panel__metric-number">1000</span>
              <span class="parking-panel__metric-unit">位</span>
            </div>
            <div class="parking-panel__metric-label">车位总数</div>
          </div>
          <div class="parking-panel__metric">
            <div class="parking-panel__metric-value">
              <span class="parking-panel__metric-number">200</span>
              <span class="parking-panel__metric-unit">位</span>
            </div>
            <div class="parking-panel__metric-label">剩余车位</div>
          </div>
          <div class="parking-panel__metric">
            <div class="parking-panel__metric-value">
              <span class="parking-panel__metric-number">80</span>
              <span class="parking-panel__metric-unit">%</span>
            </div>
            <div class="parking-panel__metric-label">车位占用率</div>
          </div>
        </div>
      </div>

      <!-- 底部：进度条 -->
      <div class="parking-panel__progress-list">
        <div class="parking-panel__progress-item">
          <div class="parking-panel__progress-header">
            <span class="parking-panel__progress-label">地下负二层</span>
            <span class="parking-panel__progress-value">6<span class="parking-panel__progress-total">/500</span></span>
          </div>
          <div class="parking-panel__progress-bar">
            <div class="parking-panel__progress-fill" :style="{ width: '1.2%' }" />
          </div>
        </div>
        <div class="parking-panel__progress-item">
          <div class="parking-panel__progress-header">
            <span class="parking-panel__progress-label">地下停车场</span>
            <span class="parking-panel__progress-value">194<span class="parking-panel__progress-total">/500</span></span>
          </div>
          <div class="parking-panel__progress-bar">
            <div class="parking-panel__progress-fill" :style="{ width: '38.8%' }" />
          </div>
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import BasePanel from '@/components/common/BasePanel.vue'
</script>

<style lang="scss" scoped>
.parking-panel {
  gap: $spacing-xs;

  &__body {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  &__top {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  &__icon {
    width: 56px;
    height: 46px;
    flex-shrink: 0;

    svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 8px rgba(77, 242, 255, 0.6));
    }
  }

  &__metrics {
    flex: 1;
    display: flex;
    gap: $spacing-md;
  }

  &__metric {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__metric-value {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  &__metric-number {
    font-family: $font-number;
    font-size: 28px;
    font-weight: bold;
    color: $color-primary-bright;
    line-height: 1;
  }

  &__metric-unit {
    font-family: $font-body;
    font-size: $font-size-xs;
    color: $color-text-2;
  }

  &__metric-label {
    font-family: $font-body;
    font-size: $font-size-xs;
    color: $color-text-2;
  }

  &__progress-list {
    display: flex;
    gap: $spacing-xs;
  }

  &__progress-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__progress-label {
    font-family: $font-body;
    font-size: $font-size-xs;
    color: $color-text-2;
  }

  &__progress-value {
    font-family: $font-number;
    font-size: $font-size-sm;
    font-weight: bold;
    color: $color-primary-bright;
  }

  &__progress-total {
    font-size: $font-size-xs;
    color: $color-text-3;
    font-weight: normal;
  }

  &__progress-bar {
    height: 8px;
    background: rgba(0, 174, 255, 0.15);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  &__progress-fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: linear-gradient(90deg, #00AEFF 0%, #4DF2FF 100%);
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(77, 242, 255, 0.6);
    transition: width 0.3s ease;
  }
}
</style>
