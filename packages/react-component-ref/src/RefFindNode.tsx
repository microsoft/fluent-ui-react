import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import handleRef from './handleRef'
import { RefProps } from './types'

export default class RefFindNode extends React.Component<RefProps> {
  static displayName = 'RefFindNode'

  static propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: customPropTypes.ref.isRequired as PropTypes.Validator<React.Ref<any>>,
  }

  prevNode: Node | null = null

  componentDidMount() {
    this.prevNode = ReactDOM.findDOMNode(this)

    handleRef(this.props.innerRef, this.prevNode)
  }

  componentDidUpdate(prevProps: RefProps) {
    const currentNode = ReactDOM.findDOMNode(this)

    if (this.prevNode !== currentNode) {
      this.prevNode = currentNode
      handleRef(this.props.innerRef, currentNode)
    }

    if (prevProps.innerRef !== this.props.innerRef) {
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
