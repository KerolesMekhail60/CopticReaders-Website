import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import ImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': ImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
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
            // @context imports
            ['^@/context'],
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
  }
);
