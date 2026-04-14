const { context } = require('esbuild')
const vue3Plugin = require('esbuild-plugin-vue3')

const isWatch = process.argv.includes('--watch')

const config = {
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
}

if (isWatch) {
  context(config).then(ctx => ctx.watch()).catch(() => process.exit(1))
} else {
  const { build } = require('esbuild')
  build(config).catch(() => process.exit(1))
}
