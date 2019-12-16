import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { PopupProps } from '../../../../components/Popup/Popup'
import { PopupVariables } from './popupVariables'

const popupStyles: ComponentSlotStylesPrepared<PopupProps, PopupVariables> = {
  root: (): ICSSInJSStyle => ({}),

  popup: ({ variables: v }): ICSSInJSStyle => ({
    zIndex: v.zIndex,
    textAlign: 'left',
    color: v.contentColor,
    background: v.contentBackgroundColor,

    // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
    position: 'fixed',
    // Fix Popper.js display issue
    top: 0,
    left: '0px /* @noflip */',
  }),
}

export default popupStyles
