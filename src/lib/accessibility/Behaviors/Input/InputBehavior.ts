import { Accessibility } from '../../interfaces'

const InputBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-disabled': !!props['disabled'],
    },
  },
})

export default InputBehavior
