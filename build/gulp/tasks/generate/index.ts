import { task, src, dest, parallel, series } from 'gulp'
import { argv } from 'yargs'
import config from '../../../../config'
import * as rename from 'gulp-rename'
import * as replace from 'gulp-replace'
import * as inquirer from 'inquirer'
import * as _ from 'lodash'
import * as path from 'path'
import * as fs from 'fs'

const { paths } = config
const DISPLAY_NAME = '$DisplayName'
const KEBAB_DISPLAY_NAME = '$kebab-display-name'

let componentName: string

function writeWarning(message) {
  console.log(`WARNING: ${message}`)
}

function ensureExportStatementPresentInLibIndexFile(componentName: string) {
  const libIndexFilePath = paths.src('index.ts')

  const libIndexFileContent = fs.readFileSync(libIndexFilePath).toString()
  const componentExportStatement = `export { default as ${componentName} } from './components/${componentName}'`

  if (libIndexFileContent.includes(componentExportStatement)) {
    writeWarning(
      `Component '${componentName}' is already exported, nothing is added to lib's index file.`,
    )
    return
  }

  fs.appendFileSync(libIndexFilePath, `${componentExportStatement}\n`)
}

task('generate:component:name', cb => {
  const COMPONENT_NAME_REGEX = /^[A-Z]([A-Za-z\d])+$/
  const { name } = argv

  if (name && COMPONENT_NAME_REGEX.test(name)) {
    componentName = name
    return cb()
  }

  if (name) {
    writeWarning(
      'Invalid Component name is provided. Component name should start with a capital letter and may only include letters or numbers.',
    )
  }

  const QUESTIONS = [
    {
      name: 'componentName',
      type: 'input',
      message: 'Component name:',
      validate(input) {
        if (COMPONENT_NAME_REGEX.test(input)) return true

        return 'Component name should start with a capital letter and may only include letters or numbers.'
      },
    },
  ]

  return inquirer.prompt(QUESTIONS).then(answers => {
    componentName = answers.componentName
  })
})

task('generate:component:src', cb => {
  const directory = paths.src('components', componentName)
  if (fs.existsSync(directory)) {
    writeWarning(`${path.relative(process.cwd(), directory)} already exists, skipping.`)
    return cb()
  }

  return src(path.resolve(__dirname, `./templates/src-components/${DISPLAY_NAME}/**/*`))
    .pipe(replace(DISPLAY_NAME, componentName))
    .pipe(replace(KEBAB_DISPLAY_NAME, _.kebabCase(componentName)))
    .pipe(
      rename(path => {
        path.basename = path.basename.replace(DISPLAY_NAME, componentName)
      }),
    )
    .pipe(dest(directory))
})

task('generate:component:export', cb => {
  ensureExportStatementPresentInLibIndexFile(componentName)
  cb()
})

task('generate:component:docs', cb => {
  const directory = paths.docsSrc('examples', 'components', componentName)
  if (fs.existsSync(directory)) {
    writeWarning(`${path.relative(process.cwd(), directory)} already exists, skipping.`)
    return cb()
  }

  return src(path.resolve(__dirname, `./templates/docs-examples-components/${DISPLAY_NAME}/**/*`))
    .pipe(replace(DISPLAY_NAME, componentName))
    .pipe(
      rename(path => {
        path.basename = path.basename.replace(DISPLAY_NAME, componentName)
      }),
    )
    .pipe(dest(directory))
})

task('generate:component:test', cb => {
  const directory = paths.base('test', 'specs', 'components', componentName)
  if (fs.existsSync(directory)) {
    writeWarning(`${path.relative(process.cwd(), directory)} already exists, skipping.`)
    return cb()
  }

  return src(path.resolve(__dirname, `./templates/test-specs-components/${DISPLAY_NAME}/**/*`))
    .pipe(replace(DISPLAY_NAME, componentName))
    .pipe(
      rename(path => {
        path.basename = path.basename.replace(DISPLAY_NAME, componentName)
      }),
    )
    .pipe(dest(directory))
})

task(
  'generate:component',
  series(
    'generate:component:name',
    parallel(
      'generate:component:src',
      'generate:component:export',
      'generate:component:docs',
      'generate:component:test',
    ),
  ),
)
