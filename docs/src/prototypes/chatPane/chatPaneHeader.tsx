import * as React from 'react'
import { Avatar, Button, Divider, Icon, Layout, Segment, Text } from '@stardust-ui/react'

import { ChatData } from './services'

export interface ChatPaneHeaderProps {
  chat?: ChatData
}

class ChatPaneHeader extends React.PureComponent<ChatPaneHeaderProps> {
  public render() {
    return (
      <Layout
        vertical
        start={this.renderBanner()}
        main={this.renderMainArea()}
        end={<Divider size={2} fitted />}
      />
    )
  }

  private renderBanner(): React.ReactNode {
    return (
      <>
        <Segment
          content={
            <Icon
              name="team-create"
              styles={({ theme }) => ({
                color: theme.siteVariables.white,
                margin: 'auto 8px',
              })}
            />
          }
          styles={({ variables: v }) => ({
            borderRadius: 0,
            display: 'flex',
            height: '40px',
            padding: 0,
          })}
          variables={siteVars => ({ backgroundColor: siteVars.brand })}
        />
        <Divider fitted />
      </>
    )
  }

  private renderMainArea(): React.ReactNode {
    const { chat } = this.props

    return (
      <Layout
        start={<Avatar name={chat.title} />}
        main={
          <Text
            size="large"
            content={chat.title}
            styles={({ theme }) => ({
              marginLeft: '12px',
              fontWeight: 600,
              color: theme.siteVariables.bodyColor,
            })}
          />
        }
        end={this.renderHeaderButtons()}
        alignItems="center"
        styles={({ theme }) => ({
          padding: '16px 32px',
          background: theme.siteVariables.chatBackground,
        })}
      />
    )
  }

  private renderHeaderButtons(): React.ReactNode {
    return (
      <div style={{ display: 'inline-flex' }}>
        <Button.Group
          circular
          buttons={['call-video', 'call'].map((name, index) => ({
            key: `${index}-${name}`,
            icon: {
              name,
              variables: siteVars => ({
                color: siteVars.white,
                margin: 'auto 8px',
              }),
            },
            primary: true,
          }))}
          styles={{ marginRight: '20px' }}
        />
        {['team-create', 'more'].map((name, index) => (
          <Icon
            key={`${index}-${name}`}
            name={name}
            tabIndex={0}
            styles={{
              fontWeight: 100,
              margin: 'auto',
              ...(!index && { margin: 'auto 1.6rem auto auto' }),
            }}
            variables={siteVars => ({ color: siteVars.gray04, outline: true })}
          />
        ))}
      </div>
    )
  }
}

export default ChatPaneHeader
