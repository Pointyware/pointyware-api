import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        // ...globals.node // for node environment
      }
    },
    rules: {
      // TypeScript provides better type-aware info for undefined variables
      "no-undef": "off",
      // turn on for production
      // "no-console": "error"
    }
  }
)
