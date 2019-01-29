import { SvgIconSpec, ComponentSlotStyleFunction } from '../../../../types'
import { ObjectOf } from '../../../../../../types/utils'
import { IconProps } from '../../../../../components/Icon/Icon'

type SvgIconSpecWithMetaData = {
  icon: SvgIconSpec
  styles: ObjectOf<ComponentSlotStyleFunction<IconProps, any>>
  rotateInRtl?: boolean
}

export type TeamsSvgIconSpec = SvgIconSpec | SvgIconSpecWithMetaData

// TEMPORARY, till the moment when all necessary Teams icons will be moved
// to this Stardust theme
export type TeamsProcessedSvgIconSpec = SvgIconSpecWithMetaData & {
  exportedAs?: string
}
