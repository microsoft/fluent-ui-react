import { NodeRef } from '../types'

export default class RefStack {
  set = new Set<NodeRef>()

  getContextRefs = (ref: NodeRef): NodeRef[] => {
    const nodes = Array.from(this.set)
    const refId = nodes.indexOf(ref)

    return nodes.slice(refId)
  }

  register = (ref: NodeRef): void => {
    this.set.add(ref)
  }

  unregister = (ref: NodeRef): void => {
    this.set.delete(ref)
  }
}
