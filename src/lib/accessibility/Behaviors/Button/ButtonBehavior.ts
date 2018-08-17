import { Accessibility } from '../../interfaces'

/**
 * Default button behavior.
 * @description
 * Adds role='button' if element type is other than 'button'
 *
 * Accessibility considerations:
 *  - for disabled buttons, add 'disabled' attribute so that the state is properly recognized by the screen reader
 *  - if button includes icon only, textual representation needs to be provided by using 'title', 'aria-label', or 'aria-
 */

const ButtonBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props.as === 'button' ? undefined : 'button',
    },
  },
})

export default ButtonBehavior
