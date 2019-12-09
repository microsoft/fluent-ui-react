import * as React from 'react'
import { mergeThemes, callable, ComponentStyleFunctionParam, themes } from '@fluentui/react'
import * as _ from 'lodash'

/**
 * Not a real performance test, just a temporary POC
 */
const providerMergeThemesPerf = () => {
  const merged = mergeThemes(..._.times(100, n => themes.teams))
  const resolvedStyles = _.mapValues(merged.componentStyles, (componentStyle, componentName) => {
    const compVariables = _.get(
      merged.componentVariables,
      componentName,
      callable({}),
    )(merged.siteVariables)
    const styleParam: ComponentStyleFunctionParam = {
      displayName: componentName,
      props: {},
      variables: compVariables,
      theme: merged,
      rtl: false,
      disableAnimations: false,
    }
    return _.mapValues(componentStyle, (partStyle, partName) => {
      if (partName === '_debug') {
        // TODO: fix in code, happens only with mergeThemes(singleTheme)
        return undefined
      }
      if (typeof partStyle !== 'function') {
        console.log(componentName, partStyle, partName)
      }
      return partStyle(styleParam)
    })
  })

  return resolvedStyles
}

const MergeThemesPerf = () => {
  const resolvedStyles = providerMergeThemesPerf()
  delete resolvedStyles.Button.root._debug
  return <pre>{JSON.stringify(resolvedStyles.Button.root, null, 2)}</pre>
}

export default MergeThemesPerf
