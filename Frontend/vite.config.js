import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), '');
  return{
    plugins: [react()],
    server: {
      proxy: {
        '/auth': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/auth/, '/auth'),
          changeOrigin: true,
          secure: true,
        },
        '/user': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/user/, '/user'),  // Asegúrate de corregir esto
          changeOrigin: true,
          secure: true,
        },
        '/coctel': {
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/coctel/, '/coctel'),  // Asegúrate de corregir esto
          changeOrigin: true,
          secure: true,
          ws: true,
        }
      }
    }
  }
})