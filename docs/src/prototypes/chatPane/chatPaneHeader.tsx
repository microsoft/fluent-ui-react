import * as React from 'react'
import { Avatar, Button, Icon, Layout, Menu, Segment, Text } from '@stardust-ui/react'

import { IChat } from './data/interfaces'

export interface IChatPaneHeaderProps {
  chat?: IChat
}

class ChatPaneHeader extends React.PureComponent<IChatPaneHeaderProps> {
  public render() {
    return <Layout vertical start={this.renderBanner()} main={this.renderMainArea()} />
  }

  private renderBanner(): React.ReactNode {
    return (
      <Segment
        content={
          <Icon
            svg
            name="umbrella"
            styles={{ margin: 'auto 0' }}
            variables={siteVars => ({ color: siteVars.white })}
          />
        }
        styles={({ variables: v }) => ({
          backgroundColor: v.backgroundColor,
          borderRadius: 0,
          display: 'flex',
          height: '40px',
          width: '100%',
        })}
        variables={siteVars => ({ backgroundColor: siteVars.brand })}
      />
    )
  }

  private renderMainArea(): React.ReactNode {
    const { chat } = this.props

    return (
      <>
        <Layout
          start={<Avatar name={chat.title} />}
          main={
            <Text size="lg" content={chat.title} styles={{ marginLeft: '12px', fontWeight: 600 }} />
          }
          end={this.renderHeaderButtons()}
          alignItems="center"
          styles={{ padding: '16px 32px' }}
        />
        {this.renderMenu()}
      </>
    )
  }

  private renderHeaderButtons(): React.ReactNode {
    return (
      <div style={{ display: 'inline-flex' }}>
        <Button.Group
          circular
          icon="call"
          buttons={[
            { key: 'call-primary', icon: 'call', type: 'primary' },
            { key: 'call-secondary', icon: 'call', type: 'secondary', disabled: true },
          ]}
          styles={{ marginRight: '20px' }}
        />
        {['user plus', 'ellipsis horizontal'].map((name, index) => (
          <Icon
            key={`${index}-${name}`}
            name={name}
            tabIndex={0}
            styles={{ fontWeight: 100 }}
            variables={siteVars => ({ color: siteVars.gray04 })}
          />
        ))}
      </div>
    )
  }

  private renderMenu(): React.ReactNode {
    const menuItems = [
      { key: 'Conversation', content: 'Conversation' },
      { key: 'Files', content: 'Files' },
      { key: 'Organization', content: 'Organization' },
      { key: 'Activity', content: 'Activity' },
      { key: 'Add', content: <Icon name={'plus'} /> },
    ]

    return (
      <Menu
        defaultActiveIndex={0}
        items={menuItems}
        underlined
        type="primary"
        styles={({ props, variables }: { props: any; variables: any }) => ({
          marginLeft: '35px',
          marginRight: '35px',
          borderBottom: `1px solid ${variables.typePrimaryUnderlinedBorderColor}`,
        })}
      />
    )
  }
}

export default ChatPaneHeader
