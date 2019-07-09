import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { TooltipProps } from '../../../../components/Tooltip/Tooltip'
import { TooltipVariables } from './tooltipVariables'

const tooltipStyles: ComponentSlotStylesInput<TooltipProps, TooltipVariables> = {
  root: (): ICSSInJSStyle => ({}),

  content: ({ variables: v, props: p }): ICSSInJSStyle => ({
    ...(!p.open && {
      visibility: 'hidden',
    }),
    zIndex: v.zIndex,
    position: 'absolute',
    textAlign: 'left',
  }),
}

export default tooltipStyles
