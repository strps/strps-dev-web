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
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'MyUI',
        formats: ['es'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // Only externalize when building for NPM/Next.js
        external: ['react', 'react-dom', 'tailwindcss'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
          },
        },
      },
    },
  };


}
)
