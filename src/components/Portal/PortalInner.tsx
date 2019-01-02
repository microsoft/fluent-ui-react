import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../lib'
import { ReactPropsStrict } from '../../../types/utils'

export interface PortalInnerProps extends ChildrenComponentProps {
  /** Existing element the portal should be bound to. */
  context?: HTMLElement

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {object} data - All props.
   */
  onMount?: (props: PortalInnerProps) => void

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {object} data - All props.
   */
  onUnmount?: (props: PortalInnerProps) => void
}

/**
 * An inner component that allows you to render children outside their parent.
 */
class PortalInner extends React.Component<ReactPropsStrict<PortalInnerProps>> {
  public static propTypes = {
    ...commonPropTypes.createCommon({
      animated: false,
      as: false,
      className: false,
      content: false,
      styled: false,
    }),
    context: PropTypes.object,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
  }

  public static defaultProps = {
    context: isBrowser() ? document.body : null,
  }

  public componentDidMount() {
    _.invoke(this.props, 'onMount', this.props)
  }

  public componentWillUnmount() {
    _.invoke(this.props, 'onUnmount', this.props)
  }

  public render() {
    const { children, context } = this.props

    return context && ReactDOM.createPortal(children, context)
  }
}

export default PortalInner
