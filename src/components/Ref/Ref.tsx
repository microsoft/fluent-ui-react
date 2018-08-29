import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import { Children, Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Extendable } from '../../../types/utils'

export interface IRefProps {
  innerRef?: (ref: HTMLElement) => void
}

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
export default class Ref extends Component<Extendable<IRefProps>, any> {
  static propTypes = {
    /** Primary content. */
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
    return Children.only(this.props.children)
  }
}
