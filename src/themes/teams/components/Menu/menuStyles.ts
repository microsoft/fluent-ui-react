import { teamsPxToRem } from '../../utils'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IMenuProps } from '../../../../components/Menu/Menu'

const solidBorder = (color: string) => ({
  border: `1px solid ${color}`,
})

export default {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { iconOnly, fluid, pointing, pills, type, underlined, vertical } = props
    return {
      display: 'flex',
      ...(vertical && {
        flexDirection: 'column',
        ...(!fluid && { width: teamsPxToRem(200) }),
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
          ...(type === 'primary' && {
            ...solidBorder(variables.typePrimaryBorderColor),
          }),
          borderRadius: teamsPxToRem(4),
          overflow: 'hidden',
        }),
      ...(underlined && {
        borderBottom: `2px solid ${variables.typePrimaryUnderlinedBorderColor}`,
      }),
      minHeight: teamsPxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
  },
} as IComponentPartStylesInput<IMenuProps, any>
