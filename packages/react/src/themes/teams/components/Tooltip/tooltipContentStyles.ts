import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent'
import { TooltipContentVariables } from './tooltipContentVariables'
import getPointerStyles from '../../getPointerStyles'
import svgContent from './tooltipPointerSvgUrl'
import { PopperChildrenProps } from '../../../../lib/positioner'

const getPointerOffset = (
  placement: PopperChildrenProps['placement'],
  v: TooltipContentVariables,
) =>
  placement === 'top-start' ||
  placement === 'top' ||
  placement === 'top-end' ||
  placement === 'bottom-end' ||
  placement === 'bottom' ||
  placement === 'bottom-start'
    ? v.pointerVerticalOffset
    : v.pointerHorizontalOffset

const tooltipContentStyles: ComponentSlotStylesInput<
  TooltipContentProps,
  TooltipContentVariables
> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    borderRadius: v.borderRadius,
    display: 'block',
    maxWidth: v.maxWidth,
    color: v.color,
    background: v.backgroundColor,
    ...(p.pointing &&
      getPointerStyles(getPointerOffset(p.placement, v), v.pointerMargin, rtl, p.placement, true)
        .root),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',
    overflow: 'hidden',
    width: v.pointerWidth,
    height: v.pointerHeight,
    backgroundImage: svgContent(v.backgroundColor),

    ...getPointerStyles(getPointerOffset(p.placement, v), v.pointerMargin, rtl, p.placement, true)
      .pointer,
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    borderRadius: 'inherit',
    boxShadow: `${v.boxShadowStart} ${v.boxShadowColor}, ${v.boxShadowEnd} ${v.boxShadowColor}`,
  }),
}

export default tooltipContentStyles
