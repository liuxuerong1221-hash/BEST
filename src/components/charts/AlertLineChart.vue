<template>
  <BasePanel class="alert-chart" title="本年度告警趋势">
    <v-chart class="alert-chart__chart" :option="option" autoresize />
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

const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']

const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(10,29,53,0.5)',
    borderWidth: 0,
    extraCssText: 'backdrop-filter: blur(8px);',
    textStyle: { color: '#D1EDFF', fontSize: 12 },
    formatter: (params: any[]) => {
      const p = params[0]
      return `${p.axisValue}<br/>告警: ${p.value}次`
    },
  },
  grid: { left: 36, right: 8, top: 8, bottom: 22, containLabel: false },
  xAxis: {
    type: 'category',
    data: months,
    axisLine: { lineStyle: { color: 'rgba(0,174,255,0.3)' } },
    axisTick: { show: false },
    axisLabel: { color: '#D1EDFF', fontSize: 10 },
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
    name: '告警数',
    type: 'line',
    smooth: true,
    data: [320, 480, 560, 390, 620, 510, 680, 590, 720, 460, 340, 280],
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { color: '#F9B933', width: 2 },
    itemStyle: { color: '#F9B933', borderColor: '#fff', borderWidth: 1.5 },
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(249,185,51,0.3)' },
          { offset: 1, color: 'rgba(249,185,51,0)' },
        ],
      },
    },
  }],
}))
</script>

<style lang="scss" scoped>
.alert-chart {
  flex: 1;
  min-height: 0;
  gap: $spacing-xs;

  &__filter {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px 2px 6px;
    background: rgba(12, 31, 54, 0.38);
    border: 1px solid rgba(249, 185, 51, 0.35);
    border-radius: 2px;
    cursor: pointer;

    span {
      font-size: $font-size-xxs;
      color: #F9B933;
      line-height: 1;
    }
  }

  &__chart {
    flex: 1;
    min-height: 140px;
  }
}
</style>
