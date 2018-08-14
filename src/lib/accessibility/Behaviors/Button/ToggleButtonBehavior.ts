import { Accessibility } from '../../interfaces'

const ToggleButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'button',
      'aria-pressed': !!props['active'],
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default ToggleButtonBehavior
