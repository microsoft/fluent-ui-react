import * as React from 'react'
import {
  ObjectOf,
  ComponentPartStyleFunction,
  RenderSvgIconFunction,
} from '../../../../../../types/theme'

type IconSpecObject = {
  icon: RenderSvgIconFunction
  styles: ObjectOf<ComponentPartStyleFunction>
}

export type IconSpec = IconSpecObject | RenderSvgIconFunction
