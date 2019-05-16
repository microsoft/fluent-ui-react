import { Accessibility } from '../../types'

/**
 * @description
 * Optionally, an accordion content can have the 'role=region'. It is not applied by default.
 *
 * @specification
 * Adds attribute 'aria-labelledby' based on the property 'titleId' to 'root' component's part.
 */
const accordionContentBehavior: Accessibility = (props: any) => {
  return {
    attributes: {
      root: {
        'aria-labelledby': props.titleId,
      },
    },
    keyActions: {},
  }
}

export default accordionContentBehavior
