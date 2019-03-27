import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { PopupProps } from '../../../../components/Popup/Popup'
import { PopupVariables } from './popupVariables'

const popupStyles: ComponentSlotStylesInput<PopupProps, PopupVariables> = {
  root: (): ICSSInJSStyle => ({}),

  popup: ({ variables }): ICSSInJSStyle => ({
    zIndex: variables.zIndex,
    position: 'absolute',
    color: variables.contentColor,
    background: variables.contentBackgroundColor,
  }),
}

export default popupStyles
