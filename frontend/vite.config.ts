import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
 
  optimizeDeps: {
    include: ['datatables.net-dt/css/jquery.dataTables.css'],
  },
  plugins: [react(),tsconfigPaths()],
  resolve: {
    alias: {
      "@app/*": path.resolve(__dirname, "./src"),
      '@app/assets/*': path.resolve(__dirname, "./src/assets/*"),
      '@app/features/*': path.resolve(__dirname, "./src/features/*"),
      '@app/public/*': path.resolve(__dirname, "./public/*"),
      '@app/utils/*': path.resolve(__dirname, "./src/app/utils/*"),
      '@app/hooks/*': path.resolve(__dirname, "./src/app/hooks/*"),
      '@app/props/*': path.resolve(__dirname, "./src/app/props/*"),
      '@app/interfaces/*': path.resolve(__dirname, "./src/app/interfaces/*"),
      '@app/types/*': path.resolve(__dirname, "./src/app/types/*"),
      '@app/api/*': path.resolve(__dirname, "./src/app/api/*"),
      '@app/stores/*': path.resolve(__dirname, "./src/app/stores/*"),
      // Add more as needed
    }
  }

},
)
