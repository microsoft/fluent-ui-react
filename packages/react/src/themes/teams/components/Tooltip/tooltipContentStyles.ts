import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TooltipContentProps } from '../../../../components/Tooltip/TooltipContent'
import { TooltipContentVariables } from './tooltipContentVariables'

const rtlMapping = {
  left: 'right',
  right: 'left',
}

const getPointerStyles = (
  v: TooltipContentVariables,
  rtl: boolean,
  popperPlacement?: TooltipContentProps['placement'],
) => {
  const placementValue = (popperPlacement || '').split('-', 1).pop()
  const placement = (rtl && rtlMapping[placementValue]) || placementValue

  const rootStyles = {
    top: {
      marginBottom: v.pointerMargin,
    },
    right: {
      marginLeft: v.pointerMargin,
    },
    bottom: {
      marginTop: v.pointerMargin,
    },
    left: {
      marginRight: v.pointerMargin,
    },
  }
  const pointerStyles = {
    top: {
      bottom: `-${v.pointerOffset}`,
      transform: 'rotate(45deg)',
    },
    right: {
      left: `-${v.pointerOffset}`,
      transform: 'rotate(135deg)',
    },
    bottom: {
      top: `-${v.pointerOffset}`,
      transform: 'rotate(-135deg)',
    },
    left: {
      right: `-${v.pointerOffset}`,
      transform: 'rotate(-45deg)',
    },
  }

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
  }
}

const tooltipContentStyles: ComponentSlotStylesInput<
  TooltipContentProps,
  TooltipContentVariables
> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    borderRadius: v.borderRadius,
    display: 'block',
    maxWidth: v.maxWidth,

    ...(p.pointing && getPointerStyles(v, rtl, p.placement).root),
  }),
  pointer: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    backgroundColor: 'inherit',
    borderBottom: `${v.borderSize} solid ${v.borderColor}`,
    borderRight: `${v.borderSize} solid ${v.borderColor}`,

    height: v.pointerSize,
    width: v.pointerSize,

    ...getPointerStyles(v, rtl, p.placement).pointer,
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
