import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
        'src/main.tsx',
        'src/App.tsx',
        'src/theme.ts',
        'src/components/Header.tsx',
        'src/components/ProductList.tsx',
        'src/components/ShoppingCart.tsx',
        'src/services/api.ts',
        '**/.eslintrc.*',
        '**/.*rc.*',
        '**/*.cjs',
      ],
      thresholds: {
        branches: 75,
        functions: 75,
        lines: 75,
        statements: 75,
      },
    },
  },
});
