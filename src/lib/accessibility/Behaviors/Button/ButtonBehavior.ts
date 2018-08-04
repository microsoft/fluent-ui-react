import { Accessibility } from '../../interfaces'

export const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'button',
      'aria-hidden': false,
      'aria-disabled': !!props['disabled'],
    },
  },
})
