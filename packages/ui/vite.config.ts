import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts';
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react(), tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    }
  }

  return {
    plugins: [react(), dts({ insertTypesEntry: true })],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'tailwindcss'],
        output: {
          // 1. Keep the folder structure (src/Button.tsx -> dist/src/Button.js)
          preserveModules: true,
          preserveModulesRoot: 'src',

          // 2. Use .js extension for ESM
          entryFileNames: '[name].js',
        },
      },
    },
  };


}
)
