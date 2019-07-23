import { useSelectKnob, useStringKnob } from '@stardust-ui/docs-components'
import {
  AvatarProps,
  BoxProps,
  DividerProps,
  IconProps,
  ImageProps,
  VideoProps,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as faker from 'faker'

import { KnobComponentGenerators } from 'docs/src/types'
import { number } from 'docs/src/components/ComponentPlayground/typeGenerators'

export const Avatar: KnobComponentGenerators<AvatarProps> = {
  name: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: _.capitalize(`${faker.name.firstName()} ${faker.name.lastName()}`),
  }),
}

export const Box: KnobComponentGenerators<BoxProps> = {
  // TODO: fix support for boxes
  children: () => null,
}

export const Divider: KnobComponentGenerators<DividerProps> = {
  // Workaround for `Divider` component that supports size in different way
  size: number,
}

export const Icon: KnobComponentGenerators<IconProps> = {
  name: ({ componentInfo, propDef, propName, theme }) => {
    const values = Object.keys(theme.icons).slice(0, 10)

    return {
      hook: useSelectKnob,
      name: propName,
      allowsNone: _.isNil(propDef.defaultValue),
      initialValue: propDef.defaultValue,
      values,
    }
  },
}

export const Image: KnobComponentGenerators<ImageProps> = {
  src: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: faker.image.avatar(),
  }),
}

export const Video: KnobComponentGenerators<VideoProps> = {
  poster: ({ componentInfo, propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
  }),
  src: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  }),
}
