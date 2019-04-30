import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { insertSpanAtCursorPosition, removeElement } from './utils'

export interface PortalAtCursorPositionProps {
  mountNodeId: string
  open?: boolean
}

export class PortalAtCursorPosition extends React.Component<PortalAtCursorPositionProps> {
  private mountNodeInstance: HTMLElement = null

  static defaultProps = {
    mountNodeId: 'portal-at-cursor-position',
  }

  public componentWillUnmount() {
    this.removeMountNode()
  }

  public render() {
    const { children, open } = this.props

    this.setupMountNode()
    return open && this.mountNodeInstance
      ? ReactDOM.createPortal(children, this.mountNodeInstance)
      : null
  }

  private setupMountNode = () => {
    const { mountNodeId, open } = this.props

    if (open) {
      this.mountNodeInstance = this.mountNodeInstance || insertSpanAtCursorPosition(mountNodeId)
    } else {
      this.removeMountNode()
    }
  }

  private removeMountNode = () => {
    if (this.mountNodeInstance) {
      removeElement(this.mountNodeInstance)
      this.mountNodeInstance = null
    }
  }
}
