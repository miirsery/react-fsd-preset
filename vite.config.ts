import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import EslintPlugin from 'vite-plugin-eslint'
import StyleLintPlugin from 'vite-plugin-stylelint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

const styleLintConfig = StyleLintPlugin({
  files: ['src/**/*.{vue,scss}'],
  fix: true,
})

const eslintConfig = EslintPlugin({
  fix: true,
  cache: false,
})

const svgIconsConfig = createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/app/assets/icons')],
  symbolId: 'icon-[dir]-[name]',
  inject: 'body-first',
  customDomId: '__svg__icons__dom__',
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv

  return {
    base: env.BASE_URL ?? '/',
    plugins: [react(), styleLintConfig, eslintConfig, svgLoader(), svgIconsConfig],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
              @use "app/styles/additionals/variables/index.scss" as *;
              @use "app/styles/additionals/mixins/index.scss" as *;
              @use "app/styles/additionals/vendor/index.scss" as *;
            `,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        app: fileURLToPath(new URL('./src/app', import.meta.url)),
        processes: fileURLToPath(new URL('./src/processes', import.meta.url)),
        pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
        widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
        features: fileURLToPath(new URL('./src/features', import.meta.url)),
        entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
        shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
    },
  }
})