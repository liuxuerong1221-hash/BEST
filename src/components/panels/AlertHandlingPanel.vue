<template>
  <BasePanel class="alert-handling" title="告警处理统计">
    <template #actions>
      <div class="alert-handling__tabs">
        <button
          v-for="t in tabs"
          :key="t.value"
          class="alert-handling__tab"
          :class="{ 'alert-handling__tab--active': activeTab === t.value }"
          type="button"
          @click="activeTab = t.value"
        >{{ t.label }}</button>
      </div>
    </template>

    <div class="alert-handling__body">
      <!-- 左：已处理 -->
      <div class="alert-handling__card alert-handling__card--done">
        <div class="alert-handling__card-head">
          <svg class="alert-handling__card-icon" viewBox="0 0 18 18" fill="none">
            <path d="M13 2.4C10.4 2.1 8.4 1.4 7.1 0.3L6.8 0L6.4 0.3C4.4 1.7 2.5 2.4 0.6 2.4H0V10.3C0 12.7 2.1 14.9 6.5 17L6.7 17.1L7 17C11.3 15.1 13.5 12.9 13.5 10.3V2.5L13 2.4Z" fill="#28DCB9"/>
            <path d="M1 2.1L5.3 6.2L7.6 0.9L1 2.1Z" fill="#28DCB9" transform="translate(3.3,6) scale(0.7)"/>
          </svg>
          <span class="alert-handling__card-label">已处理</span>
        </div>
        <div class="alert-handling__card-value">
          <span class="alert-handling__card-num">60</span>
          <span class="alert-handling__card-unit">条</span>
        </div>
        <div class="alert-handling__card-bar">
          <div class="alert-handling__card-bar-track" />
          <div class="alert-handling__card-bar-fill alert-handling__card-bar-fill--done" style="width: 60%" />
        </div>
        <div class="alert-handling__card-footer">
          <span class="alert-handling__card-percent alert-handling__card-percent--done">60%</span>
          <span class="alert-handling__card-desc">占总告警</span>
        </div>
      </div>

      <!-- 中：环形图 -->
      <div class="alert-handling__ring">
        <v-chart class="alert-handling__ring-chart" :option="ringOption" autoresize />
      </div>

      <!-- 右：未处理 -->
      <div class="alert-handling__card alert-handling__card--pending">
        <div class="alert-handling__card-head">
          <svg class="alert-handling__card-icon" viewBox="0 0 18 18" fill="none">
            <path d="M13 2.4C10.4 2.1 8.4 1.4 7.1 0.3L6.8 0L6.4 0.3C4.4 1.7 2.5 2.4 0.6 2.4H0V10.3C0 12.7 2.1 14.9 6.5 17L6.7 17.1L7 17C11.3 15.1 13.5 12.9 13.5 10.3V2.5L13 2.4Z" fill="#FFC814"/>
            <path d="M1 2.1L5.3 6.2L7.6 0.9L1 2.1Z" fill="#FFC814" transform="translate(3.3,6) scale(0.7)"/>
          </svg>
          <span class="alert-handling__card-label">未处理</span>
        </div>
        <div class="alert-handling__card-value">
          <span class="alert-handling__card-num alert-handling__card-num--pending">40</span>
          <span class="alert-handling__card-unit">条</span>
        </div>
        <div class="alert-handling__card-bar">
          <div class="alert-handling__card-bar-track" />
          <div class="alert-handling__card-bar-fill alert-handling__card-bar-fill--pending" style="width: 40%" />
        </div>
        <div class="alert-handling__card-footer">
          <span class="alert-handling__card-percent alert-handling__card-percent--pending">40%</span>
          <span class="alert-handling__card-desc">占总告警</span>
        </div>
      </div>
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import VChart from 'vue-echarts'
import BasePanel from '@/components/common/BasePanel.vue'

use([CanvasRenderer, PieChart])

const tabs = [
  { value: 'week', label: '近一周' },
  { value: 'month', label: '近一个月' },
] as const
type Tab = typeof tabs[number]['value']
const activeTab = ref<Tab>('week')

