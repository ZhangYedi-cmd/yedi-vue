import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        root:'./src/__tests__/',
        passWithNoTests: true,
        exclude: ['**/node_modules/**', '**/dist/**'],
        threads: true
    }
});