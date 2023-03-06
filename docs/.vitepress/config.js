import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'

export default {
  title: 'Omorphia',
  description: 'A components library used for Modrinth.',
  themeConfig: {
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
          { text: 'Icons', link: '/components/icons' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'Modal', link: '/components/modal' },
        ],
      },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/modrinth/omoprhia/blob/main/LICENSE">GPLv3 License</a>.',
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
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../lib'),
        omorphia: resolve(__dirname, '../../lib'),
      },
      dedupe: ['vue'],
    },
  },
}
