import * as React from 'react'

import { ExampleSource } from 'docs/src/types'
import { examplesContext, exampleSourcesContext } from 'docs/src/utils'
import { componentAPIs, ComponentAPIs } from './componentAPIs'

const getExampleModule = (
  examplePath: string,
  componentAPI: keyof ComponentAPIs,
): { component: React.ElementType; source: ExampleSource } | undefined => {
  const fileSuffix = componentAPIs[componentAPI].fileSuffix

  const sourcePath = `${examplePath.replace(/^components/, '.')}${fileSuffix}.source.json`
  const modulePath = `./${examplePath}${fileSuffix}.tsx`

  try {
    return {
      component: examplesContext(modulePath).default,
      source: exampleSourcesContext(sourcePath),
    }
  } catch (e) {
    return null
  }
}

export default getExampleModule