const ringOption = computed(() => ({
  backgroundColor: 'transparent',
  series: [{
    type: 'pie',
    radius: ['62%', '80%'],
    center: ['50%', '50%'],
    silent: true,
    label: { show: false },
    data: [
      { value: 60, itemStyle: { color: '#28DCB9' } },
      { value: 40, itemStyle: { color: '#FFC814' } },
    ],
  }, {
    type: 'pie',
    radius: ['50%', '52%'],
    center: ['50%', '50%'],
    silent: true,
    label: { show: false },
    data: [
      { value: 1, itemStyle: { color: 'rgba(0,174,255,0.25)' } },
    ],
  }],
  graphic: [{
    type: 'group',
    left: 'center',
    top: 'center',
    children: [
      { type: 'text', style: { text: '60', fill: '#FFFFFF', font: 'bold 44px DINAlternate', textAlign: 'center', textBaseline: 'bottom' }, left: 'center', top: -6 },
      { type: 'text', style: { text: '%', fill: '#FFFFFF', font: 'bold 26px DINAlternate', textAlign: 'center', textBaseline: 'bottom' }, left: 48, top: -10 },
      { type: 'text', style: { text: '告警处理率', fill: '#FFFFFF', font: '11px PingFang SC', textAlign: 'center', textBaseline: 'top' }, left: 'center', top: 8 },
    ],
  }],
}))
</script>

<style lang="scss" scoped>
.alert-handling {
  flex: 0 0 auto;
  gap: $spacing-sm;

  &__tabs {
    display: flex;
    gap: 0;
  }

  &__tab {
    padding: 4px 7px;
    border: 1px solid rgba(0, 174, 255, 0.3);
    background: rgba(0, 174, 255, 0.1);
    color: $color-text-2;
    font-size: $font-size-xs;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;

    &:first-child { border-radius: $radius-sm 0 0 $radius-sm; }
    &:last-child  { border-radius: 0 $radius-sm $radius-sm 0; border-left: none; }

    &--active {
      background: $color-primary;
      color: #FFF5F5;
    }
  }

  &__body {
    display: grid;
    grid-template-columns: 1fr 125px 1fr;
    gap: 0;
    align-items: center;
    min-height: 148px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 10px;
    border-radius: 6px;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;

    &--done {
      background: linear-gradient(90deg, rgba(40, 220, 185, 0.13) 0%, rgba(40, 220, 185, 0) 99%);
      border-color: rgba(40, 220, 185, 0.33);
    }

    &--pending {
      background: linear-gradient(270deg, rgba(255, 200, 20, 0.16) 0%, rgba(255, 200, 20, 0) 99%);
      border-color: rgba(255, 200, 20, 0.3);
    }
  }

  &__card-head {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__card-icon {
    width: 18px;
    height: 18px;
  }

  &__card-label {
    font-size: $font-size-xxs;
    color: $color-text-1;
  }

  &__card-value {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  &__card-num {
    font-family: $font-number;
    font-size: 36px;
    font-weight: bold;
    color: #28DCB9;
    line-height: 1;

    &--pending { color: #FFC814; }
  }

  &__card-unit {
    font-size: $font-size-sm;
    color: $color-text-1;
  }

  &__card-bar {
    position: relative;
    height: 8px;
    width: 101px;
  }

  &__card-bar-track {
    position: absolute;
    inset: 0;
    border-radius: 227px;
    border: 0.2px solid rgba(40, 220, 185, 0.3);
    background: rgba(40, 220, 185, 0.2);
  }

  &__card--pending &__card-bar-track {
    border-color: rgba(255, 200, 20, 0.3);
    background: rgba(255, 200, 20, 0.1);
  }

  &__card-bar-fill {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 227px;

    &--done { background: #28DCB9; }
    &--pending { background: linear-gradient(90deg, #FF8614 0%, #FFC814 100%); }
  }

  &__card-footer {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__card-percent {
    font-size: $font-size-sm;
    font-weight: bold;

    &--done { color: #28DCB9; }
    &--pending { color: #FFC814; }
  }

  &__card-desc {
    font-size: $font-size-xxs;
    color: $color-text-1;
    opacity: 0.6;
  }

  &__ring {
    width: 125px;
    height: 125px;
  }

  &__ring-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
