import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['datatables.net-dt/css/jquery.dataTables.css'],
  },
  plugins: [
    // inject({
    //   $: path.resolve(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')),    // Ensure jQuery is available globally as $
    //   jQuery: path.resolve(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')),
    //   'window.jQuery': path.resolve(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')),
    // }),
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@app/*": path.resolve(path.join(__dirname, './src')),
      '@app/assets/*': path.resolve(path.join(__dirname, './src/assets/*')),
      '@app/features/*': path.resolve(path.join(__dirname, './src/features/*')),
      '@app/public/*': path.resolve(path.join(__dirname, './public/*')),
      '@app/utils/*': path.resolve(path.join(__dirname, './src/app/utils/*')),
      '@app/hooks/*': path.resolve(path.join(__dirname, './src/app/hooks/*')),
      '@app/props/*': path.resolve(path.join(__dirname, './src/app/props/*')),
      '@app/interfaces/*': path.resolve(path.join(__dirname, './src/app/interfaces/*')),
      '@app/types/*': path.resolve(path.join(__dirname, './src/app/types/*')),
      '@app/api/*': path.resolve(path.join(__dirname, './src/app/api/*')),
      '@app/stores/*': path.resolve(path.join(__dirname, './src/app/stores/*')),
      // Add more aliases as needed
    }
  }
});
