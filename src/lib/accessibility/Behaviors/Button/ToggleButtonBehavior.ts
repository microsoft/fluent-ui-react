import { Accessibility } from '../../interfaces'

export const ToggleButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'button',
      'aria-pressed': !!props['active'],
      'aria-disabled': !!props['disabled'],
    },
  },
})
