import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { ToolbarVariables } from './toolbarVariables'
import { ToolbarProps } from '../../../../components/Toolbar/Toolbar'

const toolbarStyles: ComponentSlotStylesPrepared<ToolbarProps, ToolbarVariables> = {
  root: ({ props: { overflow }, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),

  wrapper: (): ICSSInJSStyle => ({
    position: 'relative',
  }),

  measurement: (): ICSSInJSStyle => ({
    position: 'fixed',
    visibility: 'hidden',
  }),

  offsetMeasure: (): ICSSInJSStyle => ({
    position: 'absolute',
    visibility: 'hidden',
    left: 0,
    top: 0,
  }),

  overflowCrop: ({ variables: v }) => ({
    display: 'flex',
    overflow: 'hidden',
  }),
}

export default toolbarStyles
