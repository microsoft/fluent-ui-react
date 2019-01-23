import { ExampleSource } from 'docs/src/types'
import { exampleSourcesContext } from 'docs/src/utils'
import { componentAPIs, ComponentAPIs } from './componentAPIs'

const getExampleSource = (
  examplePath: string,
  componentAPI: keyof ComponentAPIs,
): ExampleSource | undefined => {
  const sourcePath = `${examplePath.replace(/^components/, '.')}${
    componentAPIs[componentAPI].fileSuffix
  }.source.json`

  try {
    return exampleSourcesContext(sourcePath)
  } catch (e) {
    return undefined
  }
}

export default getExampleSource
