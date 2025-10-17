import path from 'path';
import fs from 'fs';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
import { type RsbuildConfig, mergeRsbuildConfig } from '@rsbuild/core';

export const defineConfig = (options: Partial<RsbuildConfig>) => {
    const appDir = process.cwd();
    const appName = path.basename(appDir);
    console.log(`📦 应用名称：${appName}`);

    const config: RsbuildConfig = {
        plugins: [
            pluginReact(),
            pluginSvgr({
                mixedImport: true,
                svgrOptions: {
                    exportType: 'named'
                },
            }),
            pluginLess()
        ],
        output: {
            assetPrefix: './',
            filenameHash: true,
            injectStyles: true,
            cssModules: {
                auto: true,
            },
            sourceMap: {
                js: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
            },
            distPath: {
                root: path.resolve(appDir, 'dist')
            },
            cleanDistPath: true
        },
        html: {
            template: path.join(appDir, 'public/index.html'),
        },
        tools: {
            swc: {
                jsc: {
                    transform: {
                        legacyDecorator: true, // 使用 legacy 装饰器
                        useDefineForClassFields: false, // 与 legacy 装饰器配套
                    },
                },
            },
            rspack: {
                ignoreWarnings: [
                    /Critical dependency: the request of a dependency is an expression/,
                ],
            }
        },
    };

    return mergeRsbuildConfig(config, options);
};