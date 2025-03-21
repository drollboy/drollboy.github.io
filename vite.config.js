import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    historyApiFallback: true, // 配置服务器支持HTML5 History API
  }
})
