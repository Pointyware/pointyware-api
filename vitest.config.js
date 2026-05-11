import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    exclude: [
      ...configDefaults.exclude,
      './dist/*'
    ],
    environment: 'node',
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
