# 智慧猪场大屏（MVP）

本项目基于 [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [Tailwind CSS](https://tailwindcss.com/) + [Apache ECharts](https://echarts.apache.org/) 实现智慧猪场运营大屏的最小可行产品。

## 功能概览

- 总览：核心 KPI、环境摘要、实时告警滚动、分区健康热力。
- 生产与繁殖：阶段存栏、繁殖漏斗、关键繁殖指标。
- 环境与舒适度：实时温湿度与气体浓度、近 24 小时趋势。
- 饲喂与用水：今日饲喂/用水对比、7 日趋势、FCR/ADG 指标。
- 设备与能耗：关键设备状态、能耗、设备健康指数。
- 告警中心：最近告警列表，支持按级别筛选（MVP 展示）。
- 分区与地图：栋舍列表与摘要信息展示。

所有模块可通过 `public/config.json` 配置开关、轮播顺序与阈值。

## 快速开始

> **提示**：当前环境未安装依赖。首次使用请先执行 `npm install` 安装依赖。

```bash
# 安装依赖
npm install

# 开发环境
npm run dev

# 类型检查
npm run type-check

# 构建生产包
npm run build
```

默认应用会在 `http://localhost:5173` 启动，可在 1920×1080 分辨率下全屏展示。

## 配置说明

`public/config.json` 提供以下配置项：

- `modules`：控制每个业务模块的展示与隐藏。
- `carousel`：控制是否启用轮播、轮播间隔（毫秒）及展示顺序。
- `thresholds`：环境与生产关键指标的告警阈值范围。

修改配置后可在页面右上角点击 **重新拉取配置** 即时生效。

## 目录结构

```
├── index.html
├── package.json
├── public
│   └── config.json
├── src
│   ├── App.vue
│   ├── assets
│   │   └── main.css
│   ├── components
│   │   ├── common
│   │   │   └── ModuleCard.vue
│   │   └── modules
│   │       ├── AlertsPanel.vue
│   │       ├── EnvironmentPanel.vue
│   │       ├── EquipmentPanel.vue
│   │       ├── FeedingPanel.vue
│   │       ├── OverviewPanel.vue
│   │       ├── ProductionPanel.vue
│   │       └── ZonesPanel.vue
│   ├── composables
│   │   └── useCarousel.ts
│   ├── data
│   │   └── mock.ts
│   ├── main.ts
│   ├── stores
│   │   └── config.ts
│   └── types
│       └── config.ts
└── tailwind.config.js
```

## 开源许可

此项目以 MIT License 开源，可根据业务需要自由拓展。
