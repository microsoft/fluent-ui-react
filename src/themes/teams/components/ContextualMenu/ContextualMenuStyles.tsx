import { IContextualMenuVariables } from './contextualMenuVariables'
import { IComponentPartStylesInput, ICSSInJSStyle, IProps } from '../../../../../types/theme'

const contextualMenuStyles: IComponentPartStylesInput = {
  root: ({
    props,
    variables: { height, maxWidth, padding },
  }: {
    props: IProps
    variables: IContextualMenuVariables
  }): ICSSInJSStyle => {
    const styles = {
      height,
      maxWidth,
      padding,
      border: '1px solid #eeeeee',
    }

    return styles
  },
}

export default contextualMenuStyles
