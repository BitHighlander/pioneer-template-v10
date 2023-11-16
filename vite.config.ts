/* eslint-disable import/no-extraneous-dependencies */
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    checker({ typescript: true, eslint: { lintCommand: 'eslint src' } }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      buffer: require.resolve('buffer/'),
      events: require.resolve('events/'),
    },
  },
  server: {
    open: true,
    port: 4321,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        // NodeModulesPolyfillPlugin()
      ],
    },
  },
  define: {
    'process.env': {},
  },
  build: {
    minify: false,
    rollupOptions: {
      external: [/^node:.*/, ''],
      plugins: [
        // inject({ Buffer: ['Buffer','Buffer'], process: ['process'] }),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        // NodeModulesPolyfillPlugin()
        // rollupNodePolyFill(),
      ],
    },
  },
});
