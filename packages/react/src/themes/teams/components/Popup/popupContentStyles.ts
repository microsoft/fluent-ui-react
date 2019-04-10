import { PopperChildrenProps } from 'react-popper'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import { PopupContentProps } from '../../../../components/Popup/PopupContent'
import { PopupContentVariables } from './popupContentVariables'

const getPointerStyles = (
  v: PopupContentVariables,
  popperPlacement?: PopperChildrenProps['placement'],
) => {
  const placement = (popperPlacement || '').split('-', 1).pop()

  const rootStyles = {
    top: {
      paddingBottom: pxToRem(v.pointerHeight),
    },
    right: {
      paddingLeft: pxToRem(v.pointerHeight),
    },
    bottom: {
      paddingTop: pxToRem(v.pointerHeight),
    },
    left: {
      paddingRight: pxToRem(v.pointerHeight),
    },
  }
  const pointerStyles = {
    top: {
      bottom: `${pxToRem(v.pointerHeight / 2)}`,
      transform: 'rotate(45deg)',
    },
    right: {
      left: `${pxToRem(v.pointerHeight / 2)}`,
      transform: 'rotate(135deg)',
    },
    bottom: {
      top: `${pxToRem(v.pointerHeight / 2)}`,
      transform: 'rotate(-135deg)',
    },
    left: {
      right: `${pxToRem(v.pointerHeight / 2)}`,
      transform: 'rotate(-45deg)',
    },
  }

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
  }
}

const popupContentStyles: ComponentSlotStylesInput<PopupContentProps, PopupContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    ...(p.pointing && getPointerStyles(v, p.placement).root),
  }),
  pointer: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    background: v.contentBackgroundColor,
    borderBottom: `${pxToRem(v.borderSize)} solid ${v.borderColor}`,
    borderRight: `${pxToRem(v.borderSize)} solid ${v.borderColor}`,
    color: v.contentColor,

    height: pxToRem(v.pointerHeight),
    width: pxToRem(v.pointerWidth),

    ...getPointerStyles(v, p.placement).pointer,
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    background: v.contentBackgroundColor,
    border: `${pxToRem(v.borderSize)} solid ${v.borderColor}`,
    borderRadius: pxToRem(3),
    boxShadow: `0 2px 4px 0 ${v.borderColor}, 0 2px 10px 0 ${v.borderColor}`,
    color: v.contentColor,
  }),
}

export default popupContentStyles
