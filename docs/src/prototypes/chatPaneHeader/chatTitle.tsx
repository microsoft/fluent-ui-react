import * as React from 'react'
import { List, Button, Popup, Menu, popupFocusTrapBehavior, Avatar, Icon } from '@stardust-ui/react'

const listStyle = {
  marginLeft: '1rem',
}

class ChatTitle extends React.Component<any> {
  private getButtonWithPopup(listItems: any) {
    return (
      <Popup
        position="below"
        accessibility={popupFocusTrapBehavior}
        trigger={<Button circular content={`+ ${listItems.length - 3}`} />}
        content={
          <Menu
            vertical
            pills
            className="actions"
            items={this.getMenuItems(listItems.slice(3, listItems.length))}
          />
        }
      />
    )
  }

  private getMenuItems(listItems): any {
    const newMenuItems = []
    listItems.map(listItem => {
      newMenuItems.push({
        key: listItem.key,
        content: listItem.header,
        icon: (
          <Avatar
            image={{
              src: 'public/images/avatar/small/matt.jpg',
              alt: `Profile picture of ${listItem.header}`,
            }}
            status={{ color: 'green', icon: 'check', title: 'Available' }}
          />
        ),
      })
    })
    const leaveChat = {
      key: 'leaveChat',
      content: 'Leave chat',
      icon: <Icon name="leave" />,
    }
    newMenuItems.push(leaveChat)
    return newMenuItems
  }

  public render() {
    const { listItems } = this.props
    return listItems.length < 4 ? (
      <List styles={listStyle} aria-label="chat participants" items={listItems} />
    ) : (
      <div style={{ flexGrow: 0.2 }}>
        <List styles={listStyle} aria-label="chat participants" items={listItems.slice(0, 3)} />
        {this.getButtonWithPopup(listItems)}
      </div>
    )
  }
}
export default ChatTitle
