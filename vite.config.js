import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({

  build: {
    outDir:'./dist'
  },


  plugins: [
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  ElementPlus({
    useSource: true
  }),vue(),
],  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  server:{
    port:8010
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '#': '/src',
    },
  },
})
