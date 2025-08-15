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
          dest: '',
          transform(content, filename) {
            console.log(filename)
            if (filename.endsWith('config.yml') && process.env.NODE_ENV === 'development') {
              // In development, we want to use the local backend
              return `local_backend: true\n\n${content}`
            }

            return content
          }
        }
      ]
    }),
  ],
})
