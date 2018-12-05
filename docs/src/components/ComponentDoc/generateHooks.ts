import { ComponentProp } from '../../../../build/gulp/plugins/util/types'
import { ThemePrepared } from 'src/themes/types'
import { ComponentInfo } from '../../../../build/gulp/plugins/util/types'
import { UseKnobOptions } from '@stardust-ui/docs-components/src/knobs/types'
import { useBooleanKnob, useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import * as _ from 'lodash'
import * as faker from 'faker'

type ValueGenerator = (
  propDef: ComponentProp,
  theme: ThemePrepared,
) => UseKnobOptions<any> & { hook: Function }

const as: ValueGenerator = propDef => {
  return {
    hook: useStringKnob,
    name: 'as',
    initialValue: propDef.defaultValue,
  }
}

const content: ValueGenerator = () => {
  return {
    hook: useStringKnob,
    name: 'content',
    initialValue: _.capitalize(`${faker.hacker.verb()} ${faker.hacker.noun()}`),
  }
}

const color: ValueGenerator = (propDef, theme) => {
  return {
    hook: useSelectKnob,
    name: 'color',
    initialValue: propDef.defaultValue,
    values: Object.keys({
      ...theme.siteVariables.contextualColors,
      ...theme.siteVariables.naturalColors,
    }),
  }
}

const src = (propDef: ComponentProp) => {
  return {
    hook: useStringKnob,
    name: 'src',
    initialValue: faker.image.city(150, 150),
  }
}

const specialProps: Record<string, ValueGenerator> = {
  as,
  content,
  color,
  src,
}

const boolean: ValueGenerator = propDef => {
  return {
    hook: useBooleanKnob,
    name: propDef.name,
    initialValue: propDef.defaultValue,
  }
}

const number: ValueGenerator = propDef => {
  return {
    hook: useStringKnob,
    name: propDef.name,
    initialValue: propDef.defaultValue,
  }
}

const string: ValueGenerator = propDef => {
  return {
    hook: useStringKnob,
    name: propDef.name,
    initialValue: propDef.defaultValue,
  }
}

const supportedTypes = {
  boolean,
  number,
  string,
}

const propsBlacklist = ['accessibility', 'animation', 'className', 'styles', 'variables']

const generateHooks = (info: ComponentInfo, theme: ThemePrepared) => {
  const hooks = []
  const unsupportedProps: string[] = []

  info.props.forEach(propDef => {
    if (propsBlacklist.indexOf(propDef.name) > -1) {
      unsupportedProps.push(propDef.name)
      return
    }

    if (specialProps[propDef.name]) {
      hooks.push(specialProps[propDef.name](propDef, theme))
      return
    }

    if (propDef.types.length === 1) {
      const typeName = propDef.types[0].name

      if (supportedTypes[typeName]) {
        hooks.push(supportedTypes[typeName](propDef, theme))
        return
      }
    }

    unsupportedProps.push(propDef.name)
  })

  return [hooks, unsupportedProps]
}

export default generateHooks
