import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { TooltipProps } from '../../../../components/Tooltip/Tooltip'
import { TooltipVariables } from './tooltipVariables'

const tooltipStyles: ComponentSlotStylesPrepared<TooltipProps, TooltipVariables> = {
  root: (): ICSSInJSStyle => ({}),

  content: ({ variables: v, props: p }): ICSSInJSStyle =>
    p.open
      ? {
          zIndex: v.zIndex,
          position: 'absolute',
          textAlign: 'left',
        }
      : {
          opacity: 0,
          position: 'absolute',
        },
}

export default tooltipStyles
