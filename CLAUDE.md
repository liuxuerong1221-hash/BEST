# BEST园区可视化集成平台 — Claude 工作指南

## 项目概述

大屏可视化项目，用于园区数据的集成展示。设计稿由设计师通过 MasterGo 链接提供，Claude 负责将设计稿转换为前端代码。

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | Vue 3 (Composition API + `<script setup>`) | 必须使用 Composition API，禁止 Options API |
| 语言 | TypeScript | 所有文件必须有类型，禁止 `any` |
| 构建 | Vite 5 | 路径别名 `@` → `src/` |
| 状态管理 | Pinia | 按模块拆分到 `src/stores/` |
| 样式 | Sass（SCSS 语法）| 所有样式写 `.scss`，变量统一从 `variables.scss` 取 |
| UI 组件库 | Element Plus | 已配置自动按需导入，直接使用，无需手动 import |
| 图表 | ECharts 5 + vue-echarts | 所有图表用 ECharts 实现 |
| HTTP | Axios | 统一通过 `src/api/index.ts` 封装的 `request` 实例 |

---

## 目录结构

```
src/
├── main.ts                 # 入口，全局注册
├── App.vue                 # 根组件
├── router/index.ts         # 路由配置
├── stores/                 # Pinia 状态模块
│   └── index.ts
├── views/                  # 页面级组件（路由直接挂载）
├── components/             # 可复用组件
│   ├── charts/             # ECharts 图表组件
│   ├── panels/             # 大屏面板/卡片组件
│   └── common/             # 通用 UI 组件
├── api/                    # 接口请求
│   └── index.ts
├── styles/
│   ├── variables.scss      # Design Tokens（颜色/字体/间距）
│   └── global.scss         # 全局样式重置
├── types/                  # TypeScript 类型定义
│   └── index.ts
├── utils/                  # 工具函数
│   └── index.ts
└── assets/
    ├── icons/              # SVG 图标
    └── images/             # 背景图、装饰图
```

---

## 代码规范

### Vue 组件

```vue
<!-- 结构顺序：template → script → style -->
<template>
  <!-- 根元素必须有语义化 class 名 -->
  <div class="chart-panel">
    ...
  </div>
</template>

<script setup lang="ts">
// 1. 类型导入
// 2. 组件导入（自动导入的 EP 组件无需手写）
// 3. Props / Emits 定义
// 4. 响应式数据
// 5. 计算属性
// 6. 方法
// 7. 生命周期
</script>

<style lang="scss" scoped>
// 必须 scoped，变量直接用（已全局注入）
.chart-panel {
  background: $color-bg-card;
}
</style>
```

### Props 定义

```typescript
// 必须使用 defineProps<T>() 泛型形式，不用 withDefaults 时直接写可选
interface Props {
  title: string
  data: ChartDataItem[]
  height?: number
}
const props = defineProps<Props>()
```

### Pinia Store

```typescript
// 使用 defineStore + setup 函数形式
export const useXxxStore = defineStore('xxx', () => {
  const data = ref<SomeType[]>([])
  async function fetchData() { ... }
  return { data, fetchData }
})
```

### ECharts 图表组件

- 使用 `vue-echarts` 的 `<v-chart>` 组件
- option 用 `computed` 返回，数据变化自动更新
- 必须注册用到的 ECharts 组件（按需注册，不全量引入）

```typescript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])
```

---

## 样式规范

### SCSS 变量使用

所有颜色、字体、间距必须使用 `src/styles/variables.scss` 中的变量，禁止在组件中写魔法值。

```scss
// ✅ 正确
color: $color-text-1;
font-size: $font-size-sm;
padding: $spacing-md;

// ❌ 禁止
color: #ffffff;
font-size: 14px;
```

### Design Tokens 更新规则

每次收到新设计稿后，先更新 `src/styles/variables.scss` 中的 Token，再生成组件。

### 大屏布局

- 基准分辨率：以设计稿标注为准（通常 1920×1080）
- 使用 CSS Grid 或 Flexbox 布局，不使用固定像素定位
- 使用 `vw/vh` 或 `rem` 做响应式缩放（以设计稿确认为准）

---

## D2C 工作流（设计稿转代码）

1. 设计师提供 MasterGo 设计稿链接
2. Claude 通过 MasterGo API 获取 DSL 数据
3. 从 DSL 提取 Design Tokens → 更新 `variables.scss`
4. 分析组件结构 → 按目录生成 `.vue` 文件
5. 图表区域 → 根据设计意图生成 ECharts option
6. 需要切图的资源 → 明确告知设计师导出规格

### 哪些需要设计师提供切图

- 背景图、地图底图、装饰插画（PNG/WebP）
- 复杂自定义图标（SVG）
- Logo、品牌图形

### 哪些 Claude 直接从 DSL 生成

- 所有布局、颜色、字体样式
- 基础形状、边框、阴影 → CSS 实现
- 简单图标 → 内联 SVG 或 Element Plus 图标替代
- 图表 → ECharts 实现

---

## 文件命名规范

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 页面组件 | PascalCase + View 后缀 | `DashboardView.vue` |
| 功能组件 | PascalCase | `ChartPanel.vue`, `DataCard.vue` |
| Pinia Store | camelCase + use 前缀 | `useDeviceStore.ts` |
| API 模块 | camelCase | `device.ts`, `alert.ts` |
| SCSS 文件 | kebab-case | `variables.scss` |
| 类型文件 | camelCase | `device.ts` |

---

## 禁止事项

- 禁止 Options API
- 禁止 `any` 类型（用 `unknown` + 类型守卫代替）
- 禁止在组件中写魔法颜色值，必须用 SCSS 变量
- 禁止全量引入 ECharts（`import * as echarts from 'echarts'`）
- 禁止在 `<style>` 中缺少 `scoped`（全局样式只放 `global.scss`）
- 禁止直接操作 DOM，用 `ref` + `nextTick`

---

## 当前进度

- [x] 项目骨架搭建完成
- [ ] 设计稿 Token 确认（等待设计稿）
- [ ] 页面开发（等待设计稿）
