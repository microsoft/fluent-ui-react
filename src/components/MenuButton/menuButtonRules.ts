import { IMenuButtonVariables } from './menuButtonVariables'
import { IMenuButtonProps } from './MenuButton'

export default {
  root: ({ props, variables }: { props: IMenuButtonProps; variables: IMenuButtonVariables }) => {
    const { height, minWidth, maxWidth, backgroundColor } = variables

    const rules = {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      display: 'inline-block',
      position: 'relative',
      width: '200px',
    }

    return {
      ...rules,
    }
  },
}
