# 博彦设计 · 公司官网

一站式视觉整合方案服务商官网。

## 技术栈

纯静态 HTML + CSS + 原生 JavaScript，无需构建工具、无需 npm install。

## 快速预览

双击任意 `.html` 文件在浏览器中打开，或：

```bash
open index.html                           # macOS
start index.html                          # Windows
xdg-open index.html                       # Linux
```

## 项目结构

```
官网Demo/
├── index.html              # 首页（首屏轮播 + 数据 + 案例 + 服务 + AIGC + 布局 + 客户墙 + 资质）
├── cases.html              # 客户案例（关键词搜索 + 行业/服务筛选 + 热门标签）
├── case-detail.html        # 案例详情页
├── services.html           # 服务内容（平面视觉 / 品牌包装 / 图拍视频）
├── service-detail.html     # 服务详情页
├── aigc.html               # AIGC 赋能（核心数据 + 能力矩阵 + 工作流 + 案例）
├── about.html              # 关于我们
├── news.html               # 新闻动态
├── news-detail.html        # 新闻详情
├── honor.html              # 荣誉奖项
├── jobs.html               # 招贤纳士
├── contact.html            # 联系我们
├── sitemap.html            # 网站地图
├── 404.html                # 404 错误页
├── admin.html              # 后台管理（查看咨询记录）
├── assets/
│   ├── css/style.css       # 公共样式（约 760 行）
│   ├── js/main.js          # 公共脚本（导航 + 案例数据 + 咨询表单 + 数据持久化）
│   └── img/                # 图片资源（69 张）
└── README.md               # 本文件
```

## 修改指南

| 想改什么 | 改哪里 |
|----------|--------|
| 导航栏目 | `assets/js/main.js` → `SITE.nav` 数组 |
| 案例数据 | `assets/js/main.js` → `SITE_CASES` 数组 |
| 公司名/联系方式/备案号 | `assets/js/main.js` → `SITE.name` 和 `SITE.contact` |
| 首页轮播内容 | `index.html` → `<section class="hero">` 区域 |
| 首页服务卡片 | `index.html` → `<div class="svc-grid">` 区域 |
| AIGC 页面内容 | `aigc.html` → 各 `<section>` 区域 |
| 案例页热门搜索 | `cases.html` → `<div class="hot-tags">` |
| 案例筛选维度 | `cases.html` → `<div class="filter-row">` |
| 主题色 | CSS `:root` → `--c-primary` |
| 页脚链接 | `assets/js/main.js` → `buildFooter()` 函数 |
| 咨询表单字段 | `assets/js/main.js` → `buildFooter()` 中 `#leadForm` |

## 咨询表单数据持久化

表单提交后数据存储在浏览器 `localStorage` 中，可通过 `admin.html` 查看、导出所有咨询记录：

- 本地双开：一个窗口打开网站提交表单，另一个窗口打开 `admin.html` 查看
- 表单记录包括：姓名、手机号、公司、需求类型、需求描述、来源页面、提交时间
- 支持导出为 JSON 文件

## 部署方式

### 方式一：Vercel（推荐，免费）

```bash
npm i -g vercel
cd 官网Demo/
vercel --prod
```

### 方式二：GitHub Pages（免费）

1. 将项目推送到 GitHub 仓库
2. Settings → Pages → Source: main branch, root folder → Save

### 方式三：任意静态托管

整个 `官网Demo/` 目录直接上传到任何静态文件服务器即可，Apache/Nginx/Caddy 无需额外配置。

## 回滚

备份存放在 `backup-original/`，恢复命令：

```bash
cp -r backup-original/* 官网Demo/
```

## 浏览器兼容

- Chrome/Edge 90+
- Safari 15+
- Firefox 90+
- 移动端 Safari/Chrome

## 已知限制

- 咨询表单使用 localStorage 存储（单浏览器，不跨设备同步）
- 生产环境建议替换为后端 API 提交
- 搜索功能为前端过滤，案例超过 500 个时建议接入后端搜索
- 图片为示例素材，正式上线前需替换高清版本
