/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/pages/**/*.stories.mdx', '../src/stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/preset-typescript'
  ],
  core: {},
  docs: {
    autodocs: 'tag'
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
};
export default config;
