const { build } = require('esbuild')
const vue3Plugin = require('esbuild-plugin-vue3')

build({
  entryPoints: ['app/javascript/application.js', 'app/javascript/vue.js'],
  bundle: true,
  sourcemap: true,
  format: 'esm',
  outdir: 'app/assets/builds',
  publicPath: '/assets',
  plugins: [vue3Plugin()],
  loader: {
    '.vue': 'text'
  }
}).catch(() => process.exit(1))
