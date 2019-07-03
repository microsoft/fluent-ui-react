import { ComponentSlotStylesInput, ICSSInJSStyle, ThemeIconSpec } from '../../../types'
import { IconProps } from '../../../../components/Icon/Icon'
import { IconVariables } from '../../../teams/components/Icon/iconVariables'
import { emptyIcon } from '../../../base/components/Icon/iconNames'

const iconStyles: ComponentSlotStylesInput<IconProps, IconVariables> = {
  root: ({ props: p, theme: t }): ICSSInJSStyle => {
    const iconSpec: ThemeIconSpec = t.icons[p.name] || emptyIcon
    const isFontIcon = !iconSpec.isSvg

    return (
      isFontIcon && {
        fontWeight: 900, // required for the fontAwesome to render
      }
    )
  },
}

export default iconStyles
