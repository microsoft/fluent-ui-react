import { IContextualMenuVariables } from './contextualMenuVariables'
import { IComponentPartStylesInput, ICSSInJSStyle, IProps } from '../../../../../types/theme'
import { IContextualMenuProps } from '../../../../components/ContextualMenu/ContextualMenu'

const contextualMenuStyles: IComponentPartStylesInput<
  IContextualMenuProps,
  IContextualMenuVariables
> = {
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
