import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { ChildrenComponentProps } from '../../lib/commonPropInterfaces'
import handleRef from '../../lib/handleRef'

export interface RefFindNodeProps extends ChildrenComponentProps<React.ReactElement<any>> {
  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: React.Ref<any>
}

export default class RefFindNode extends React.Component<RefFindNodeProps> {
  static displayName = 'RefFindNode'

  static propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: customPropTypes.ref,
  }

  prevNode: Node = null

  componentDidMount() {
    this.prevNode = ReactDOM.findDOMNode(this)

    handleRef(this.props.innerRef, this.prevNode)
  }

  componentDidUpdate() {
    const currentNode = ReactDOM.findDOMNode(this)

    if (this.prevNode !== currentNode) {
      this.prevNode = currentNode
      handleRef(this.props.innerRef, currentNode)
    }
  }

  componentWillUnmount() {
    handleRef(this.props.innerRef, null)
  }

  render() {
    const { children } = this.props

    return children
  }
}
