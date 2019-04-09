import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { PopupProps } from '../../../../components/Popup/Popup'
import { PopupVariables } from './popupVariables'

const popupStyles: ComponentSlotStylesInput<PopupProps, PopupVariables> = {
  root: (): ICSSInJSStyle => ({}),

  popup: ({ variables }): ICSSInJSStyle => ({
    position: 'absolute',
    textAlign: 'left',
    zIndex: variables.zIndex,
  }),
}

export default popupStyles
