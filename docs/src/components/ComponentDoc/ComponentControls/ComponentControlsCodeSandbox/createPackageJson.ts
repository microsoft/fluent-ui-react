import * as _ from 'lodash'

import { imports } from 'docs/src/components/Playground/renderConfig'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'

const name = 'stardust-ui-example'
const description =
  'An exported example from Stardust UI React, https://stardust-ui.github.io/react/'
const dependencies = _.mapValues(imports, () => 'latest')
const devDependencies = {
  '@types/lodash': 'latest',
  '@types/react': 'latest',
  '@types/react-dom': 'latest',
}

const createPackageJson = (mainFilename: string, language: ComponentSourceManagerLanguage) => ({
  content: JSON.stringify(
    {
      name,
      version: '1.0.0',
      description,
      main: mainFilename,
      dependencies,
      devDependencies: language === 'ts' ? devDependencies : {},
    },
    null,
    2,
  ),
})

export default createPackageJson
