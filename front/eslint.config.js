import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    plugins: {
      react: eslintReact,
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'import-sort': eslintImportSort,
    },
  },
  {
    ignores: [
      '**/*.test.js',
      '**/*.d.ts',
      'build',
      'node_modules',
      'src/shared/test-utils/*',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        projectService: true, // automatically use the nearest tsconfig.json
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^react',
              '^(redux|axios|uuid|classnames|@(/?.*|$))',
              '^(api|store|components|ui|pages)(/.*|$)',
              '^(utils|hooks|helpers|shared)(/.*|$)',
              '^\\u0000',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              '^assets(/.*|$)',
              '^.+\\.?(css)$',
            ],
          ],
        },
      ],
      'import-sort/exports': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prefer-const': 'error',
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  }
);
