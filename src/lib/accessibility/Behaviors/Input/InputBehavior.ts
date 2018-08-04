import { Accessibility } from '../../interfaces'

export const InputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': !!props['disabled'],
    },
  },
})
