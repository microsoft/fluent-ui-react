import { PopperChildrenProps } from 'react-popper'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { PopupContentProps } from '../../../../components/Popup/PopupContent'
import { PopupContentVariables } from './popupContentVariables'

const rtlMapping = {
  left: 'right',
  right: 'left',
}

const getPointerStyles = (
  v: PopupContentVariables,
  rtl: boolean,
  popperPlacement?: PopperChildrenProps['placement'],
) => {
  const placementValue = (popperPlacement || '').split('-', 1).pop()
  const placement = (rtl && rtlMapping[placementValue]) || placementValue

  const rootStyles = {
    top: {
      paddingBottom: v.pointerPadding,
    },
    right: {
      paddingLeft: v.pointerPadding,
    },
    bottom: {
      paddingTop: v.pointerPadding,
    },
    left: {
      paddingRight: v.pointerPadding,
    },
  }
  const pointerStyles = {
    top: {
      bottom: v.pointerOffset,
      transform: 'rotate(45deg)',
    },
    right: {
      left: v.pointerOffset,
      transform: 'rotate(135deg)',
    },
    bottom: {
      top: v.pointerOffset,
      transform: 'rotate(-135deg)',
    },
    left: {
      right: v.pointerOffset,
      transform: 'rotate(-45deg)',
    },
  }

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
  }
}

const popupContentStyles: ComponentSlotStylesInput<PopupContentProps, PopupContentVariables> = {
  root: ({ props: p, theme: t, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    ...(p.pointing && getPointerStyles(v, t.rtl, p.placement).root),
  }),
  pointer: ({ props: p, theme: t, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    backgroundColor: v.contentBackgroundColor,
    borderBottom: `${v.borderSize} solid ${v.borderColor}`,
    borderRight: `${v.borderSize} solid ${v.borderColor}`,

    height: v.pointerHeight,
    width: v.pointerWidth,

    ...getPointerStyles(v, t.rtl, p.placement).pointer,
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    backgroundColor: v.contentBackgroundColor,
    color: v.contentColor,

    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,
    boxShadow: `0 2px 4px 0 ${v.borderColor}, 0 2px 10px 0 ${v.borderColor}`,
  }),
}

export default popupContentStyles
