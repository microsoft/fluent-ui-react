import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Children, Component } from 'react'
import { findDOMNode } from 'react-dom'
import { ReactChildren } from 'utils'

export interface RefProps {
  children?: ReactChildren
  innerRef?: (ref: HTMLElement) => void
}

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends Component<RefProps> {
  static propTypes = {
    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.element,

    /**
     * Called when componentDidMount.
     *
     * @param {HTMLElement} node - Referred node.
     */
    innerRef: PropTypes.func,
  }

  componentDidMount() {
    _.invoke(this.props, 'innerRef', findDOMNode(this))
  }

  render() {
    return this.props.children && Children.only(this.props.children)
  }
}
