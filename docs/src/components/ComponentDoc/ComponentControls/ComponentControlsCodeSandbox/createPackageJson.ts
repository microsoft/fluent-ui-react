import * as _ from 'lodash'

import { imports } from 'docs/src/components/Playground/renderConfig'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'

const name = 'stardust-ui-example'
const description =
  'An exported example from Stardust UI React, https://stardust-ui.github.io/react/'
const dependencies = {
  '@stardust-ui/code-sandbox': 'latest',
  ..._.mapValues(imports, pkg => pkg.version),
  // required to enable all features due old templates in https://github.com/codesandbox/codesandbox-importers
  // https://github.com/stardust-ui/react/issues/1519
  'react-scripts': 'latest',
}

const createPackageJson = (mainFilename: string, language: ComponentSourceManagerLanguage) => ({
  content: JSON.stringify(
    {
      name,
      version: '1.0.0',
      description,
      main: mainFilename,
      dependencies,
    },
    null,
    2,
  ),
})

export default createPackageJson
