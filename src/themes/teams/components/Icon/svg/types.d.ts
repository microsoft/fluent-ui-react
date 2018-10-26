import { SvgIconSpec, ComponentSlotStyleFunction } from '../../../../types'
import { ObjectOf } from '../../../../../../types/utils'
import { IconProps } from '../../../../../components/Icon/Icon'

type SvgIconSpecWithStyles = {
  icon: SvgIconSpec
  css: ObjectOf<ComponentSlotStyleFunction<IconProps, any>>
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithStyles
