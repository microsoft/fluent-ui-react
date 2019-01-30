import * as React from 'react'
import {
  Button,
  Popup,
  Menu,
  popupFocusTrapBehavior,
  Input,
  Avatar,
  Header,
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

const MoreParticipantsButton = props => {
  const { count, ...rest } = props
  return <Button {...rest} circular>{`+${count}`}</Button>
}

class ChatTitle extends React.Component<any> {
  private getButtonWithAllParticipants(verticalItems: any) {
    const MenuButton = props => (
      <Button
        {...props}
        circular
        aria-label={`${verticalItems.length} participants`}
        aria-haspopup="true"
      >{`+${verticalItems.length}`}</Button>
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
          items: verticalItems,
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

  private createHorizontalItem = user => {
    const item = {
      as: 'li',
      key: user.key,
      content: (
        <>
          {user.media} <span> {user.content} </span>
        </>
      ),
      userName: user.content,
      'aria-haspopup': 'dialog',
      accessibility: navigableListItemBehavior,
      wrapper: null,
    }

    return render => render(item, this.renderUserWithCard)
  }

  private createVerticalItem = user => {
    const item = {
      key: user.key,
      content: user.content,
      'aria-haspopup': 'dialog',
      icon: (
        <Avatar
          image={{
            src: 'public/images/avatar/small/matt.jpg',
          }}
          status={{ color: 'green', icon: 'check', title: 'Available' }}
        />
      ),
    }

    return render => render(item, this.renderUserWithCard)
  }

  private createOverflow = menuItems => ({
    key: 'restOfParticipants',
    'aria-haspopup': true,
    'aria-label': `${menuItems.length} more participants`,
    accessibility: navigableListItemBehavior,
    wrapper: { as: 'li', role: 'presentation' },
    as: MoreParticipantsButton,
    count: menuItems.length,
    menu: {
      styles: menuStyles,
      pills: true,
      items: menuItems,
    },
  })

  private renderHorizontalMenu = items => {
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
        items={items}
      />
    )
  }

  private renderUserWithCard = (MenuItem, props) => {
    const { userName, ...rest } = props
    return (
      <Popup
        accessibility={popupFocusTrapBehavior}
        aria-haspopup="dialog"
        on="hover"
        trigger={<MenuItem {...rest} />}
        content={{
          content: (
            <>
              <Header as="h4">{userName} card</Header>
              <Input placeholder="Search..." />
              <Button icon="send" title="Send message" />
            </>
          ),
        }}
      />
    )
  }

  public render() {
    const { listItems, groupChatName } = this.props
    const horizontalUsers = listItems.slice(0, 3)

    if (groupChatName) {
      const verticalUsers = listItems.map(user => this.createVerticalItem(user))
      return (
        <div style={{ display: 'flex' }}>
          <Header styles={headingStyle} as="h2" content={groupChatName} className="no-anchor" />
          {this.getButtonWithAllParticipants(verticalUsers)}
        </div>
      )
    }

    const verticalUsers = listItems.slice(3, listItems.length)

    const horizontalItems = horizontalUsers.map(user => this.createHorizontalItem(user))
    const verticalItems = verticalUsers.map(user => this.createVerticalItem(user))

    if (verticalItems.length > 0) {
      horizontalItems.push(this.createOverflow(verticalItems))
    }
    return this.renderHorizontalMenu(horizontalItems)
  }
}
export default ChatTitle
