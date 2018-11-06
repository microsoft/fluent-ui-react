import * as PropTypes from 'prop-types'
import * as React from 'react'

import { UIComponent, customPropTypes, createShorthandFactory, childrenExist } from '../../lib'
import { ComponentSlotStyle, ComponentVariablesInput, Animation } from '../../themes/types'
import { ReactChildren } from '../../../types/utils'
import createAnimationStyles from '../../lib/createAnimationStyles'

export type TransitionProps = {
  animationName?: string
  as?: any
  children?: ReactChildren
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

/**
 * A transition is an animation usually used to move content in or out of view.
 */
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
    const { children, animationName } = this.props

    const animation: Animation = {
      name: animationName,
      keyframeParams: this.props.keyframeParams,
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
    const result = React.cloneElement(child, { style: { ...animationStyle, ...child.props.style } })

    return (
      <ElementType {...rest} className={classes.root}>
        {result}
      </ElementType>
    )
  }
}

Transition.create = createShorthandFactory(Transition, content => ({ content }))

export default Transition
