import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
  },
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('certificates/localhost-key.pem'),
      cert: fs.readFileSync('certificates/localhost.pem'),
    },
  },
});
