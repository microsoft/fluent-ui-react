import { pxToRem } from '../../../../lib'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { LabelProps } from '../../../../components/Label/Label'
import { LabelVariables } from './labelVariables'
import { getColorScheme } from '../../colors'

const labelStyles: ComponentSlotStylesInput<LabelProps, LabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color)

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      height: v.height,
      lineHeight: v.height,
      color: colors.background,
      backgroundColor: colors.foreground,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(2),
      padding: v.padding,
      ...(p.icon &&
        (p.iconPosition === 'start'
          ? { paddingLeft: v.iconStartSpacingLeft }
          : { paddingRight: v.iconStartSpacingRight })),
      ...(p.image &&
        (p.imagePosition === 'start'
          ? { paddingLeft: v.imageStartSpacingLeft }
          : { paddingRight: v.imageStartSpacingRight })),
      ...(p.circular && {
        borderRadius: v.circularRadius,
      }),
    }
  },

  image: ({ props: p, variables: v }): ICSSInJSStyle => ({
    height: v.height,
    width: v.height,
    margin: v.padding,
    ...(p.image &&
      (p.imagePosition === 'start'
        ? { marginLeft: v.imageStartSpacingLeft }
        : { marginRight: v.imageStartSpacingRight })),
  }),

  icon: ({ props: p }): ICSSInJSStyle => {
    return {
      padding: '8px',
      ...(p.icon &&
        typeof p.icon === 'object' &&
        (p.icon as any).onClick && {
          cursor: 'pointer',
        }),
    }
  },
}

export default labelStyles
