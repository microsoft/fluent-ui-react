import { Accessibility } from '../../types'

const textAreaBehavior: Accessibility<TextAreaBehaviorProps> = props => ({
  attributes: {
    textArea: {
      'aria-disabled': props.disabled,
    },
  },
})

export default textAreaBehavior

type TextAreaBehaviorProps = {
  disabled?: boolean
}
