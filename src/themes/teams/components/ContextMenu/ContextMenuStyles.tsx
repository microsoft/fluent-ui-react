import { IContextMenuVariables } from './ContextMenuVariables'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IContextMenuProps } from '../../../../components/ContextMenu/ContextMenu'

const contextualMenuStyles: IComponentPartStylesInput<IContextMenuProps, IContextMenuVariables> = {
  root: ({ props, variables: { height, width, padding, border } }): ICSSInJSStyle => {
    const styles = {
      height,
      width,
      padding,
      border,
    }

    return styles
  },
}

export default contextualMenuStyles
