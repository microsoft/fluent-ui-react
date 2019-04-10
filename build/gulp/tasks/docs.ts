import * as historyApiFallback from 'connect-history-api-fallback'
import * as express from 'express'
import { task, src, dest, lastRun, parallel, series, watch } from 'gulp'
import * as cache from 'gulp-cache'
import * as remember from 'gulp-remember'
import * as fs from 'fs'
import * as path from 'path'
import * as rimraf from 'rimraf'
import * as webpack from 'webpack'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import * as WebpackHotMiddleware from 'webpack-hot-middleware'

import sh from '../sh'
import config from '../../../config'
import gulpComponentMenu from '../plugins/gulp-component-menu'
import gulpComponentMenuBehaviors from '../plugins/gulp-component-menu-behaviors'
import gulpDoctoc from '../plugins/gulp-doctoc'
import gulpExampleMenu from '../plugins/gulp-example-menu'
import gulpExampleSource from '../plugins/gulp-example-source'
import gulpReactDocgen from '../plugins/gulp-react-docgen'
import { getRelativePathToSourceFile } from '../plugins/util'
import webpackPlugin from '../plugins/gulp-webpack'

const { paths } = config
const g = require('gulp-load-plugins')()
const { colors, log } = g.util

const handleWatchChange = path => log(`File ${path} was changed, running tasks...`)
const handleWatchUnlink = (group, path) => {
  log(`File ${path} was deleted, running tasks...`)
  remember.forget(group, path)
}

// ----------------------------------------
// Clean
// ----------------------------------------

task('clean:cache', () => cache.clearAll())

task('clean:docs:component-menu', cb => {
  rimraf(paths.docsSrc('componentMenu.json'), cb)
})

task('clean:docs:component-menu-behaviors', cb => {
  rimraf(paths.docsSrc('behaviorMenu.json'), cb)
})

task('clean:docs:dist', cb => {
  rimraf(paths.docsDist(), cb)
})

task('clean:docs:example-menus', cb => {
  rimraf(paths.docsSrc('exampleMenus'), cb)
})

task('clean:docs:example-sources', cb => {
  rimraf(paths.docsSrc('exampleSources'), cb)
})

task(
  'clean:docs',
  parallel(
    'clean:docs:component-menu',
    'clean:docs:component-menu-behaviors',
    'clean:docs:dist',
    'clean:docs:example-menus',
    'clean:docs:example-sources',
  ),
)

// ----------------------------------------s
// Build
// ----------------------------------------

const componentsSrc = [`${paths.posix.packageSrc('react')}/components/*/[A-Z]*.tsx`]
const behaviorSrc = [`${paths.posix.packageSrc('react')}/lib/accessibility/Behaviors/*/[a-z]*.ts`]
const examplesIndexSrc = `${paths.posix.docsSrc()}/examples/*/*/*/index.tsx`
const examplesSrc = `${paths.posix.docsSrc()}/examples/*/*/*/!(*index|.knobs).tsx`
const markdownSrc = [
  '.github/CONTRIBUTING.md',
  '.github/setup-local-development.md',
  '.github/add-a-feature.md',
  '.github/document-a-feature.md',
  '.github/test-a-feature.md',
  'specifications/*.md',
]

task('build:docs:component-info', () =>
  src(componentsSrc, { since: lastRun('build:docs:component-info') })
    .pipe(
      cache(gulpReactDocgen(), {
        name: 'componentInfo',
      }),
    )
    .pipe(dest(paths.docsSrc('componentInfo'))),
)

task('build:docs:component-menu', () =>
  src(componentsSrc, { since: lastRun('build:docs:component-menu') })
    .pipe(gulpComponentMenu())
    .pipe(dest(paths.docsSrc())),
)

task('build:docs:component-menu-behaviors', () =>
  src(behaviorSrc, { since: lastRun('build:docs:component-menu-behaviors') })
    .pipe(remember('component-menu-behaviors'))
    .pipe(gulpComponentMenuBehaviors())
    .pipe(dest(paths.docsSrc())),
)

