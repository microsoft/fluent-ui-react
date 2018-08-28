import { Accessibility } from '../../interfaces'

const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ButtonBehavior
