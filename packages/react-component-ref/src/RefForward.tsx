import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import handleRef from './handleRef'
import { RefProps } from './types'

export default class RefForward extends React.Component<RefProps> {
  static displayName = 'RefForward'

  static propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: customPropTypes.ref.isRequired as PropTypes.Validator<React.Ref<any>>,
  }

  private handleRefOverride = (node: HTMLElement) => {
    const { children, innerRef } = this.props

    handleRef((children as React.ReactElement<any> & { ref: React.Ref<any> }).ref, node)
    handleRef(innerRef, node)
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, {
      ref: this.handleRefOverride,
    })
  }
}
