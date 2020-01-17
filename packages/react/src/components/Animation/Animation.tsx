import * as PropTypes from 'prop-types'
import * as React from 'react'
import cx from 'classnames'

import {
  UIComponent,
  childrenExist,
  StyledComponentProps,
  commonPropTypes,
  ChildrenComponentProps,
  ShorthandFactory,
} from '../../utils'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface AnimationProps
  extends StyledComponentProps,
    ChildrenComponentProps<React.ReactChild> {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** The name for the animation that should be applied, defined in the theme. */
  name?: string

  /** Specifies a delay for the start of an animation. Negative values are
   * also allowed. If using negative values, the animation will start as if it had already been
   * playing for that amount of time.
   */
  delay?: string

  /** Specifies whether an animation should be played forwards, backwards or in alternate cycles.
   * It can have the following values:
   * - normal (default) - The animation is played as normal (forwards)
   * - reverse - The animation is played in reverse direction (backwards)
   * - alternate - The animation is played forwards first, then backwards
   * - alternate-reverse - The animation is played backwards first, then forwards
   */
  direction?: string

  /** Specifies how long an animation should take to complete. */
  duration?: string

  /**
   * Specifies a style for the target element when the animation is not playing (i.e. before it starts, after it ends, or both).
   * It can have the following values:
   * - none (default) - Animation will not apply any styles to the element before or after it is executing
   * - forwards - The element will retain the style values that is set by the last keyframe (depends on animation-direction and animation-iteration-count)
   * - backwards - The element will get the style values that is set by the first keyframe (depends on animation-direction), and retain this during the animation-delay period
   * - both - The animation will follow the rules for both forwards and backwards, extending the animation properties in both directions
   * */
  fillMode?: string

  /** Specifies the number of times an animation should run. */
  iterationCount?: string

  /** Custom parameters for the keyframe defined for the animation. */
  keyframeParams?: object

  /**
   * Specifies whether the animation is running or paused. It can have the following values:
   * - paused - Specifies that the animation is paused
   * - running - Default value. Specifies that the animation is running
   * - initial - Sets this property to its default value.
   * - inherit - Inherits this property from its parent element.
   * */
  playState?: string

  /**
   * Specifies the speed curve of the animation. It can have the following values:
   * - ease - Specifies an animation with a slow start, then fast, then end slowly (this is default)
   * - linear - Specifies an animation with the same speed from start to end
   * - ease-in - Specifies an animation with a slow start
   * - ease-out - Specifies an animation with a slow end
   * - ease-in-out - Specifies an animation with a slow start and end
   * - cubic-bezier(n,n,n,n) - Lets you define your own values in a cubic-bezier function
   */
  timingFunction?: string
}

class Animation extends UIComponent<WithAsProp<AnimationProps>, any> {
  static create: ShorthandFactory<AnimationProps>

  static className = 'ui-animation'

  static displayName = 'Animation'

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      content: false,
      children: 'element',
    }),
    name: PropTypes.string,
    delay: PropTypes.string,
    direction: PropTypes.string,
    duration: PropTypes.string,
    fillMode: PropTypes.string,
    iterationCount: PropTypes.string,
    keyframeParams: PropTypes.object,
    playState: PropTypes.string,
    timingFunction: PropTypes.string,
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const { children } = this.props

    const child =
      childrenExist(children) && (React.Children.only(children) as React.ReactElement<any>)
    const result = child
      ? React.cloneElement(child, {
          className: cx(child.props.className, classes.children),
        })
      : ''

    return (
      <ElementType className={classes.root} {...unhandledProps}>
        {result}
      </ElementType>
    )
  }
}

/**
 * An Animation provides animation effects to rendered elements.
 */
export default withSafeTypeForAs<typeof Animation, AnimationProps>(Animation)
