import { Accessibility } from '../../interfaces'

const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'button',
      'aria-hidden': false,
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ButtonBehavior
