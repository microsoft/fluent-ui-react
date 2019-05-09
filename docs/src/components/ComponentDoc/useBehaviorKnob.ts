import { useSelectKnob } from '@stardust-ui/docs-components'
import * as StardustUI from '@stardust-ui/react'

import componentInfoContext from 'docs/src/utils/componentInfoContext'
import useComponentProps from './useComponentProps'

const useBehaviorKnob = (
  componentName: string,
): [StardustUI.Accessibility, (newValue: string) => void] => {
  const componentProps = useComponentProps(componentName)
  const accessibilityProp = componentProps.find(propDef => propDef.name === 'accessibility')

  if (!accessibilityProp) {
    throw new Error(`The "accessibility" prop for "${componentName}" is not defined!`)
  }

  const { defaultValue } = accessibilityProp
  const availableBehaviors = componentInfoContext.byDisplayName[componentName].behaviors || []
  const behaviorNames = [defaultValue, ...availableBehaviors.map(behavior => behavior.name)]

  const [behaviorName, onChange] = useSelectKnob({
    name: 'accessibility',
    initialValue: defaultValue,
    values: behaviorNames,
  })

  return [StardustUI[behaviorName], onChange]
}

export default useBehaviorKnob
