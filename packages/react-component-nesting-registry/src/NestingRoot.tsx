import * as React from 'react'

import RegistrySet from './lib/RegistrySet'
import NestingContext from './NestingContext'
import { NestingProps, NodeRef } from './types'

class NestingRoot<T extends Node> extends React.Component<NestingProps> {
  registry = new RegistrySet()
  parentRef = React.createRef<T>()

  componentDidMount() {
    this.registry.register(this.parentRef)
  }

  componentWillUnmount() {
    this.registry.unregister(this.parentRef)
  }

  getRefs = (): NodeRef[] => this.registry.getContextRefs(this.parentRef)

  render() {
    return (
      <NestingContext.Provider value={this.registry}>
        {this.props.children(this.getRefs, this.parentRef)}
      </NestingContext.Provider>
    )
  }
}

export default NestingRoot
