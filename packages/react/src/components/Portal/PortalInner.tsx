import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// @ts-ignore
import { ThemeContext } from 'react-fela'

import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../utils'

export interface PortalInnerProps extends ChildrenComponentProps {
  /** Existing element the portal should be bound to. */
  mountNode?: HTMLElement

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param data - All props.
   */
  onMount?: (props: PortalInnerProps) => void

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param data - All props.
   */
  onUnmount?: (props: PortalInnerProps) => void
}

const PortalInner: React.FC<PortalInnerProps> = props => {
  const { children, mountNode } = this.props

  React.useLayoutEffect(() => {
    _.invoke(props, 'onMount', props)

    return () => {
      _.invoke(props, 'onUnmount', props)
    }
  })

  const target: HTMLElement | null = isBrowser()
    ? this.context.target.querySelector('#' + this.context.boxRef)
    : null
  const container: HTMLElement | null = mountNode || target
  console.log(
    children,
    this.context.boxRef,
    this.context.target.querySelector('#' + this.context.boxRef),
  )

  return container && ReactDOM.createPortal(children, container)
}

PortalInner.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    animated: false,
    as: false,
    className: false,
    content: false,
    styled: false,
  }),
  mountNode: PropTypes.object,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
}

export default PortalInner
