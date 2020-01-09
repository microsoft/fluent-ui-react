import { pxToRem } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { LabelProps } from '../../../../components/Label/Label'
import { LabelVariables } from './labelVariables'
import { getColorScheme } from '../../colors'

const labelStyles: ComponentSlotStylesPrepared<
  LabelProps & { hasImage: boolean; hasActionableIcon: boolean },
  LabelVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color)

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: v.height,
      lineHeight: v.height,
      color: colors.background,
      backgroundColor: colors.foreground,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(3),
      padding: v.padding,
      ...(p.hasImage &&
        (p.imagePosition === 'start'
          ? { paddingLeft: v.startPaddingLeft }
          : { paddingRight: v.endPaddingRight })),
      ...(p.circular && {
        borderRadius: v.circularRadius,
      }),
    }
  },

  image: ({ variables: v }): ICSSInJSStyle => ({
    height: v.height,
    width: v.height,
  }),

  icon: ({ props: p }): ICSSInJSStyle =>
    p.hasActionableIcon && {
      cursor: 'pointer',
    },
}

export default labelStyles
