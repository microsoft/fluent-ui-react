import * as React from 'react'
import {
  Button,
  Popup,
  Menu,
  popupFocusTrapBehavior,
  Avatar,
  Icon,
  Header,
  Box,
  Input,
  navigableListBehavior,
  navigableListItemBehavior,
} from '@stardust-ui/react'

const headingStyle = {
  marginRight: '0.6rem',
}

const menuStyles = ({ theme: { siteVariables } }) => ({
  background: siteVariables.white,
  boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)',
  borderRadius: '.3rem',
  marginTop: '5px',
})

const PopupItemLayout = props => {
  return <Popup trigger={<Box {...props} />} content="Hello from popup!" />
}

class ChatTitle extends React.Component<any> {
  private getButtonWithAllParticipants(listItems: any) {
    const MenuButton = props => (
      <Button
        {...props}
        circular
        aria-label={`${listItems.length} participants`}
        aria-haspopup="true"
      >{`+${listItems.length}`}</Button>
    )

    const items = [
      {
        styles: {
          'box-shadow': '0px 0px 0px',
          'border-color': '#484644',
        },
        role: undefined,
        as: MenuButton,
        key: 'moreButton',
        indicator: false,
        menu: {
          styles: menuStyles,
          pills: true,
          items: this.getMenuItemsAsPopupTrigger(listItems),
        },
      },
    ]
    return (
      <Menu
        defaultActiveIndex={0}
        iconOnly
        role="presentation"
        pills
        className="actions"
        items={items}
      />
    )
  }

  private userListFromMenu(userList): any {
    return (
      <Menu
        variables={{
          activeBackgroundColor: 'transparent',
          borderColor: 'transparent',
          horizontalPaddingRight: '3px',
          horizontalPaddingLeft: '3px',
          horizontalPaddingBottom: '1px',
        }}
        defaultActiveIndex={0}
        accessibility={navigableListBehavior}
        aria-label="chat participants"
        items={this.getItemsForMenuAsList(userList)}
      />
    )
  }

  getMenuItemsAsPopupTrigger(items): any {
    const newMenuItems = []
    items.map(listItem => {
      newMenuItems.push({
        'aria-haspopup': 'dialog',
        key: listItem.key,
        content: listItem.content,
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

    const newMenuItemsWithLeave = newMenuItems.map(item => render => render(item, this.renderPopup))
    newMenuItemsWithLeave.push(render => render(leaveChat))
    return newMenuItemsWithLeave
  }

  private getItemsForMenuAsList(userList): any {
    const newMenuAsListItems = []
    const MenuButton = props => (
      <Button
        {...props}
        circular
        aria-label={`${newMenuAsListItems.length} more participants`}
        aria-haspopup="true"
      >{`+${newMenuAsListItems.length}`}</Button>
    )

    userList.slice(0, 3).map(user => {
      newMenuAsListItems.push({
        as: PopupItemLayout,
        key: user.key,
        content: (
          <>
            {user.media} <span> {user.content} </span>
          </>
        ),
        role: 'button',
        accessibility: navigableListItemBehavior,
      })
    })

    if (userList.length > 3) {
      newMenuAsListItems.push({
        key: 'restOfParticipants',
        role: 'button',
        'aria-haspopup': true,
        'aria-label': `${newMenuAsListItems.length} more participants`,
        accessibility: navigableListItemBehavior,
        as: MenuButton,
        menu: {
          styles: menuStyles,
          pills: true,
          items: this.getMenuItemsAsPopupTrigger(userList.slice(3, userList.length)),
        },
      })
    }
    return newMenuAsListItems
  }

  private renderPopup = (MenuItem, props) => {
    return (
      <Popup
        styles={{ marginLeft: '10px', backgroundColor: 'white' }}
        on="hover"
        key={props.key}
        position="after"
        align="bottom"
        // accessibility={popupFocusTrapBehavior}
        trigger={<MenuItem {...props} />}
        content={
          <div>
            <Header as="h4">Any content.</Header>
            <Input icon="search" placeholder="Search..." />
            <Button>Testing button</Button>
            <Input icon="search" placeholder="Search..." />
            <Button>Testing button</Button>
            <Input icon="search" placeholder="Search..." />
            <Button>Testing button</Button>
          </div>
        }
      />
    )
  }

  private renderTitleOrUserList(userList, groupChatName): any {
    if (groupChatName) {
      return (
        <div style={{ display: 'flex' }}>
          <Header styles={headingStyle} as="h2" content={groupChatName} className="no-anchor" />
          {this.getButtonWithAllParticipants(userList)}
        </div>
      )
    }
    if (userList.length <= 3) {
      return this.userListFromMenu(userList)
    }
    if (userList.length > 3) {
      return <div style={{ display: 'flex' }}>{this.userListFromMenu(userList)}</div>
    }
  }

  public render() {
    const { listItems, groupChatName } = this.props
    return this.renderTitleOrUserList(listItems, groupChatName)
  }
}
export default ChatTitle
