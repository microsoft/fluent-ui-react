import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent'
import { TooltipContentVariables } from './tooltipContentVariables'
import getPointerStyles from '../../getPointerStyles'

const tooltipContentStyles: ComponentSlotStylesInput<
  TooltipContentProps,
  TooltipContentVariables
> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    borderRadius: v.borderRadius,
    display: 'block',
    maxWidth: v.maxWidth,

    ...(p.pointing && getPointerStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).root),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    backgroundColor: 'inherit',
    borderBottom: `${v.borderSize} solid ${v.borderColor}`,
    borderRight: `${v.borderSize} solid ${v.borderColor}`,

    height: v.pointerSize,
    width: v.pointerSize,

    ...getPointerStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).pointer,
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: 'inherit',
    boxShadow: `0 2px 4px 0 ${v.borderColor}, 0 2px 10px 0 ${v.borderColor}`,
  }),
}

export default tooltipContentStyles
