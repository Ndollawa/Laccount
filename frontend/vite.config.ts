import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import inject from '@rollup/plugin-inject';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['datatables.net-dt/css/jquery.dataTables.css'],
  },
  plugins: [
    // inject({
    //   $: 'node_modules/jquery/dist/jquery.min',    // Ensure jQuery is available globally as $
    //   jQuery: 'node_modules/jquery/dist/jquery.min',
    //   'window.jQuery': 'node_modules/jquery/dist/jquery.min',
    // }),
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@app/*": path.resolve(__dirname, '/src/'),
      '@auth/*': path.resolve(__dirname, '/src/features/auth/'),
      '@dashboard/*': path.resolve(__dirname, '/src/features/dashboard/'),
      '@landing/*': path.resolve(__dirname, '/src/features/landing/'),
      '@components/*': path.resolve(__dirname, '/src/features/components/'),
      '@layouts/*': path.resolve(__dirname, '/src/features/layouts/'),
      '@errorPages/*': path.resolve(__dirname, '/src/features/errorPages/'),
      '@uploads/*': path.resolve(__dirname, '/src/features/uploads/'),
      '@assets/*': path.resolve(__dirname, '/src/assets/'),
      '@public/*': path.resolve(__dirname, '/public/'),
      '@utils/*': path.resolve(__dirname, '/src/app/utils/'),
      '@hooks/*': path.resolve(__dirname, '/src/app/hooks/'),
      '@configs/*': path.resolve(__dirname, '/src/app/configs/'),
      '@enums/*': path.resolve(__dirname, '/src/app/enums/'),
      '@props/*': path.resolve(__dirname, '/src/app/props/'),
      '@routes/*': path.resolve(__dirname, '/src/app/routes/'),
      '@interfaces/*': path.resolve(__dirname, '/src/app/interfaces/'),
      '@types/*': path.resolve(__dirname, '/src/app/types/'),
      '@api/*': path.resolve(__dirname, '/src/app/api/'),
      '@store/*': path.resolve(__dirname, '/src/app/store/'),
      // Add more aliases as needed
    }
  }
});
