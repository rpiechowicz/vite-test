import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Pages({
      extensions: ['vue', 'md']
    }),

    Layouts(),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core'
      ],
      dts: 'src/auto-imports.d.ts'
    }),

    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: ''
        })
      ],

      dts: 'src/components.d.ts'
    }),

    Icons({
      autoInstall: true
    }),

    WindiCSS({
      safelist: markdownWrapperClasses
    }),

    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup (md) {
        md.use(Prism)
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        })
      }
    }),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')]
    }),

    Inspect({
      enabled: false
    })
  ],

  server: {
    fs: {
      strict: true
    }
  },

  ssgOptions: {
    script: 'async',
    formatting: 'minify'
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@vueuse/head'
    ],
    exclude: [
      'vue-demi'
    ]
  }
})