task('build:docs:example-menu', () =>
  src(examplesIndexSrc, { since: lastRun('build:docs:example-menu') })
    .pipe(remember('example-menu')) // FIXME: with watch this unnecessarily processes index files for all examples
    .pipe(gulpExampleMenu())
    .pipe(dest(paths.docsSrc('exampleMenus'))),
)

task('build:docs:example-sources', () =>
  src(examplesSrc, { since: lastRun('build:docs:example-sources') })
    .pipe(
      cache(gulpExampleSource(), {
        name: 'exampleSources',
      }),
    )
    .pipe(dest(paths.docsSrc('exampleSources'))),
)

task(
  'build:docs:json',
  parallel(
    series('build:docs:component-info', 'build:docs:component-menu'),
    'build:docs:component-menu-behaviors',
    'build:docs:example-menu',
    'build:docs:example-sources',
  ),
)

task('build:docs:html', () => src(paths.docsSrc('404.html')).pipe(dest(paths.docsDist())))

task('build:docs:images', () =>
  src(`${paths.docsSrc()}/**/*.{png,jpg,gif}`).pipe(dest(paths.docsDist())),
)

task('build:docs:toc', () =>
  src(markdownSrc, { since: lastRun('build:docs:toc') }).pipe(
    cache(gulpDoctoc(), {
      name: 'md-docs',
    }),
  ),
)

task('build:docs:webpack', cb => {
  webpackPlugin(require('../../../webpack.config').default, cb)
})

task(
  'build:docs',
  series(
    parallel(
      'build:docs:toc',
      series('clean:docs', parallel('build:docs:json', 'build:docs:html', 'build:docs:images')),
    ),
    'build:docs:webpack',
  ),
)

// ----------------------------------------
// Deploy
// ----------------------------------------

task('deploy:docs', cb => {
  const relativePath = path.relative(process.cwd(), paths.docsDist())
  sh(`gh-pages -d ${relativePath} -m "deploy docs [ci skip]"`)
    .then(cb)
    .catch(cb)
})

// ----------------------------------------
// Serve
// ----------------------------------------

task('serve:docs', cb => {
  const app = express()
  const webpackConfig = require('../../../webpack.config').default
  const compiler = webpack(webpackConfig)

  app
    .use(
      historyApiFallback({
        verbose: false,
      }),
    )

    .use(
      WebpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: paths.docsSrc(),
        hot: true,
        quiet: false,
        noInfo: true, // must be quiet for hot middleware to show overlay
        lazy: false,
        stats: config.compiler_stats,
      }),
    )

    .use(WebpackHotMiddleware(compiler))

    .use(express.static(paths.docsDist()))

    .listen(config.server_port, config.server_host, () => {
      log(colors.yellow('Server running at http://%s:%d'), config.server_host, config.server_port)
      cb()
    })
})

// ----------------------------------------
// Watch
// ----------------------------------------

task('watch:docs', cb => {
  // rebuild component info
  watch(componentsSrc, series('build:docs:component-info')).on('change', handleWatchChange)

  // rebuild example menus
  watch(examplesIndexSrc, series('build:docs:example-menu'))
    .on('change', handleWatchChange)
    .on('unlink', path => handleWatchUnlink('example-menu', path))

  watch(examplesSrc, series('build:docs:example-sources'))
    .on('change', handleWatchChange)
    .on('unlink', filePath => {
      log(`File ${filePath} was deleted, running tasks...`)

      const sourceFilename = getRelativePathToSourceFile(filePath)
      const sourcePath = config.paths.docsSrc('exampleSources', sourceFilename)

      try {
        fs.unlinkSync(sourcePath)
      } catch (e) {}
    })

  watch(behaviorSrc, series('build:docs:component-menu-behaviors'))
    .on('change', handleWatchChange)
    .on('unlink', path => handleWatchUnlink('component-menu-behaviors', path))

  // rebuild images
  watch(`${config.paths.docsSrc()}/**/*.{png,jpg,gif}`, series('build:docs:images')).on(
    'change',
    handleWatchChange,
  )
  cb()
})

// ----------------------------------------
// Default
// ----------------------------------------

task('docs', series('build:docs', 'serve:docs', 'watch:docs'))
