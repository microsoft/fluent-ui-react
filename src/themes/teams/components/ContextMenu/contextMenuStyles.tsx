import { IContextMenuVariables } from './contextMenuVariables'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IContextMenuProps } from '../../../../components/ContextMenu/ContextMenu'

const contextMenuStyles: IComponentPartStylesInput<IContextMenuProps, IContextMenuVariables> = {
  root: ({ variables }): ICSSInJSStyle => {
    const { height, width, padding, border } = variables
    const styles = {
      height,
      width,
      padding,
      border,
    }

    return styles
  },
}

export default contextMenuStyles
