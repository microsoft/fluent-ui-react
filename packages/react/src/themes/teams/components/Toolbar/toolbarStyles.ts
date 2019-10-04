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

  wrapper2: ({ variables: v }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'hidden',
    height: v.itemHeight,
  }),
}

export default toolbarStyles
