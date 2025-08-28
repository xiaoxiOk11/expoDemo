# Web (H5) 打包和部署指南

## 打包步骤

### 1. 开发环境测试
```bash
# 启动 Web 开发服务器
yarn web
# 或
npx expo start --web
```

### 2. 生产环境打包

#### 方式一：使用 Expo 导出（推荐）
```bash
# 打包到 dist 目录
yarn build:web:prod

# 或直接使用
npx expo export --platform web --output-dir dist
```

#### 方式二：优化打包
```bash
# 清理缓存
npx expo start --clear

# 生产环境打包
NODE_ENV=production npx expo export --platform web --output-dir dist
```

### 3. 本地预览
```bash
# 安装 serve（如果没有）s
npm install -g serve

# 预览打包结果
yarn serve:web
# 或
serve dist -p 3000
```

## 部署选项

### 1. 部署到 Vercel（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
cd dist
vercel

# 配置：
# - Framework Preset: Other
# - Build Command: （留空）
# - Output Directory: .
```

### 2. 部署到 Netlify
```bash
# 方式一：拖拽上传
# 将 dist 文件夹拖到 Netlify Drop

# 方式二：CLI 部署
npm i -g netlify-cli
netlify deploy --dir=dist --prod
```

### 3. 部署到 GitHub Pages
```bash
# 安装 gh-pages
yarn add -D gh-pages

# 在 package.json 添加
"homepage": "https://你的用户名.github.io/你的仓库名",
"scripts": {
  "deploy": "gh-pages -d dist"
}

# 部署
yarn deploy
```

### 4. 部署到阿里云 OSS / 腾讯云 COS
1. 打包项目：`yarn build:web:prod`
2. 上传 dist 目录所有文件到 OSS/COS
3. 配置静态网站托管
4. 设置默认首页为 index.html

## 优化建议

### 1. 资源优化
- 图片使用 WebP 格式
- 启用 Gzip 压缩
- 配置 CDN 加速

### 2. 性能优化
```javascript
// app.json 添加 Web 优化配置
"web": {
  "bundler": "metro",
  "output": "static",
  "favicon": "./assets/images/favicon.png",
  "backgroundColor": "#ffffff",
  "description": "Your app description",
  "shortName": "GhoastGame"
}
```

### 3. PWA 支持（可选）
Expo 自动生成 PWA 所需文件：
- manifest.json
- service-worker.js

## 常见问题

### 1. 音频在 Web 上不自动播放
浏览器限制，需要用户交互后才能播放音频。

### 2. 某些 Native 功能不支持
检查组件是否支持 Web 平台，使用 Platform.OS 条件渲染。

### 3. 打包后白屏
- 检查路由配置
- 确认静态资源路径正确
- 查看浏览器控制台错误

## 打包大小优化

当前配置已启用：
- Tree shaking
- 代码分割
- 静态导出

进一步优化：
```bash
# 分析包大小
npx expo export --platform web --dump-sourcemap
```

## 快速命令

```bash
# 开发
yarn web

# 打包
yarn build:web:prod

# 预览
yarn serve:web
```
