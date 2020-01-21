import * as PropTypes from 'prop-types'
import * as React from 'react'
import cx from 'classnames'
import { Transition } from 'react-transition-group'

import {
  UIComponent,
  childrenExist,
  StyledComponentProps,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export type AnimationChildrenProp = (props: { classes: Record<string, string> }) => React.ReactNode

export interface AnimationProps extends StyledComponentProps {
  /** Additional CSS class name(s) to apply.  */
  className?: string

  children: AnimationChildrenProp | React.ReactChild

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

  /** Show the component; triggers the enter or exit animation. */
  visible?: boolean

  /** Run the enter animation when the component mounts, if it is initially shown. */
  appear?: boolean

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnEnter?: boolean

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnExit?: boolean

  /** The duration of the transition, in milliseconds. */
  timeout?: number | { enter?: number; exit?: number; appear?: number }

  /** Callback fired before the "entering" status is applied. An extra parameter isAppearing is supplied to indicate if the enter stage is occurring on the initial mount. */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void

  /** Callback fired after the "entering" status is applied. An extra parameter isAppearing is supplied to indicate if the enter stage is occurring on the initial mount. */
  onEntering?: (node: HTMLElement, isAppearing: boolean) => void

  /** Callback fired after the "entered" status is applied. An extra parameter isAppearing is supplied to indicate if the enter stage is occurring on the initial mount. */
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void

  /** Callback fired before the "exiting" status is applied. */
  onExit?: (node: HTMLElement) => void

  /** Callback fired after the "exiting" status is applied. */
  onExiting?: (node: HTMLElement) => void

  /** Callback fired after the "exited" status is applied. */
  onExited?: (node: HTMLElement) => void
}

class Animation extends UIComponent<WithAsProp<AnimationProps>, any> {
  static create: ShorthandFactory<AnimationProps>

  static className = 'ui-animation'

  static displayName = 'Animation'

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      as: false,
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
    visible: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    appear: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    timeout: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        appear: PropTypes.number,
        enter: PropTypes.number,
        exit: PropTypes.number,
      }),
    ]),
  }

  static defaultProps = {
    timeout: 0,
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const {
      children,
      mountOnEnter,
      unmountOnExit,
      timeout,
      appear,
      visible,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExited,
      onExiting,
    } = this.props

    // const child =
    //   childrenExist(children) && (React.Children.only(children) as React.ReactElement<any>)

    const child =
      typeof children === 'function'
        ? (children as AnimationChildrenProp)({ classes })
        : childrenExist(children) && (React.Children.only(children) as React.ReactElement<any>)
    return (
      <Transition
        in={visible}
        appear={appear}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        timeout={timeout}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        {...unhandledProps}
        className={cx(
          classes.root,
          typeof child === 'object' && (child as any).props && (child as any).props.className,
        )}
      >
        {child}
      </Transition>
    )
  }
}

/**
 * An Animation provides animation effects to rendered elements.
 */
export default withSafeTypeForAs<typeof Animation, AnimationProps>(Animation)
