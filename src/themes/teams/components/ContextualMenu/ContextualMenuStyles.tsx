import { IContextualMenuVariables } from './contextualMenuVariables'
import { IComponentPartStylesInput, ICSSInJSStyle, IProps } from '../../../../../types/theme'

const contextualMenuStyles: IComponentPartStylesInput = {
  root: ({
    props,
    variables: { height, width, padding },
  }: {
    props: IProps
    variables: IContextualMenuVariables
  }): ICSSInJSStyle => {
    const styles = {
      height,
      width,
      padding,
    }

    return styles
  },
}

export default contextualMenuStyles
