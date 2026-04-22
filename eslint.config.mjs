import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'

// TODO: try https://typescript-eslint.io/getting-started/typed-linting/
export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        // ...globals.node // for node environment
      }
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      // TypeScript provides better type-aware info for undefined variables
      "no-undef": "off",
      // turn on for production
      // "no-console": "error

      "@stylistic/indent": ['error', 2, {'memberExpression': 1}]
    }
  }
)
