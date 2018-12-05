import {
  useBooleanKnob,
  useNumberKnob,
  useSelectKnob,
  useStringKnob,
} from '@stardust-ui/docs-components'
import * as _ from 'lodash'

import { ComponentInfo, KnobGenerator } from 'docs/src/types'
import componentInfoContext from 'docs/src/utils/componentInfoContext'
import createHookGenerator from './createHookGenerator'
import { name } from './propGenerators'

export const boolean: KnobGenerator<boolean> = ({ propName, propDef }) => ({
  hook: useBooleanKnob,
  name: propName,
  initialValue: propDef.defaultValue,
})

export const literal: KnobGenerator<string[]> = ({ propName, propDef }) => ({
  hook: useSelectKnob,
  name: propName,
  initialValue: propDef.defaultValue,
  values: propDef.types.map(type => type.value).filter(Boolean),
})

export const number: KnobGenerator<number> = ({ propName, propDef }) => ({
  hook: useNumberKnob,
  name: propName,
  initialValue: propDef.defaultValue,
})

export const string: KnobGenerator<number> = ({ propName, propDef }) => ({
  hook: useStringKnob,
  name: propName,
  initialValue: propDef.defaultValue,
})

export const ShorthandValue: KnobGenerator<string> = ({ propDef, componentInfo, theme }) => {
  if (propDef.types.length > 1 || propDef.types[0].name !== 'ShorthandValue') {
    throw new Error(` ${componentInfo.displayName} shorthand`)
  }

  const shorthandPropType = propDef.types[0].parameters[0].name
  const shorthandComponentName: string = shorthandPropType.replace(/Props$/, '')

  const shorthandComponentInfo: ComponentInfo =
    componentInfoContext.byDisplayName[shorthandComponentName]

  const mappedShorthandProp = shorthandComponentInfo.mappedShorthandProp
  const shorthandPropDef = _.find(shorthandComponentInfo.props, { name: mappedShorthandProp })

  // TODO: fix support for boxes
  if (shorthandComponentName === 'Box') {
    return null
  }

  if (shorthandComponentName === 'Icon') {
    return name({
      propDef: shorthandPropDef,
      componentInfo: shorthandComponentInfo,
      theme,
      propName: propDef.name,
    })
  }

  if (shorthandPropDef) {
    return createHookGenerator({
      propDef: shorthandPropDef,
      componentInfo: shorthandComponentInfo,
      theme,
      propName: propDef.name,
    })
  }

  throw new Error(
    `There are no definition for "${mappedShorthandProp}" in "${shorthandComponentName}" definition`,
  )
}
