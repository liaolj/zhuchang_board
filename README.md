# 智慧猪场大屏网站（MVP 实现）

本项目基于 Vue 3 + Vite + TypeScript 构建，集成 Pinia 状态管理、Tailwind CSS 样式体系与 Apache ECharts 图表，用于快速搭建智慧猪场生产运营可视化大屏的最小可行产品（MVP）。

## ✨ 已实现能力

- **总览 KPI**：存栏、死亡率、出栏、ADG、FCR、生产事件等核心指标卡片展示。
- **环境与舒适度**：当前阈值状态、近 24h 温湿度 / 气体 / 风速趋势多线图。
- **生产与繁殖**：各阶段存栏条形图、繁殖漏斗、繁殖关键指标。
- **饲喂与用水**：今日饲料/计划对比、用水概览、7 天饲喂 & 用水趋势（柱折混合）。
- **设备与能耗**：设备在线/关注/异常统计、关键设备状态列表、能耗汇总。
- **告警中心**：滚动条展示最新告警，按级别着色。
- **分区概览**：各分区健康指数、环境状态、告警及存栏摘要。
- **配置摘要**：顶部展示刷新周期等配置，底部提示数据来源。

所有数据通过 Pinia Store 本地 mock 提供，方便后续替换为真实接口。

## 🗂️ 目录结构

```
├─ public/          # 静态资源
├─ src/
│  ├─ components/   # 业务模块组件与基础图表封装
│  ├─ stores/       # Pinia 仓库（含 mock 数据）
│  ├─ types/        # 业务类型定义
│  ├─ assets/       # 资源占位（当前为空）
│  ├─ App.vue       # 页面布局
│  └─ main.ts       # 入口文件
├─ index.html       # Vite 入口模板
├─ package.json     # 依赖与脚本
└─ tailwind.config.cjs 等构建配置
```

## 🚀 本地运行

> 由于评测环境无法联网，`npm install` 可能需要提前在可联网环境执行并拷贝 `node_modules`。

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建产物（含 TS 类型检查）
npm run build
```

启动后访问 `http://localhost:5173/` 即可查看 1920×1080 适配的大屏原型，Tailwind 响应式样式可兼容更高分辨率。

## 🔌 接口接入建议

- 将 `src/stores/dashboard.ts` 中的 mock 数据替换为实际 API 请求，可结合 Pinia `actions` 与 `setInterval` 实现 30~60s 刷新。
- 建议后端统一聚合 `/overview`、`/env`、`/feeding` 等接口，并通过 `public/config.json` 提供模块开关、阈值配置。
- 轮播与多场景扩展可新增 Router + 定时调度，或结合 WebSocket 实现告警实时推送。

## 📄 许可证

本项目未附带开源许可证，如需商用请先补充对应协议。
