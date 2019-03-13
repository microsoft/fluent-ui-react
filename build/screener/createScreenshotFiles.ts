import * as _ from 'lodash'
import * as fs from 'fs'
import * as prettier from 'prettier'

import { ObjectOf } from 'src/types'
import * as prettierConfig from '../../.prettierrc.json'
import screenshotTestsConfig from 'test/screenshots/screenshot.tests.config'
import config from '../../config'

const g = require('gulp-load-plugins')()
const { log } = g.util
const { paths } = config

const TESTS_BASE_PATH = 'react/test/screenshots'

const converArrayToCamelCaseString = (props: string[]): string =>
  props.map(prop => _.startCase(prop.replace(/\s/g, ''))).join('')

const getFileName = (componentName: string, props: string | ObjectOf<any>) => {
  const suffix = converArrayToCamelCaseString(typeof props === 'string' ? [props] : _.keys(props))
  return `${componentName}${suffix}Test`
}

const getFilePath = (componentName: string, fileName: string) =>
  paths.packages(`${TESTS_BASE_PATH}/${componentName}/${fileName}.screenshot.tsx`)

const convertPropToString = ({
  key,
  value,
}: {
  key: string
  value: string | boolean | {}
}): string => {
  switch (typeof value) {
    case 'boolean':
      return key
    case 'string':
      return `${key}="${value}"`
    default:
      return `${key}={${JSON.stringify(value)}}`
  }
}

const convertPropObjToString = (props: ObjectOf<any>): string => {
  const result: string[] = []

  _.forOwn(props, (value, key) => {
    result.push(convertPropToString({ key, value }))
  })

  return result.join(' ')
}

const convertConfigToCode = (componentName: string, componentConfig: ScreenerTestsConfig): void => {
  const { commonProps, testProps = [''] } = componentConfig
  const imports = [
    `import * as React from 'react'`,
    `import { ${componentName} } from '@stardust-ui/react'\n`,
  ]
  const commonPropsString = convertPropObjToString(commonProps)

  testProps.forEach(props => {
    const fileName = getFileName(componentName, props)
    const restProps = typeof props === 'string' ? props : convertPropObjToString(props)
    const component = `const ${fileName} = <${componentName} ${restProps} ${commonPropsString} />`
    const exportString = `\nexport default ${fileName}`
    const code = [...imports, component, exportString].join('\n')
    const prettyCode = prettier.format(code, {
      ...(prettierConfig as any),
      parser: 'typescript',
    })

    log(`${fileName}.screenshot.tsx`)
    fs.writeFileSync(getFilePath(componentName, fileName), prettyCode)
  })
}

const createScreenshotFiles = () => {
  log('[START] createScreenshotFiles')
  _.forOwn(screenshotTestsConfig, (componentConfig, componentName) => {
    convertConfigToCode(componentName, componentConfig)
  })
  log('[DONE] createScreenshotFiles')
}

export default createScreenshotFiles
