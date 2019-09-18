import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { PopupProps } from '../../../../components/Popup/Popup'
import { PopupVariables } from './popupVariables'

const popupStyles: ComponentSlotStylesPrepared<PopupProps, PopupVariables> = {
  root: (): ICSSInJSStyle => ({}),

  popup: ({ variables: v }): ICSSInJSStyle => ({
    zIndex: v.zIndex,
    position: 'absolute',
    textAlign: 'left',
    color: v.contentColor,
    background: v.contentBackgroundColor,
  }),
}

export default popupStyles
