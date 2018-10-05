import { IContextMenuVariables } from './ContextMenuVariables'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IContextMenuProps } from '../../../../components/ContextMenu/ContextMenu'

const contextualMenuStyles: IComponentPartStylesInput<IContextMenuProps, IContextMenuVariables> = {
  root: ({ props, variables: { height, maxWidth, padding, border } }): ICSSInJSStyle => {
    const styles = {
      height,
      maxWidth,
      padding,
      border,
    }

    return styles
  },
}

export default contextualMenuStyles
