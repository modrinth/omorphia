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
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Icons', link: '/components/icons' },
          { text: 'Button', link: '/components/button' },
          { text: 'Card', link: '/components/card' },
          { text: 'Slider', link: '/components/slider' },
        ]
      }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/modrinth/omoprhia/blob/main/LICENSE">GPLv3 License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://modrinth.com">Rinth, Inc.</a>'
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
        }, }
      ),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../lib'),
        'omorphia': resolve(__dirname, '../../lib'),
      },
      dedupe: ['vue'],
    }
  }
}
