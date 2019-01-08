import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  UIComponent,
  childrenExist,
  StyledComponentProps,
  commonPropTypes,
  ChildrenComponentProps,
} from '../../lib'
import { AnimationProp } from '../../themes/types'
import createAnimationStyles from '../../lib/createAnimationStyles'
import { ReactPropsStrict } from '../../../types/utils'

export interface AnimationProps
  extends StyledComponentProps,
    ChildrenComponentProps<React.ReactChild> {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** The name for the animation that should be applied, defined in the theme. */
  name?: string

  /** The delay property specifies a delay for the start of an animation. Negative values are
   * also allowed. If using negative values, the animation will start as if it had already been
   * playing for N seconds.
   */
  delay?: string

  /** The direction property specifies whether an animation should be played forwards, backwards
   * or in alternate cycles. It can have the following values:
   * - normal - The animation is played as normal (forwards). This is default
   * - reverse - The animation is played in reverse direction (backwards)
   * - alternate - The animation is played forwards first, then backwards
   * - alternate-reverse - The animation is played backwards first, then forwards.
   */
  direction?: string

  /** The duration property defines how long time an animation should take to complete. */
  duration?: string

  /**
   * The fillMode property specifies a style for the target element when the animation
   * is not playing (before it starts, after it ends, or both). It can have the following values:
   * - none - Default value. Animation will not apply any styles to the element before or after it is executing
   * - forwards - The element will retain the style values that is set by the last keyframe (depends on animation-direction and animation-iteration-count)
   * - backwards - The element will get the style values that is set by the first keyframe (depends on animation-direction), and retain this during the animation-delay period
   * - both - The animation will follow the rules for both forwards and backwards, extending the animation properties in both directions
   * */
  fillMode?: string

  /** The animation-iteration-count property specifies the number of times an animation should run. */
  iterationCount?: string

  /**
   * The playState property specifies whether the animation is running or paused. It can have the following values:
   * - paused - Specifies that the animation is paused
   * - running - Default value. Specifies that the animation is running
   * - initial - Sets this property to its default value.
   * - inherit - Inherits this property from its parent element.
   * */
  playState?: string

  /**
   * The timingFunction property specifies the speed curve of the animation. It can have the following values:
   * - ease - Specifies an animation with a slow start, then fast, then end slowly (this is default)
   * - linear - Specifies an animation with the same speed from start to end
   * - ease-in - Specifies an animation with a slow start
   * - ease-out - Specifies an animation with a slow end
   * - ease-in-out - Specifies an animation with a slow start and end
   * - cubic-bezier(n,n,n,n) - Lets you define your own values in a cubic-bezier function
   */
  timingFunction?: string
}

/**
 * An animation allows the user to animate their own components.
 */
class Animation extends UIComponent<ReactPropsStrict<AnimationProps>, any> {
  static create: Function

  static className = 'ui-animation'

  static displayName = 'Animation'

  static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      content: false,
      children: 'element',
    }),
    name: PropTypes.string,
    delay: PropTypes.string,
    direction: PropTypes.string,
    duration: PropTypes.string,
    fillMode: PropTypes.string,
    iterationCount: PropTypes.string,
    playState: PropTypes.string,
    timingFunction: PropTypes.string,
  }

  renderComponent({ ElementType, classes, rest, styles, variables, theme }) {
    const { children, name } = this.props

    const animation: AnimationProp = {
      name,
      duration: this.props.duration,
      delay: this.props.delay,
      iterationCount: this.props.iterationCount,
      direction: this.props.direction,
      fillMode: this.props.fillMode,
      playState: this.props.playState,
      timingFunction: this.props.timingFunction,
    }

    const animationStyle = createAnimationStyles(animation, theme)

    const child = childrenExist(children) && React.Children.only(children)
    const result = child
      ? React.cloneElement(child, {
          style: { ...animationStyle, ...(child.props && child.props.style) },
        })
      : ''

    return (
      <ElementType className={classes.root} {...rest}>
        {result}
      </ElementType>
    )
  }
}

export default Animation
