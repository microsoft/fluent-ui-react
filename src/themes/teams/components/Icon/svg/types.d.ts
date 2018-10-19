import * as React from 'react'
import { SvgIconSpec, ComponentSlotStyleFunction } from '../../../../../../types/theme'
import { Extendable, ObjectOf, ObjectOrFunc } from '../../../../../../types/utils'
import { IconProps } from '../../../../../components/Icon/Icon'

type SvgIconSpecWithStyles = {
  icon: SvgIconSpec
  styles: ObjectOf<ComponentSlotStyleFunction<IconProps, any>>
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithStyles
