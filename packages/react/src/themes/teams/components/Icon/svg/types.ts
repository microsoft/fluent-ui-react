import { SvgIconSpec, ComponentSlotStyleFunction } from '../../../../types'
import { ObjectOf } from '../../../../../types'
import { IconProps } from '../../../../../components/Icon/Icon'

export type SvgIconSpecWithStyles = {
  icon: SvgIconSpec
  styles: ObjectOf<ComponentSlotStyleFunction<IconProps, any>>
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithStyles

// TEMPORARY, till the moment when all necessary Teams icons will be moved
// to this Stardust theme
export type TeamsProcessedSvgIconSpec = SvgIconSpecWithStyles & {
  exportedAs?: string
}
