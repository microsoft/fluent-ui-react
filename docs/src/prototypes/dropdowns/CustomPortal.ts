import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { insertSpanAtCursorPosition, removeElement } from './utils'

export interface CustomPortalProps {
  mountNodeId: string
  open?: boolean
}

export class CustomPortal extends React.Component<CustomPortalProps, {}> {
  private mountNodeInstance: HTMLElement = null

  public render() {
    this.setupMountNode()
    return this.props.open && this.mountNodeInstance
      ? ReactDOM.createPortal(this.props.children, this.mountNodeInstance)
      : null
  }

  public componentWillUnmount() {
    this.removeMountNode()
  }

  private setupMountNode = () => {
    if (this.props.open) {
      this.mountNodeInstance =
        this.mountNodeInstance || insertSpanAtCursorPosition(this.props.mountNodeId)
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
