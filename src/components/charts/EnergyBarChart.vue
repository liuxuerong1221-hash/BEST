<template>
  <BasePanel class="energy-chart" title="本年度能耗分析">
    <template #actions>
      <div class="energy-chart__legend">
        <span class="energy-chart__legend-dot energy-chart__legend-dot--elec" />
        <span class="energy-chart__legend-text">用电</span>
        <span class="energy-chart__legend-dot energy-chart__legend-dot--water" />
        <span class="energy-chart__legend-text">用水</span>
      </div>
    </template>
    <v-chart class="energy-chart__chart" :option="option" autoresize />
  </BasePanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import BasePanel from '@/components/common/BasePanel.vue'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(10,29,53,0.5)',
    borderWidth: 0,
    extraCssText: 'backdrop-filter: blur(8px);',
    textStyle: { color: '#D1EDFF', fontSize: 12 },
  },
  grid: { left: 40, right: 8, top: 12, bottom: 22, containLabel: false },
  xAxis: {
    type: 'category',
    data: months,
    axisLine: { lineStyle: { color: 'rgba(0,174,255,0.3)' } },
    axisTick: { show: false },
    axisLabel: { color: '#D1EDFF', fontSize: 11, interval: 0 },
    boundaryGap: true,
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 800,
    interval: 200,
    name: 'kwh',
    nameTextStyle: { color: '#D1EDFF', fontSize: 11, padding: [0, 0, 0, -24] },
    axisLabel: { color: '#D1EDFF', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(0,174,255,0.15)', type: 'dashed' } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: '用电',
      type: 'bar',
      barWidth: 8,
      barGap: '30%',
      data: [320, 250, 410, 280, 500, 590, 590, 425, 480, 360, 220, 305],
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: '#00AEFF' }, { offset: 1, color: 'rgba(0,174,255,0.08)' }],
        },
        borderRadius: [2, 2, 0, 0],
      },
    },
    {
      name: '用水',
      type: 'bar',
      barWidth: 8,
      data: [180, 120, 200, 160, 300, 320, 310, 210, 270, 190, 140, 170],
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [{ offset: 0, color: '#2ED0B0' }, { offset: 1, color: 'rgba(46,208,176,0.08)' }],
        },
        borderRadius: [2, 2, 0, 0],
      },
    },
  ],
}))
</script>

<style lang="scss" scoped>
.energy-chart {
  flex: 1;
  min-height: 0;
  gap: $spacing-xs;

  &__legend {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__legend-dot {
    width: 10px;
    height: 6px;
    border-radius: 1px;
    flex-shrink: 0;

    &--elec  { background: #00AEFF; }
    &--water { background: #2ED0B0; }
  }

  &__legend-text {
    font-size: $font-size-xxs;
    color: $color-text-2;
    margin-right: 6px;
    white-space: nowrap;
  }

  &__chart {
    flex: 1;
    min-height: 160px;
  }
}
</style>
