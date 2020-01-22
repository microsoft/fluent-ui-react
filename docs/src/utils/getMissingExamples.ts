import * as _ from 'lodash'
import { MissingExample } from '../types'
import componentInfoContext from './componentInfoContext'
import { exampleSourcesContext } from './exampleContexts'

/**
 * Given a `displayName`, return all the `componentInfo` prop definitions for this component
 * that do not have a corresponding documentation example.
 */
function getMissingExamples(displayName: string): MissingExample[] {
  const info = componentInfoContext.byDisplayName[displayName]
  const patternForComponentExample = `\\./${displayName}/[\\w/]+Example`

  const examplePaths = exampleSourcesContext
    .keys()
    .filter(path => new RegExp(patternForComponentExample).test(path))

  return info.props.reduce((acc, propDef) => {
    const pascalPropName = _.startCase(propDef.name).replace(/ /g, '')
    const examplePattern = `${patternForComponentExample}${pascalPropName}\\.\\w+`
    const hasExample = examplePaths.some(path => new RegExp(examplePattern).test(path))

    if (!hasExample) {
      acc.push({ info, prop: propDef })
    }

    return acc
  }, [])
}

export default getMissingExamples
