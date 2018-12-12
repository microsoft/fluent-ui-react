import * as React from 'react'
import { List, Icon, Button } from '@stardust-ui/react'

const listStyle = {
  marginLeft: '1rem',
}

class ChatTitle extends React.Component<any> {
  public render() {
    const { listItems } = this.props
    return listItems.length < 4 ? (
      <List styles={listStyle} aria-label="chat participants" items={listItems} />
    ) : (
      <div>
        <List styles={listStyle} aria-label="chat participants" items={listItems.slice(0, 3)} />
        <Button
          aria-label="more participants"
          circular
          key="moreOptions"
          title="more options"
          icon={
            <Icon
              key="userPlus"
              name="ellipsis horizontal"
              size="large"
              variables={siteVars => ({ color: siteVars.gray04 })}
            />
          }
        />
      </div>
    )
  }
}
export default ChatTitle
