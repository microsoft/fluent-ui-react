import { useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import { Button } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as faker from 'faker'
import * as React from 'react'

import { KnobGenerator } from 'docs/src/types'
import { number } from 'docs/src/components/ComponentPlayground/typeGenerators'

export const as: KnobGenerator<string> = ({ propName, propDef }) => ({
  hook: useStringKnob,
  name: propName,
  initialValue: propDef.defaultValue,
})

export const content: KnobGenerator<string> = ({ propName }) => ({
  hook: useStringKnob,
  name: propName,
  initialValue: _.capitalize(`${faker.hacker.verb()} ${faker.hacker.noun()}`),
})

export const color: KnobGenerator<string> = ({ propName, propDef, componentInfo, theme }) => ({
  hook: useSelectKnob,
  name: propName,
  initialValue: propDef.defaultValue,
  values: Object.keys({
    ...theme.siteVariables.contextualColors,
    ...theme.siteVariables.naturalColors,
  }),
})

export const name: KnobGenerator<string> = ({ componentInfo, propName, theme }) => {
  if (componentInfo.displayName === 'Icon') {
    const values = Object.keys(theme.icons).slice(0, 10)

    return {
      hook: useSelectKnob,
      name: propName,
      initialValue: values[0],
      values,
    }
  }

  if (componentInfo.displayName === 'Avatar') {
    return {
      hook: useStringKnob,
      name: propName,
      initialValue: _.capitalize(`${faker.name.firstName()} ${faker.name.lastName()}`),
    }
  }

  throw new Error(
    `A generated value for "name" prop is supported only on "Avatar" and "Icon" components`,
  )
}

export const poster: KnobGenerator<string> = ({ componentInfo, propName }) => {
  if (componentInfo.displayName !== 'Video') {
    throw new Error(`A generated value for "src" prop is supported only on "Video" component`)
  }

  return {
    hook: useStringKnob,
    name: propName,
    initialValue:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
  }
}

export const size: KnobGenerator<string> = ({ propName, propDef, componentInfo, theme }) => {
  if (propDef.types.length > 1) {
    throw new Error(
      `A "${
        componentInfo.displayName
      }" for "size" prop defines multiple types, it is not supported`,
    )
  }

  // Workaround for `Divider` component that supports size in different way
  if (componentInfo.displayName === 'Divider' && propDef.types[0].name === 'number') {
    return number({ propName, propDef, componentInfo, theme })
  }

  if (propDef.types[0].name !== 'SizeValue') {
    throw new Error(
      `A "${
        componentInfo.displayName
      }" for "size" prop defines type different than "SizeValue" it is not supported`,
    )
  }

  return {
    hook: useSelectKnob,
    name: propName,
    initialValue: propDef.defaultValue,
    values: ['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest'],
  }
}

export const trigger: KnobGenerator<React.ReactElement> = ({ propName }) => ({
  hook: () => [<Button content="A trigger" />],
  name: propName,
})

export const src: KnobGenerator<string> = ({ componentInfo, propName }) => {
  if (componentInfo.displayName === 'Image') {
    return {
      hook: useStringKnob,
      name: propName,
      initialValue: faker.image.avatar(),
    }
  }

  if (componentInfo.displayName === 'Video') {
    return {
      hook: useStringKnob,
      name: propName,
      initialValue:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    }
  }

  throw new Error(
    `A generated value for "src" prop is supported only on "Image" and "Video" components`,
  )
}
