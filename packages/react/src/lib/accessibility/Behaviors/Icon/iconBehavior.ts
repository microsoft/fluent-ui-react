import { Accessibility } from '../../types'

type IconBehaviorProps = {
  /** Alternative text. */
  alt?: string
  'aria-label'?: string
}

/**
 * @description
 * Icon is usually only visual representation and therefore is hidden from screen readers, unless 'alt' or 'aria-label' property is provided.
 *
 * @specification
 * Adds role='img'.
 * Adds attribute 'aria-hidden=true', if there is no 'alt' property provided.
 * Adds attribute 'aria-hidden=true', if there is no 'aria-label' property provided.
 */
const iconBehavior: Accessibility<IconBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'img',
      'aria-hidden': props.alt || props['aria-label'] ? undefined : 'true',
    },
  },
})

export default iconBehavior
