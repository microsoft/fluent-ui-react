import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { PopupProps } from '../../../../components/Popup/Popup'
import { TooltipVariables } from './tooltipVariables'

const tooltipStyles: ComponentSlotStylesInput<PopupProps, TooltipVariables> = {
  root: (): ICSSInJSStyle => ({}),

  content: ({ variables: v }): ICSSInJSStyle => ({
    zIndex: v.zIndex,
    position: 'absolute',
    textAlign: 'left',
    color: v.contentColor,
    background: v.contentBackgroundColor,
  }),
}

export default tooltipStyles
