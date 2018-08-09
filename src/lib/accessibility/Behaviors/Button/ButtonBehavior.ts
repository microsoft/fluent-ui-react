import { Accessibility } from '../../interfaces'

const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
    },
  },
})

export default ButtonBehavior
