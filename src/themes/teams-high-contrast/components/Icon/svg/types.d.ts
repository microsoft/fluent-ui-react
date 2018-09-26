import { ComponentPartStyleFunction, SvgIconSpec } from '../../../../../../types/theme'
import { ObjectOf } from '../../../../../../types/utils'
import { IIconProps } from '../../../../../components/Icon/Icon'

type SvgIconSpecWithStyles = {
  icon: SvgIconSpec
  styles: ObjectOf<ComponentPartStyleFunction<IIconProps, any>>
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithStyles
