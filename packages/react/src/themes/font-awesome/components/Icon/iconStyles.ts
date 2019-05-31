import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { IconProps } from '../../../../components/Icon/Icon'
import { IconVariables } from '../../../teams/components/Icon/iconVariables'

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: (): ICSSInJSStyle => ({
    fontWeight: 900, // required for the fontAwesome to render
  }),
}

export default iconStyles
