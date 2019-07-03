import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent'
import { TooltipContentVariables } from './tooltipContentVariables'
import getPointerWithSvgStyles from '../../getPointerWithSvgStyles'

const tooltipContentStyles: ComponentSlotStylesInput<
  TooltipContentProps,
  TooltipContentVariables
> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    borderRadius: v.borderRadius,
    display: 'block',
    maxWidth: v.maxWidth,

    ...(p.pointing &&
      getPointerWithSvgStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).root),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    // backgroundColor: 'inherit',

    ...getPointerWithSvgStyles(v.pointerOffset, v.pointerMargin, rtl, p.placement).pointer,
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    borderRadius: 'inherit',
    boxShadow: `${v.boxShadowStart} ${v.boxShadowColor}, ${v.boxShadowEnd} ${v.boxShadowColor}`,
  }),

  svg: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ':before': {
      backgroundImage: v.svgContent,
      content: '" "',
      display: 'block',
      overflow: 'hidden',
      height: v.pointerHeight,
      width: v.pointerWidth,
    },
  }),
}

export default tooltipContentStyles
