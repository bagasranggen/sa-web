import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        // '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../components/common/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../components/layout/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-vitest',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-onboarding',
    ],
    framework: '@storybook/nextjs-vite',
    staticDirs: ['../public'],
    async viteFinal(config) {
        return mergeConfig(config, {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, '../'),
                },
            },
        });
    },
};

export default config;
