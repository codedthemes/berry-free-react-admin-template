import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

// ESLint 10 flat config.
// eslint-config-next is intentionally not used: the plugins it bundles
// (eslint-plugin-react / import / jsx-a11y) have no ESLint 10 compatible
// release yet. We compose the pieces that do support ESLint 10 directly:
// the Next.js plugin (core-web-vitals rules) and react-hooks.
export default defineConfig([
  eslint.configs.recommended,

  // Next.js core-web-vitals rules (registers the @next/next plugin)
  nextPlugin.configs['core-web-vitals'],

  // React Hooks recommended (ESLint 10 compatible flat config)
  reactHooks.configs.flat['recommended-latest'],

  {
    files: ['**/*.{js,jsx,mjs}'],

    plugins: {
      prettier: prettierPlugin
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },

    rules: {
      // --- Core rule preferences ---
      'no-param-reassign': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      'prefer-destructuring': 'off',

      // --- React Hooks: silence the noisy new (v7) rules ---
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/static-components': 'off',

      // --- New in ESLint 10 `recommended`: noisy on default-init idioms
      //     (e.g. `let x = <default/>; if (…) x = …`), keep it off ---
      'no-useless-assignment': 'off',

      // --- Project-specific restrictions ---
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*']
        }
      ],

      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
          // allow `const { omit, ...rest } = obj` to intentionally drop props
          ignoreRestSiblings: true
        }
      ],

      // --- Prettier integration ---
      'prettier/prettier': 'warn'
    }
  },

  // Disable conflicting rules from all shareable configs
  prettier,

  // Global ignores (flat config replacement for .eslintignore)
  globalIgnores(['**/node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.js'])
]);
