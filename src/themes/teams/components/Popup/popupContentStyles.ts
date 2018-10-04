import { IComponentPartStylesInput, ICSSInJSStyle } from 'theme'
import { pxToRem } from '../../../../lib'
import { IPopupContentProps } from '../../../../components/Popup/PopupContent'

const popupContentStyles: IComponentPartStylesInput<IPopupContentProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { backgroundColor, borderColor, padding, zIndex } = variables

    return {
      backgroundColor,
      zIndex,
      display: 'block',
      position: 'absolute',
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      padding,
      border: `1px solid ${borderColor}`,
      borderRadius: pxToRem(3),
      boxShadow: `0 2px 4px 0 ${borderColor}, 0 2px 10px 0 ${borderColor}`,
    }
  },
}

export default popupContentStyles
