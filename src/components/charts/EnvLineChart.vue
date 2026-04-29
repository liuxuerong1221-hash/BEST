<template>
  <BasePanel class="env-chart" title="环境质量变化趋势分析">
    <template #actions>
      <div class="env-chart__filter">
        <span class="env-chart__filter-text">CO2</span>
        <svg class="env-chart__filter-arrow" viewBox="0 0 10 6" fill="none" width="10" height="6">
          <path d="M1 1L5 5L9 1" stroke="#4DF2FF" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </div>
    </template>
    <v-chart class="env-chart__chart" :option="option" autoresize />
  </BasePanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import BasePanel from '@/components/common/BasePanel.vue'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

const hours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00']

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(10,29,53,0.5)',
    borderWidth: 0,
    borderRadius: 4,
    extraCssText: 'backdrop-filter: blur(8px);',
    textStyle: { color: '#D1EDFF', fontSize: 12 },
    formatter: (params: any[]) => {
      const p = params[0]
      return `${p.axisValue}<br/>CO2: ${p.value}ppm`
    },
  },
  grid: { left: 36, right: 8, top: 8, bottom: 22, containLabel: false },
  xAxis: {
    type: 'category',
    data: hours,
    axisLine: { lineStyle: { color: 'rgba(0,174,255,0.3)' } },
    axisTick: { show: false },
    axisLabel: { color: '#D1EDFF', fontSize: 11 },
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 800,
    interval: 200,
    axisLabel: { color: '#D1EDFF', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(0,174,255,0.15)', type: 'dashed' } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [{
    name: 'CO2',
    type: 'line',
    smooth: true,
    data: [320, 450, 620, 580, 710, 660, 540],
    symbol: 'circle',
    symbolSize: 7,
    lineStyle: { color: '#4DF2FF', width: 2 },
    itemStyle: { color: '#4DF2FF', borderColor: '#fff', borderWidth: 1.5 },
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(77,242,255,0.35)' },
          { offset: 1, color: 'rgba(77,242,255,0)' },
        ],
      },
    },
  }],
}))
</script>

<style lang="scss" scoped>
.env-chart {
  flex: 1;
  min-height: 0;
  gap: $spacing-xs;

  &__filter {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background: rgba(12, 31, 54, 0.38);
    border: 1px solid #14578F;
    border-radius: 2px;
    cursor: pointer;
  }

  &__filter-text {
    font-size: $font-size-xxs;
    color: $color-primary-bright;
    line-height: 1;
  }

  &__filter-arrow {
    flex-shrink: 0;
  }

  &__chart {
    flex: 1;
    min-height: 140px;
  }
}
</style>
