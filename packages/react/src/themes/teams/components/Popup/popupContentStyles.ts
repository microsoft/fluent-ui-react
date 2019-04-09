import { PopperChildrenProps } from 'react-popper'
import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import { PopupContentProps } from '../../../../components/Popup/PopupContent'
import { PopupContentVariables } from './popupContentVariables'

const getStyles = (
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
      bottom: `${pxToRem(v.pointerHeight / 2 + v.borderSize)}`,
      transform: 'rotate(45deg)',
    },
    right: {
      left: `${pxToRem(v.pointerHeight / 2 + v.borderSize)}`,
      transform: 'rotate(135deg)',
    },
    bottom: {
      top: `${pxToRem(v.pointerHeight / 2 + v.borderSize)}`,
      transform: 'rotate(-135deg)',
    },
    left: {
      right: `${pxToRem(v.pointerHeight / 2 + v.borderSize)}`,
      transform: 'rotate(-45deg)',
    },
  }

  const pointerBeforeStyles = {
    top: {
      top: 0,
    },
    right: {
      right: 0,
    },
    bottom: {
      bottom: 0,
    },
    left: {
      left: 0,
    },
  }

  return {
    root: rootStyles[placement],
    pointer: pointerStyles[placement],
    pointerBefore: pointerBeforeStyles[placement],
  }
}

const popupContentStyles: ComponentSlotStylesInput<PopupContentProps, PopupContentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    ...getStyles(v, p.placement).root,
  }),
  pointer: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    position: 'absolute',

    background: v.contentBackgroundColor,
    boxShadow: `1px 1px 0 0 ${v.borderColor}`,
    color: v.contentColor,

    height: pxToRem(v.pointerHeight),
    width: pxToRem(v.pointerWidth),

    ...getStyles(v, p.placement).pointer,

    ':before': {
      borderColor: 'transparent',
      borderStyle: 'solid',
      content: '""',
      position: 'absolute',

      ...getStyles(v, p.placement).pointerBefore,
    },
  }),
  content: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'block',
    padding: v.padding,

    background: v.contentBackgroundColor,
    border: `${v.borderSize} solid ${v.borderColor}`,
    borderRadius: pxToRem(3),
    boxShadow: `0 2px 4px 0 ${v.borderColor}, 0 2px 10px 0 ${v.borderColor}`,
    color: v.contentColor,
  }),
}

export default popupContentStyles
