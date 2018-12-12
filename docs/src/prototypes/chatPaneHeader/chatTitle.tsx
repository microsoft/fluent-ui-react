import * as React from 'react'
import { List, Button } from '@stardust-ui/react'

const listStyle = {
  marginLeft: '1rem',
}

class ChatTitle extends React.Component<any> {
  public render() {
    const { listItems } = this.props
    return listItems.length < 4 ? (
      <List styles={listStyle} aria-label="chat participants" items={listItems} />
    ) : (
      <div style={{ flexGrow: 0.2 }}>
        <List styles={listStyle} aria-label="chat participants" items={listItems.slice(0, 3)} />
        <Button circular content={`+ ${listItems.length - 3}`} />
      </div>
    )
  }
}
export default ChatTitle
