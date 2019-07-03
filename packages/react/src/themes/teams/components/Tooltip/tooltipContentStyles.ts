import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent'
import { TooltipContentVariables } from './tooltipContentVariables'
import getPointerWithSvgStyles from '../../getPointerWithSvgStyles'
import svgContent from './tooltipPointerSvgUrl'

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
      getPointerWithSvgStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).root),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => {
    // TODO: aaah fix me
    const pointerOffset =
      p.placement === 'top-start' ||
      p.placement === 'top' ||
      p.placement === 'top-end' ||
      p.placement === 'bottom-end' ||
      p.placement === 'bottom' ||
      p.placement === 'bottom-start'
        ? '10px'
        : '5px'
    return {
      display: 'block',
      position: 'absolute',

      ...getPointerWithSvgStyles(pointerOffset, v.pointerMargin, rtl, p.placement).pointer,

      ':before': {
        backgroundImage: svgContent(v.backgroundColor),
        content: '" "',
        display: 'block',
        overflow: 'hidden',
        width: v.pointerWidth,
        height: v.pointerHeight,
      },
    }
  },
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    borderRadius: 'inherit',
    boxShadow: `${v.boxShadowStart} ${v.boxShadowColor}, ${v.boxShadowEnd} ${v.boxShadowColor}`,
  }),
}

export default tooltipContentStyles
