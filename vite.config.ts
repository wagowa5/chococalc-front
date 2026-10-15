import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    envPrefix: 'REACT_APP_',
    // Cognito's browser dependencies use the Node-style global alias.
    define: { global: 'globalThis' },
    build: { outDir: 'build' },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        clearMocks: true,
        restoreMocks: true,
        unstubEnvs: true,
        unstubGlobals: true,
    },
});
