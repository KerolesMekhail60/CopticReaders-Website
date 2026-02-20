import { FlatCompat } from '@eslint/eslintrc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  // Flat Config doesn't use "overrides", so we define separate entries for specific file patterns
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // `react` first
            ['^react$'],
            // `next` second
            ['^next'],
            // All third-party packages starting with a character (excluding @)
            ['^[a-z]'],
            // @tanstack imports
            ['^@tanstack', '^@radix'],
            // @components imports
            ['^@/components'],
            // Imports starting with `../`
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Imports starting with `./`
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // @contexts imports
            ['^@/contexts'],
            // @hooks imports
            ['^@/hooks'],
            // @types imports
            ['^@/types'],
            // @/utils imports
            ['^@/utils'],
            // @/constants imports
            ['^@/constants'],
            // Style imports (CSS/SCSS)
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
