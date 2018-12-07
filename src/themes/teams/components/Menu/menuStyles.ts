import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuProps } from '../../../../components/Menu/Menu'

const solidBorder = (color: string) => ({
  border: `1px solid ${color}`,
})

export default {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, primary, underlined, vertical } = props
    return {
      display: 'flex',
      ...(iconOnly && { alignItems: 'center' }),
      ...(vertical && {
        flexDirection: 'column',
        ...(!fluid && { width: pxToRem(200) }),
        ...(iconOnly && {
          display: 'inline-block',
          width: 'auto',
        }),
      }),
      ...(!pills &&
        !iconOnly &&
        !(pointing && vertical) &&
        !underlined && {
          ...solidBorder(variables.defaultBorderColor),
          ...(primary && {
            ...solidBorder(variables.primaryBorderColor),
          }),
          borderRadius: pxToRem(4),
          overflow: 'hidden',
        }),
      ...(underlined && {
        borderBottom: `2px solid ${variables.primaryUnderlinedBorderColor}`,
      }),
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
  },
} as ComponentSlotStylesInput<MenuProps, any>
