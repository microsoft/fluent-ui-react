import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '../../../types'
import { ToolbarVariables } from './toolbarVariables'
import { ToolbarProps } from '../../../../components/Toolbar/Toolbar'

const toolbarStyles: ComponentSlotStylesPrepared<ToolbarProps, ToolbarVariables> = {
  root: ({ props: { overflow }, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),

  offsetMeasure: (): ICSSInJSStyle => ({
    position: 'absolute',
    visibility: 'hidden',
    left: 0,
    top: 0,
  }),

  overflowContainer: ({ variables: v }) => ({
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
  }),
}

export default toolbarStyles
