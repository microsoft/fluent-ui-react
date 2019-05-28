import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { ToolbarVariables } from './toolbarVariables'

const toolbarDividerStyles: ComponentSlotStylesInput<{}, ToolbarVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    borderLeft: `1px solid ${v.dividerBorder}`,
    margin: v.dividerMargin,
    alignSelf: 'stretch',
  }),
}

export default toolbarDividerStyles
