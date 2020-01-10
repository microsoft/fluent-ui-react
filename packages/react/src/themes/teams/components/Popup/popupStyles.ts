import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
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
    // https://github.com/mui-org/material-ui/issues/16740
    position: 'fixed',
    // Fix Popper.js initial positioning display issue
    // https://github.com/mui-org/material-ui/issues/17774
    top: 0,
    left: '0px /* @noflip */',
  }),
}

export default popupStyles
