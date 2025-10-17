import js from '@eslint/js';
import { defineConfig as eslintDefineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// 基础配置
const baseConfig = [
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
];

// 封装 defineConfig 方法，允许子项目扩展或覆盖基础配置
export function defineConfig(overrides = []) {
  return eslintDefineConfig([...baseConfig, ...overrides]);
}