import { Accessibility } from '../../types'

/**
 * @specification
 */
const accordionTitleBehavior: Accessibility = (props: any) => {
  return {
    attributes: {
      root: {
        role: 'region',
        'aria-labelledby': props.titleId,
      },
    },
    keyActions: {},
  }
}

export default accordionTitleBehavior
