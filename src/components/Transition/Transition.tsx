import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, childrenExist, customPropTypes, createShorthandFactory } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput } from '../../themes/types'
import { ReactChildren } from '../../../types/utils'

export type TransitionProps = {
  animationName?: string
  as?: any
  children?: ReactChildren
  content?: React.ReactNode
  delay?: string
  direction?: string
  duration?: string
  fillMode?: string
  iterationCount?: string
  keyframeParams?: object
  playState?: string
  styles?: ComponentSlotStyle
  timingFunction?: string
  variables?: ComponentVariablesInput
}

class Transition extends UIComponent<TransitionProps, any> {
  static create: Function

  static className = 'ui-transition'

  static displayName = 'Transition'

  static propTypes = {
    /** The animation to be run. */
    animationName: PropTypes.string,

    /** An element type to render as. */
    as: customPropTypes.as,

    /**
     *  Button content for childrenApi
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Delay of the animation. */
    delay: PropTypes.string,

    /** Direction of the animation. */
    direction: PropTypes.string,

    /** Duration of the animation. */
    duration: PropTypes.string,

    /** Fill mode of the animation. */
    fillMode: PropTypes.string,

    /** Iteration count of the animation. */
    iterationCount: PropTypes.string,

    /** Optional params for the keyframe of the animation. */
    keyframeParams: PropTypes.object,

    /** Play state of the animation. */
    playState: PropTypes.string,

    /** Custom styles to be applied to the component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Timing function of the animation. */
    timingFunction: PropTypes.string,

    /** Custom variables to be applied to the component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  renderComponent({ ElementType, classes, rest, styles, variables, theme }) {
    const {
      children,
      content,
      animationName,
      keyframeParams,
      duration,
      delay,
      iterationCount,
      direction,
      fillMode,
      playState,
      timingFunction,
    } = this.props
    let animationProp = {}
    if (theme.animations && theme.animations[animationName]) {
      const animation = theme.animations[animationName]
      const keyframe = theme.renderer.renderKeyframe(
        animation.keyframe,
        keyframeParams || animation.keyframeParams,
      )
      animationProp = {
        animationName: keyframe,
        animationDuration: duration || animation.duration,
        animationDelay: delay || animation.delay,
        animationIterationCount: iterationCount || animation.iterationCount,
        animationDirection: direction || animation.direction,
        animationFillMode: fillMode || animation.fillMode,
        animationPlayState: playState || animation.playState,
        animationTimingFunction: timingFunction || animation.timingFunction,
      }
    }
    return (
      <ElementType {...rest} className={classes.root} style={animationProp}>
        {childrenExist(children) ? children : content}
      </ElementType>
    )
  }
}

Transition.create = createShorthandFactory(Transition, content => ({ content }))

export default Transition
