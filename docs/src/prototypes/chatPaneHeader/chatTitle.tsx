import * as React from 'react'
import {
  List,
  Button,
  Popup,
  Menu,
  popupFocusTrapBehavior,
  Avatar,
  Icon,
  Header,
} from '@stardust-ui/react'

const listStyle = {
  '& > li': {
    paddingLeft: '0.2rem',
    paddingRight: '0.2rem',
  },
  '& > li:last-of-type': {
    paddingRight: '0.6rem',
  },
  marginLeft: '-1rem',
}

const headingStyle = {
  marginRight: '0.6rem',
}

const menuStyles = ({ theme: { siteVariables } }) => ({
  background: siteVariables.white,
  boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)',
  borderRadius: '.3rem',
  marginTop: '5px',
})

class ChatTitle extends React.Component<any> {
  private getButtonWithRestParticipants(listItems: any) {
    return (
      <Popup
        position="below"
        accessibility={popupFocusTrapBehavior}
        trigger={
          <Button
            circular
            content={`+ ${listItems.length - 3}`}
            aria-label={`${listItems.length - 3} more participants`}
            aria-haspopup="true"
          />
        }
        content={
          <Menu
            styles={menuStyles}
            vertical
            pills
            className="actions"
            items={this.getMenuItems(listItems.slice(3, listItems.length))}
          />
        }
      />
    )
  }

  private getButtonWithAllParticipants(listItems: any) {
    return (
      <Popup
        position="below"
        accessibility={popupFocusTrapBehavior}
        trigger={
          <Button
            circular
            content={`${listItems.length}`}
            aria-label={`${listItems.length} participants`}
            icon="teams"
            aria-haspopup="true"
          />
        }
        content={
          <Menu
            styles={menuStyles}
            vertical
            pills
            className="actions"
            items={this.getMenuItems(listItems)}
          />
        }
      />
    )
  }

  private getMenuItems(listItems): any {
    const newMenuItems = []
    listItems.map(listItem => {
      newMenuItems.push({
        onClick: e => window.alert('user info card will be here'),
        'aria-haspopup': 'dialog',
        key: listItem.key,
        content: listItem.header,
        icon: (
          <Avatar
            image={{
              src: 'public/images/avatar/small/matt.jpg',
            }}
            status={{ color: 'green', icon: 'check', title: 'Available' }}
          />
        ),
      })
    })
    const leaveChat = {
      onClick: e => window.alert('leave chat popup will be here'),
      key: 'leaveChat',
      content: 'Leave chat',
      icon: <Icon name="leave" />,
    }
    newMenuItems.push(leaveChat)
    return newMenuItems
  }

  private renderTitleOrUserList(listItems, groupChatName): any {
    if (groupChatName) {
      return (
        <div style={{ display: 'flex' }}>
          <Header styles={headingStyle} as="h2" content={groupChatName} className="no-anchor" />
          {this.getButtonWithAllParticipants(listItems)}
        </div>
      )
    }
    if (listItems.length <= 3) {
      return <List styles={listStyle} aria-label="chat participants" items={listItems} />
    }
    if (listItems.length > 3) {
      return (
        <div style={{ display: 'flex' }}>
          <List styles={listStyle} aria-label="chat participants" items={listItems.slice(0, 3)} />
          {this.getButtonWithRestParticipants(listItems)}
        </div>
      )
    }
  }

  public render() {
    const { listItems, groupChatName } = this.props
    return this.renderTitleOrUserList(listItems, groupChatName)
  }
}
export default ChatTitle
