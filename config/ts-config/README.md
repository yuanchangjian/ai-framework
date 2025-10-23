# @ai-framework/ts-config

> AI框架项目的TypeScript共享配置包

## 项目概述

本包为AI框架monorepo内的所有项目提供标准化的TypeScript配置预设。它提供了针对不同项目类型（Web应用、Node.js服务和基础配置）优化的多种配置选项，同时确保整个平台的一致性。配置包括严格的类型检查、现代JavaScript特性以及适当的编译器选项，以获得最佳的开发体验和构建性能。

## 特性

- **多种配置预设**：为不同项目类型提供Web、Node.js和基础配置
- **严格类型检查**：全面的TypeScript严格模式设置，增强代码质量
- **现代JavaScript支持**：目标为ES2022，支持最新的JavaScript特性
- **路径映射**：内置支持模块路径解析和别名
- **Monorepo优化**：针对workspace结构进行配置
- **开发友好**：快速构建设置，优化开发体验
- **库支持**：适用于应用程序和可重用库的适当设置

## 快速开始

### 安装

将此包添加到你的 `package.json` 依赖中：

```json
{
  "devDependencies": {
    "@ai-framework/ts-config": "workspace:*"
  }
}
```

然后运行：
```bash
npm install
```

### 基本用法

#### Web应用配置

在项目根目录创建 `tsconfig.json` 文件：

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.web.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

#### Node.js服务配置

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ]
}
```

#### 基础配置（库）

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist"
  }
}
```

#### 生产构建配置

用于生产环境的构建配置，优化输出大小和性能：

```json
{
  "extends": "@ai-framework/ts-config/web",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declaration": false
  },
  "exclude": [
    "**/*.test.ts",
    "**/*.spec.ts",
    "__tests__/**/*",
    "src/stories/**/*"
  ]
}
```

或者对于 Node.js 服务：

```json
{
  "extends": "@ai-framework/ts-config/node",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declaration": false
  },
  "exclude": [
    "**/*.test.ts",
    "**/*.spec.ts",
    "__tests__/**/*"
  ]
}
```

## API 参考

### 可用配置

#### `tsconfig.web.json`
为带有React支持的Web应用优化。

**主要特性：**
- JSX支持，使用`preserve`运行时
- DOM和ES2020库支持
- 为Web打包工具优化的模块解析
- 启用严格模式以获得更好的类型安全

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.web.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"]
    }
  }
}
```

#### `tsconfig.node.json`
为Node.js应用和服务配置。

**主要特性：**
- Node.js库支持
- CommonJS和ES模块互操作性
- 为服务端开发优化
- 适用于Node.js的模块解析

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.node.json",
  "compilerOptions": {
    "types": ["node", "jest"]
  }
}
```

#### `tsconfig.base.json`
适用于库和共享包的基础配置。

**主要特性：**
- 最小的库依赖
- 准备好声明文件生成
- 灵活的目标环境
- 核心TypeScript严格设置

### 通用编译器选项

所有配置都包含这些基础设置：

```typescript
{
  "strict": true,                    // 启用所有严格类型检查
  "noImplicitReturns": true,        // 缺少返回语句时报错
  "noFallthroughCasesInSwitch": true, // switch语句中缺少break时报错
  "noUncheckedIndexedAccess": true,  // 严格的数组/对象访问
  "exactOptionalPropertyTypes": true, // 精确的可选属性匹配
  "skipLibCheck": true,              // 跳过声明文件的类型检查
  "forceConsistentCasingInFileNames": true // 强制一致的文件命名
}
```

## 高级用法

### 项目引用

对于有依赖关系的monorepo项目：

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.web.json",
  "references": [
    { "path": "../shared-utils" },
    { "path": "../ui-components" }
  ],
  "compilerOptions": {
    "composite": true
  }
}
```

### 自定义路径映射

```json
{
  "extends": "@ai-framework/ts-config/tsconfig.web.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"],
      "@shared/*": ["../shared/src/*"]
    }
  }
}
```

### 环境特定配置

**开发环境：**
```json
{
  "extends": "@ai-framework/ts-config/tsconfig.web.json",
  "compilerOptions": {
    "sourceMap": true,
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

**生产环境：**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declaration": false
  }
}
```

## 开发

### 项目结构

```
.
├── tsconfig.base.json          # 基础配置
├── tsconfig.web.json           # Web应用预设
├── tsconfig.node.json          # Node.js服务预设
├── package.json                # 包配置
└── README.md                   # 文档
```

### TypeScript版本兼容性

此包维护与以下版本的兼容性：
- TypeScript 5.9+
- Node.js 16+
- 现代打包工具（Webpack 5、Vite、Rspack等）

## 依赖

### 开发依赖
- `typescript` - 用于验证的TypeScript编译器

### 对等依赖
- `typescript` ^5.9.0 - 使用项目需要

## 许可证

ISC