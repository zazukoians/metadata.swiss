import {nodePolyfills} from 'vite-plugin-node-polyfills'
import {defineConfig} from "vite";
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
  root: 'src/admin',
  base: '/admin',
  build: {
    outDir: 'public/admin',
    rollupOptions: {
      input: 'index.html',
    },
  },
  plugins: [
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: 'config.yml',
          dest: ''
        }
      ]
    })
  ],
})
