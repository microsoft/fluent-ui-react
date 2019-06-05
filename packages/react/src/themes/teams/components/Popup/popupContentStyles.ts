import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { PopupContentProps } from '../../../../components/Popup/PopupContent'
import { PopupContentVariables } from './popupContentVariables'
import getPointerStyles from '../../getPointerStyles'

const popupContentStyles: ComponentSlotStylesInput<PopupContentProps, PopupContentVariables> = {
  root: ({ props: p, variables: v, rtl }): ICSSInJSStyle => ({
    borderRadius: v.borderRadius,
    display: 'block',

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

export default popupContentStyles
