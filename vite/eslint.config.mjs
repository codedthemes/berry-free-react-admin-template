import { fixupConfigRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  ...fixupConfigRules(compat.extends('prettier')),

  {
    plugins: {
      prettier,
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false
      }
    },

    settings: {
      'import/resolver': {
        node: {
          moduleDirectory: ['node_modules', 'src/']
        },

        typescript: {
          alwaysTryTypes: true
        }
      }
    },

    rules: {
      'react/jsx-filename-extension': 'off',
      'no-param-reassign': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/no-array-index-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/order': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'react-hooks/rules-of-hooks': 'error', // Enforces rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Enforces effect dependencies

      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*']
        }
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none'
        }
      ],

      'prettier/prettier': [
        'warn',
        {
          bracketSpacing: true,
          printWidth: 140,
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2,
          useTabs: false
        }
      ]
    }
  },
  {
    ignores: ['node_modules/**'], // Make sure this doesn't match your files.
    files: ['src/**/*.{js,jsx,ts,tsx}']
  }
];