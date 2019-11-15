import * as PropTypes from 'prop-types'
import * as React from 'react'
import cx from 'classnames'
// import * as _ from 'lodash'

import {
  UIComponent,
  childrenExist,
  StyledComponentProps,
  commonPropTypes,
  ChildrenComponentProps,
  ShorthandFactory,
} from '../../lib'
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

  /** Show the component; triggers the enter or exit animation. */
  visible?: boolean

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnShow?: boolean

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionOnMount?: boolean

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnHide?: boolean
}

// const TRANSITION_TYPE = {
//   ENTERING: 'show',
//   EXITING: 'hide',
// }

class Animation extends UIComponent<WithAsProp<AnimationProps>, any> {
  static create: ShorthandFactory<AnimationProps>

  static className = 'ui-animation'

  static displayName = 'Animation'

  static ENTERED = 'ENTERED'
  static ENTERING = 'ENTERING'
  static EXITED = 'EXITED'
  static EXITING = 'EXITING'
  static UNMOUNTED = 'UNMOUNTED'

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
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
    keyframeParams: PropTypes.object,
    playState: PropTypes.string,
    timingFunction: PropTypes.string,
    visible: PropTypes.bool,
    mountOnShow: PropTypes.bool,
    transitionOnMount: PropTypes.bool,
    unmountOnHide: PropTypes.bool,
  }

  nextStatus
  timeoutId

  constructor(props, state) {
    super(props, state)

    const { initial: status, next } = this.computeInitialStatuses()
    this.nextStatus = next
    this.state = { status }
  }

  computeInitialStatuses = () => {
    const { visible, mountOnShow, transitionOnMount, unmountOnHide } = this.props

    if (visible) {
      if (transitionOnMount) {
        return {
          initial: Animation.EXITED,
          next: Animation.ENTERING,
        }
      }
      return { initial: Animation.ENTERED }
    }

    if (mountOnShow || unmountOnHide) return { initial: Animation.UNMOUNTED }
    return { initial: Animation.EXITED }
  }

  componentDidMount() {
    this.updateStatus()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.name !== nextProps.name ||
      this.props.visible !== nextProps.visible ||
      this.props.mountOnShow !== nextProps.visible ||
      this.props.transitionOnMount !== nextProps.transitionOnMount ||
      this.props.unmountOnHide !== nextProps.unmountOnHide
    ) {
      const { current: status, next } = this.computeStatuses(nextProps)

      this.nextStatus = next
      if (status) this.setState({ status })
    }
  }

  componentDidUpdate() {
    this.updateStatus()
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  renderComponent({ ElementType, styles, classes, unhandledProps }) {
    const { children } = this.props
    const { status } = this.state

    if (status === Animation.UNMOUNTED) return null
    const child =
      childrenExist(children) && (React.Children.only(children) as React.ReactElement<any>)
    const result = child
      ? React.cloneElement(child, {
          className: cx(child.props.className, classes.children),
          ...unhandledProps,
        })
      : ''

    return <ElementType className={classes.root}>{result}</ElementType>
  }

  handleStart = () => {
    const { duration } = this.props
    const status = this.nextStatus

    this.nextStatus = null
    this.setState({ status, animating: true }, () => {
      // const durationType = TRANSITION_TYPE[status]
      // const durationValue = normalizeTransitionDuration(duration, durationType)

      // 123s
      const durationValue = parseInt(duration.slice(0, -1), 10)

      // _.invoke(this.props, 'onStart', null, { ...this.props, status })
      this.timeoutId = setTimeout(this.handleComplete, durationValue * 1000)
    })
  }

  computeStatuses = props => {
    const { status } = this.state
    const { visible } = props

    if (visible) {
      return {
        current: status === Animation.UNMOUNTED && Animation.EXITED,
        next: status !== Animation.ENTERING && status !== Animation.ENTERED && Animation.ENTERING,
      }
    }

    return {
      next: (status === Animation.ENTERING || status === Animation.ENTERED) && Animation.EXITING,
    }
  }

  handleComplete = () => {
    // const { status: current } = this.state

    // _.invoke(this.props, 'onComplete', null, { ...this.props, status: current })

    if (this.nextStatus) {
      this.handleStart()
      return
    }

    const status = this.computeCompletedStatus()
    // const callback = current === Animation.ENTERING ? 'onShow' : 'onHide'

    this.setState({ status, animating: false }, () => {
      // _.invoke(this.props, callback, null, { ...this.props, status })
    })
  }

  updateStatus = () => {
    const { animating } = this.state

    if (this.nextStatus) {
      this.nextStatus = this.computeNextStatus()
      if (!animating) this.handleStart()
    }
  }

  computeNextStatus = () => {
    const { animating, status } = this.state

    if (animating) return status === Animation.ENTERING ? Animation.EXITING : Animation.ENTERING
    return status === Animation.ENTERED ? Animation.EXITING : Animation.ENTERING
  }

  computeCompletedStatus = () => {
    const { unmountOnHide } = this.props
    const { status } = this.state

    if (status === Animation.ENTERING) return Animation.ENTERED
    return unmountOnHide ? Animation.UNMOUNTED : Animation.EXITED
  }
}

/**
 * An Animation provides animation effects to rendered elements.
 */
export default withSafeTypeForAs<typeof Animation, AnimationProps>(Animation)
