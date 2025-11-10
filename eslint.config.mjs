import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // 불필요한 변수는 개발 중 경고로 표기 (생산성 보존)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // 콘솔 활용은 개발/디버깅에 유용하므로 경고 수준
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      // Import 정렬 규칙 (ESLint가 처리)
      'sort-imports': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
        },
      ],
      'prefer-const': 'warn', // 변경 없는 변수는 const 사용 권장
      eqeqeq: ['error', 'always'], // 일관된 비교 연산(===) 권장
      'no-debugger': 'error', // 실수로 디버거 남는 것 방지
      'react/jsx-uses-react': 'off', // Next.js 자동 JSX 설정
      'react/react-in-jsx-scope': 'off', // Next.js JSX 전역
      '@next/next/no-img-element': 'warn', // next/image 우선 사용 경고
      'react-hooks/exhaustive-deps': 'warn', // useEffect 등 의존성 올바르게 관리
    },
  },
]);

export default eslintConfig;
