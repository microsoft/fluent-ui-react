import * as React from 'react'
import { SvgIconSpec, ComponentPartStyleFunction } from '../../../../../../types/theme'
import { Extendable, ObjectOf, ObjectOrFunc } from '../../../../../../types/utils'
import { IIconProps } from '../../../../../components/Icon/Icon'

type SvgIconSpecWithStyles = {
  icon: SvgIconSpec
  styles: ObjectOf<ComponentPartStyleFunction<IIconProps, any>>
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithStyles
