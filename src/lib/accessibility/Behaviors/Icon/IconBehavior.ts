import { Accessibility } from '../../interfaces'

const IconBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      'aria-hidden': 'true',
    },
  },
})

export default IconBehavior
