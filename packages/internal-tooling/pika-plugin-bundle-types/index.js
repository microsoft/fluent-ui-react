const path = require('path')
const fs = require('fs')
const { rollup } = require('rollup')
const { dts } = require('rollup-plugin-dts')

const build = async ({ cwd, manifest, out, reporter }) => {
  const tsConfig = path.join(cwd, 'tsconfig.json')

  if (manifest.types) {
    console.info(
      [
        '\n',
        'ℹ️  dist-types/: ',
        'Your "package.json" contains "types" field, generation is skipped.',
      ].join(' '),
    )
    return
  }

  if (!fs.existsSync(tsConfig)) {
    console.error(
      ['\n', '⚠️  dist-types/: ', 'Ensure that your package contains "tsconfig.json" file.'].join(
        ' ',
      ),
    )
    throw new Error(`Failed to build: dist-types/`)
  }

  const typingsOutputDir = path.join(out, 'dist-types')
  const typingsOutputFile = path.join(typingsOutputDir, 'index.d.ts')

  await (async () => {
    const result = await rollup({
      // TODO: make this list configurable
      external: ['fela', 'lodash', 'react', 'prop-types', 'react-dom'],
      input: path.resolve(cwd, 'src', 'index.ts'),
      plugins: [dts({ tsconfig: tsConfig })],
    })

    await result.write({
      file: typingsOutputFile,
      format: 'es',
    })
  })()

  reporter.created(typingsOutputFile, 'types')
}

const manifest = (newManifest, { manifest }) => {
  newManifest.types = manifest.types || 'dist-types/index.d.ts'
}

module.exports = {
  build,
  manifest,
}
