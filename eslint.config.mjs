import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  {
    ignores: [
      'build/**',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '.npm-cache/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.jest,
        process: 'readonly',
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'react-hooks': reactHooks,
      unicorn,
    },
    rules: {
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'eqeqeq': 'off',
      'no-constant-binary-expression': 'off',
      'no-empty': 'off',
      'no-fallthrough': 'off',
      'no-prototype-builtins': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-useless-escape': 'off',
      'no-useless-assignment': 'off',
      'no-var': 'off',
      'prefer-const': 'off',
      'prefer-spread': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-empty-file': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-invalid-fetch-options': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/require-array-join-separator': 'error',
      'unicorn/throw-new-error': 'error',
    },
  },
);
