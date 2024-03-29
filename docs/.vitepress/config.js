import { resolve, basename } from 'path'
import svgLoader from 'vite-svg-loader'
import eslintPlugin from 'vite-plugin-eslint'
import { icuMessages } from '@vintl/unplugin/vite'
import virtual from '@rollup/plugin-virtual'
import { globSync } from 'glob'

/** @type {import('vitepress').SiteConfig} */
export default {
  title: 'Omorphia',
  description: 'A components library used for Modrinth.',
  head: [['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]],
  themeConfig: {
    logo: { src: '/favicon.svg', width: 24, height: 24 },
    socialLinks: [{ icon: 'github', link: 'https://github.com/modrinth/omorphia' }],
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Setup', link: '/setup' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Button', link: '/components/button' },
          { text: 'Card', link: '/components/card' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Chips', link: '/components/chips' },
          { text: 'File Input', link: '/components/file-input' },
          { text: 'Drop Area', link: '/components/drop-area' },
          { text: 'Icons', link: '/components/icons' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'Dropdown Select', link: '/components/dropdown-select' },
          { text: 'Popout Menu', link: '/components/popout-menu' },
          { text: 'Overflow Menu', link: '/components/overflow-menu' },
          { text: 'Project Card', link: '/components/project-card' },
          { text: 'Environment Indicator', link: '/components/environment-indicator' },
          { text: 'Categories', link: '/components/categories' },
          { text: 'Animated Logo', link: '/components/animated-logo' },
          { text: 'Text Logo', link: '/components/text-logo' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Text Inputs', link: '/components/text-inputs' },
          { text: 'Number Inputs', link: '/components/number-inputs' },
          { text: 'Search Filter', link: '/components/search-filter' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Promotion', link: '/components/promotion' },
          { text: 'Markdown', link: '/components/markdown' },
          { text: 'Markdown Editor', link: '/components/markdown-editor' },
          { text: 'Copy Code', link: '/components/copy-code' },
          { text: 'Notifications', link: '/components/notifications' },
          { text: 'Share Modal', link: '/components/share-modal' },
          { text: 'Analytics', link: '/components/analytics' },
          { text: 'Search dropdown', link: '/components/search-dropdown' },
        ],
      },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/modrinth/omoprhia/blob/main/LICENSE">AGPLv3 License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://modrinth.com">Rinth, Inc.</a>',
    },
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
      eslintPlugin(),
      icuMessages({
        filter: (id) => id.endsWith('.json?messages'),
        pluginsWrapping: true,
      }),
      virtual({
        '@modrinth/omorphia-dev/locales/index.js': (() => {
          const localeDirs = globSync('../../locales/*', { cwd: __dirname, absolute: true })
          let output = 'export const localeDefinitions = Object.create(null);\n'
          for (const localeDir of localeDirs) {
            const tag = basename(localeDir)
            output += `localeDefinitions[${JSON.stringify(tag)}] = {\n`
            output += '\tasync importFunction() {\n'
            output += `\t\tconst messages = Object.create(null);\n`
            for (const filePath of globSync('*', { cwd: localeDir, absolute: true })) {
              const fileName = basename(filePath)
              if (fileName === 'index.json') {
                output += `\t\tObject.assign(messages, await import(${JSON.stringify(
                  `${filePath}?messages`
                )}).then((mod) => mod['default']));\n`
              }
            }
            output += '\t\treturn { messages }\n'
            output += '\t},\n'
            output += '}\n'
          }
          return output
        })(),
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../lib'),
        omorphia: resolve(__dirname, '../../lib'),
        '@formatjs/icu-messageformat-parser': '@formatjs/icu-messageformat-parser/lib/no-parser',
      },
      dedupe: ['vue'],
    },
  },
}
