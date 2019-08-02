import { deepPick, deepPickBy, containsSubstring } from './utils'
import traverse from './debugDataTraversal'

import { SiteVariablesDebugData, VariablesDebugData, StylesDebugData, IDebugData } from './types'

export default class DebugData implements IDebugData {
  constructor(
    public readonly componentName: string,
    public readonly siteVariables: SiteVariablesDebugData,
    public readonly variables: VariablesDebugData,
    public readonly styles: StylesDebugData,
  ) {}

  public whosProp(propNameOrPredicate: string | ((propName: string) => boolean)) {
    if (typeof propNameOrPredicate === 'function') {
      return traverse(this, data =>
        deepPickBy(data, currentPropName => propNameOrPredicate(currentPropName)),
      )
    }

    return traverse(this, data => deepPick(data, propNameOrPredicate))
  }

  public whosPropContains(substring: string) {
    return this.whosProp(propName => containsSubstring(propName, substring))
  }

  public whosValue(valueOrPredicate: object | ((value: object) => boolean)) {
    if (typeof valueOrPredicate === 'function') {
      return traverse(this, data =>
        deepPickBy(data, (currentPropName, currentPropValue) => valueOrPredicate(currentPropValue)),
      )
    }

    return traverse(
      this,
      data =>
        // This loose comparison (with two equal signs) is necessary
        // so that provided prop value of, say, number 400 for font weight
        // would trigger match for the values defined as string '400'.

        // tslint:disable:triple-equals
        deepPickBy(
          data,
          // eslint-disable-next-line eqeqeq
          (currentPropName, currentPropValue) => currentPropValue == valueOrPredicate,
        ),
      // tslint:enable:triple-equals
    )
  }

  public whosValueContains(substring: string) {
    return this.whosValue(value => containsSubstring(value, substring))
  }
}
