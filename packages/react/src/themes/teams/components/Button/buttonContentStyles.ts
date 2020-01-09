import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { ButtonContentProps } from '../../../../components/Button/ButtonContent'
import { ButtonContentVariables } from './buttonContentVariables'

const buttonContentStyles: ComponentSlotStylesPrepared<
  ButtonContentProps,
  ButtonContentVariables
> = {
  // modifies the text of the button
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: v.fontSize,
    fontWeight: v.fontWeight,
    lineHeight: v.lineHeight,

    ...(p.size === 'small' && {
      fontSize: v.sizeSmallFontSize,
      lineHeight: v.sizeSmallLineHeight,
    }),
  }),
}

export default buttonContentStyles
