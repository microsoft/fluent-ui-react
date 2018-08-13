import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'

const solidBorder = (color: string) => ({
  border: `1px solid ${color}`,
})

export default {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { icons, fluid, type, shape, vertical } = props
    return {
      display: 'flex',
      ...(vertical && {
        flexDirection: 'column',
        ...(!fluid && { width: pxToRem(200) }),
        ...(icons && {
          display: 'inline-block',
          width: 'auto',
        }),
      }),
      ...(shape !== 'pills' &&
        !icons &&
        shape !== 'underlined' && {
          ...solidBorder(variables.defaultBorderColor),
          ...(type === 'primary' && {
            ...solidBorder(variables.typePrimaryBorderColor),
          }),
          borderRadius: pxToRem(4),
        }),
      ...(shape === 'underlined' && {
        borderBottom: `2px solid ${variables.typePrimaryUnderlinedBorderColor}`,
      }),
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
  },
}
